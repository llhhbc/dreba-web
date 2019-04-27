import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

import { Blog } from './blog';
import { GlobalConfig } from '../../config/config';
import { SortDirection } from './sortable.directive';

export interface SearchResult {
  blogs: Blog[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(blogs: Blog[], column: string, direction: string): Blog[] {
  if (direction === '') {
    return blogs;
  } else {
    return [...blogs].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(blog: Blog, term: string) {
  return blog.title.toLowerCase().includes(term)
    || blog.tags.toLowerCase().includes(term);
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _blogs$ = new BehaviorSubject<Blog[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };


  constructor(private http: HttpClient) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this.GetBlogs()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      console.log("run here for get result: ", result, result.blogs);
      this._blogs$.next(this._doSearch(result.blogs));
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get blogs$() { return this._blogs$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set sortColumn(sortColumn: string) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  public GetBlogs(): Observable<SearchResult> {
    console.log("run here for get blogs");
    return this.http.get<SearchResult>(GlobalConfig.getBlogUrl);
  }

  private _doSearch(blogs: Blog[]): Blog[] {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    console.log("get here blog: ", blogs);
    // 1. sort
    blogs = sort(blogs, sortColumn, sortDirection);

    // 2. filter
    blogs = blogs.filter(blog => matches(blog, searchTerm));

    // 3. paginate
    blogs = blogs.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return blogs;
  }
}

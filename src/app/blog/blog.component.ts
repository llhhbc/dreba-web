import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Blog } from './blog';
import { BlogService, SearchResult } from './blog.service';
import { SortableDirective, SortEvent } from './sortable.directive';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.sass']
})
export class BlogComponent implements OnInit {

  blogs: Observable<Blog[]>;
  total: Observable<number>;

  constructor(public service: BlogService) {
    this.blogs = service.blogs$;
    this.total = service.total$;
  }


  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  onSort({ column, direction }: SortEvent) {
    console.log("here sort", column, direction);
    this.headers.forEach(header => {
      if (header.appSortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  ngOnInit() {
    this.service.Next();
    // this.service.GetBlogs('').subscribe((res: SearchResult) => {
    //   console.log(res);
    //   this.blogs = of(res.blogs);
    // });
  }

}

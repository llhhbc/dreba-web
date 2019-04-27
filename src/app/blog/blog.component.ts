import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Blog } from './blog';
import { BlogService, SearchResult } from './blog.service';
import { SortableDirective, SortEvent } from './sortable.directive';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.sass']
})
export class BlogComponent implements OnInit {

  blogs: Observable<Blog[]>;
  total: Observable<number>;

  constructor(private service: BlogService) {
    this.blogs = service.blogs$;
    this.total = service.total$;
  }


  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  onSort({ column, direction }: SortEvent) {
    console.log("here sort");
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    })
  }

  ngOnInit() {
    // this.data.GetBlogs().subscribe((res: SearchResult) => {
    //   console.log(res);
    //   this.blogs = res.blogs;
    // });
  }

}

import { Component, OnInit } from '@angular/core';
import { Blog } from './blog';
import { BlogService } from './blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.sass']
})
export class BlogComponent implements OnInit {

  constructor(private data: BlogService) { }

  blogs: Blog[];

  ngOnInit() {
    this.data.GetBlogs().subscribe((res: Blog[]) => {
      console.log(res);
      this.blogs = res;
    });
  }

}

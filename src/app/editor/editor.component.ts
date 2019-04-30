import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { DataService } from "./data.service";
import { BlogService, SearchResult } from '../blog/blog.service';
import { Blog } from '../blog/blog';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.sass']
})
export class EditorComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private data: DataService,
    private route: ActivatedRoute,
    private blogSvr: BlogService,
    private location: Location) {
  }

  ngOnInit() {

    this.blog = { title: '', context: '', contextType: 'Ckeditor', tags: '' };
    this.data.currentMessage.subscribe(message => this.blog.context = message)
    this.data.changeMessage('');

    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (uuid != null) {
      this.blogSvr.GetBlogs(uuid).subscribe((res: SearchResult) => {
        this.blog = res.blogs.pop();
        this.data.changeMessage(this.blog.context);
      })
    }
  }

  public blog: Blog;

  onSubmit() {
    // console.log('Form submit, model', this.blog);
    this.http.post('/drebago/v1/blog/', this.blog).subscribe(
      res => {
        // console.log(res);
        this.goBack();
      },
      err => {
        console.log("Error occured", err);
      }
    );
  }

  changeEditor(editor: string) {
    this.blog.contextType = editor;
  }

  goBack(): void {
    this.location.back();
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { DataService } from "./data.service";
import { BlogService, SearchResult } from '../blog/blog.service';
import { Blog } from '../blog/blog';
import { Title } from '@angular/platform-browser';

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
    private blogSvr: BlogService) {
  }

  ngOnInit() {

    const uuid = this.route.snapshot.paramMap.get('uuid');
    console.log("get uuid", uuid, uuid == 'null', uuid != null);
    if (uuid != null) {
      this.blogSvr.GetBlogs(uuid).subscribe((res: SearchResult) => {
        this.blog = res.blogs.pop();
        this.data.currentMessage.subscribe(message => this.blog.context = message)
        console.log("get pop blog: ", this.blog);
        this.data.changeMessage(this.blog.context);
      })
    } else {
      this.blog = { title: '', context: '', contextType: 'Ckeditor', tags: '' };
      this.data.currentMessage.subscribe(message => this.blog.context = message)
    }
  }

  public blog: Blog;

  newMessage() {
    this.data.changeMessage("Hello from Sibling")
  }

  onSubmit() {
    console.log('Form submit, model', this.blog);
    this.http.post('/drebago/v1/blog/', this.blog).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  changeEditor(editor: string) {
    this.blog.contextType = editor;
  }

  reset() {

  }

}

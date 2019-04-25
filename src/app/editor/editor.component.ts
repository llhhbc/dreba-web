import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DataService } from "./data.service";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.sass']
})
export class EditorComponent implements OnInit {

  constructor(private http: HttpClient, private data: DataService) {
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.model.context = message)
  }

  public model = {
    title: '',
    tags: '',
    context_type: 'Ckeditor',
    context: '',
  };

  newMessage() {
    this.data.changeMessage("Hello from Sibling")
  }

  onSubmit() {
    console.log('Form submit, model', this.model, this.data.GetMessage());
    this.http.post('/drebago/v1/blog/', this.model).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  changeEditor(editor: string) {
    this.model.context_type = editor;
  }

  reset() {

  }

}

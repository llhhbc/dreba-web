import { Component, OnInit } from '@angular/core';
import { EditorConfig } from '../../../config/editor.md';

import { DataService } from "../data.service";

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.sass']
})
export class MarkdownComponent implements OnInit {

  constructor(private data: DataService) { }

  conf = new EditorConfig();
  markdown = '';

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.markdown = message)
  }

  syncModel(str: string): void {
    this.markdown = str;
    this.data.changeMessage(str);
  }

}

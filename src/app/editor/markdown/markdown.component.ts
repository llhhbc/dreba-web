import { Component, OnInit } from '@angular/core';
import {EditorConfig} from './edit-config';

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
  }

  syncModel(str): void {
    this.markdown = str;
    this.data.changeMessage(str);
  }

}

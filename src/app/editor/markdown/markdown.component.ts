import { Component, OnInit, Input } from '@angular/core';
import { EditorConfig } from '../../../config/editor.md';

import { DataService } from "../data.service";

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.sass']
})
export class MarkdownComponent implements OnInit {

  @Input() readOnly: boolean;

  constructor(private data: DataService) { }

  conf = new EditorConfig();
  markdown = '';

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.markdown = message);
    this.conf.readOnly = this.readOnly;
  }

  syncModel(str: string): void {
    this.conf.readOnly = this.readOnly;
    this.markdown = str;
    this.data.changeMessage(str);
  }

}

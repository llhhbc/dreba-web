import { Component, OnInit, Input } from '@angular/core';

import { DataService } from "../data.service";

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.sass']
})
export class CkeditorComponent implements OnInit {

  message:string;

  constructor(private data: DataService) { }

  public Editor = ClassicEditor;

  public config = {
		ckfinder: {
			options: {
				resourceType: 'Images'
			},
			uploadUrl: '/drebago/v1/images'
		},
		// extraPlugins : ['FooPlugin', 'BarPlugin']
	};
	// {"fileName":"file name","uploaded":1,"error":{"number":201,"message":""},"url":"image url"}

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message)
  }


	public onChange({ editor }) {
		const data = editor.getData();
		this.data.changeMessage(data);
		console.log(data);
	}

}

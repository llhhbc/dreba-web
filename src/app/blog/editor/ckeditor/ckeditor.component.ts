import { Component, OnInit, Input } from '@angular/core';

import { DataService } from "../data.service";

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { CkeditorConfig } from '../../../../config/ckeditor';

@Component({
	selector: 'app-ckeditor',
	templateUrl: './ckeditor.component.html',
	styleUrls: ['./ckeditor.component.sass']
})
export class CkeditorComponent implements OnInit {

	message: string;

	constructor(private data: DataService) { }

	public Editor = ClassicEditor;

	public config = CkeditorConfig;

	ngOnInit() {
		this.data.currentMessage.subscribe(message => this.message = message)
	}


	public onChange({ editor }) {
		const data = editor.getData();
		this.data.changeMessage(data);
		console.log(data);
	}

}

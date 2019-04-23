import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass']
})
export class AppComponent {
	title = 'dreba';

	constructor(private http: HttpClient){
    }

	public Editor = ClassicEditor;

	public model = {
		title: '',
		tags: '',
		context_type: 'ckeditor',
		context: ''
	};

	public config = {
		ckfinder: {
			options: {
				resourceType: 'Images'
			},
			uploadUrl: '/drebago/v1/images'
		},
		extraPlugins : ['FooPlugin', 'BarPlugin', 'markdown']
	};
	// {"fileName":"file name","uploaded":1,"error":{"number":201,"message":""},"url":"image url"}

	public onChange({ editor }) {
		const data = editor.getData();
		console.log(data);
	}

	onSubmit() {
		console.log('Form submit, model', this.model);
		this.http.post('/drebago/v1/blog/',this.model).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );
	}

	reset() {

	}

}

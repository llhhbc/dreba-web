import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DataService } from "./editor/data.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass']
})
export class AppComponent {
	title = 'dreba';

	message:string;

	constructor(private http: HttpClient, private data: DataService){
    }

    ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message)
  }

	public model = {
		title: '',
		tags: '',
		context_type: 'ckeditor',
		context: '',
	};

	newMessage() {
    this.data.changeMessage("Hello from Sibling")
  }

	onSubmit() {
		console.log('Form submit, model', this.model, this.data.GetMessage());
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

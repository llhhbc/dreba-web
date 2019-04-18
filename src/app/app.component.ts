import { Component } from '@angular/core';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'dreba';

  public Editor = ClassicEditor;

  public model = {
 editorData: '<p>Hello, worlddsaf!</p>'
};

  public config = {
ckfinder: {
  options: {
    resourceType: 'Images'
  },
  uploadUrl: 'http://localhost:3000/test/upload/iamge'
 }
};

public onChange( { editor } ) {
const data = editor.getData();
console.log( data );
}

}

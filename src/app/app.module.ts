import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MarkdownComponent } from './blog/editor/markdown/markdown.component';
import { CkeditorComponent } from './blog/editor/ckeditor/ckeditor.component';
import { EditorDirective } from './blog/editor/markdown/editor.directive';
import { EditorComponent } from './blog/editor/editor.component';
import { BlogComponent } from './blog/blog.component';


@NgModule({
  declarations: [
    AppComponent,
    MarkdownComponent,
    CkeditorComponent,
    EditorDirective,
    EditorComponent,
    BlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CKEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

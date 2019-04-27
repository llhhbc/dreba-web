import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MarkdownComponent } from './editor/markdown/markdown.component';
import { CkeditorComponent } from './editor/ckeditor/ckeditor.component';
import { EditorDirective } from './editor/markdown/editor.directive';
import { EditorComponent } from './editor/editor.component';
import { BlogComponent } from './blog/blog.component';
import { SortableDirective } from './blog/sortable.directive';


@NgModule({
  declarations: [
    AppComponent,
    MarkdownComponent,
    CkeditorComponent,
    EditorDirective,
    EditorComponent,
    BlogComponent,
    SortableDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CKEditorModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

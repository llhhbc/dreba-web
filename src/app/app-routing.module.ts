import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { EditorComponent } from './editor/editor.component';

const routes: Routes = [
  // { path: '', redirectTo: '/', pathMatch: 'full' }, //default route
  { path: '', component: BlogComponent },
  { path: 'blogs/:uuid', component: EditorComponent },
  { path: 'blogs', component: EditorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

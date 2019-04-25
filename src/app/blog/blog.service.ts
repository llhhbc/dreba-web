import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalConfig } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  public GetBlogs() {
    return this.http.get(GlobalConfig.getBlogUrl)
  }
}

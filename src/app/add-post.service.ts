import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostPayload} from './add-post/post-payload';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddPostService {

  constructor(private httpClient: HttpClient) {
  }

  addPost(postPayload: PostPayload) {
    // TODO: use address as a variable
    return this.httpClient.post('http://localhost:8080/api/posts/', postPayload);
  }

  getAllPosts(): Observable<Array<PostPayload>> {
    return this.httpClient.get<Array<PostPayload>>('http://localhost:8080/api/posts/all');
  }

  getPost(permaLink: Number): Observable<PostPayload> {
    return this.httpClient.get<PostPayload>('http://localhost:8080/api/posts/get/' + permaLink);
  }

  deletePost(permaLink: Number) {
    return this.httpClient.delete('http://localhost:8080/api/posts/delete/' + permaLink);
  }

  editPost(permaLink: Number, postPayload: PostPayload) {
    return this.httpClient.put('http://localhost:8080/api/posts/edit/' + permaLink, postPayload);
  }
}

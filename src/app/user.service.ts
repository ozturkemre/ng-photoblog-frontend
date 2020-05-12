import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostPayload} from './add-post/post-payload';
import {UserDetailsPayload} from './user-page/user-details.payload';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getUserDetails(username: String) {
    return this.httpClient.get<UserDetailsPayload>('http://localhost:8080/api/user/get/' + username);
  }

  setModeToUser(username: String, mode: String) {
    return this.httpClient.put('http://localhost:8080/api/user/set/' + username + '/' + mode, null);
  }
}

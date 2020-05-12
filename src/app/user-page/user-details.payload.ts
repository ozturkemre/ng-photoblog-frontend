import {PostPayload} from '../add-post/post-payload';
import {UserPayload} from '../payloads/user-payload';

export class UserDetailsPayload {
  user: UserPayload;
  posts: Array<PostPayload>;
}

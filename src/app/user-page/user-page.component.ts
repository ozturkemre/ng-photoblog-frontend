import {Component, OnInit} from '@angular/core';
import {AddPostService} from '../add-post.service';
import {ActivatedRoute} from '@angular/router';
import {PostPayload} from '../add-post/post-payload';
import {UserService} from '../user.service';
import {AuthService} from '../auth/auth.service';
import {UserDetailsPayload} from './user-details.payload';
import {UserPayload} from '../payloads/user-payload';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  username: String;
  posts: Array<PostPayload>;
  userDetails: UserDetailsPayload;
  user: UserPayload;
  avatar: any;
  userRole: string;

  constructor(private postService: AddPostService, private route: ActivatedRoute,
              private userService: UserService, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params.username;
    });
    this.userService.getUserDetails(this.username).subscribe((data: UserDetailsPayload) => {
      this.userDetails = data;
      this.user = this.userDetails.user;
      this.userRole = this.user.role.slice(5);
      this.posts = this.userDetails.posts;
      this.avatar = 'data:image/jpg;base64,' + this.user.avatar;
    });

  }
    // TODO: Create changeRole function for admin usage
  changeRole() {
    return 'rolechange';
  }
}

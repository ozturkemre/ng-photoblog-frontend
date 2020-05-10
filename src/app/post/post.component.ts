import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AddPostService} from '../add-post.service';
import {PostPayload} from '../add-post/post-payload';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post: PostPayload;
  permaLink: Number;
  picture: any;

  constructor(private route: ActivatedRoute, private postService: AddPostService, private router: Router, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.permaLink = params.id;
    });

    this.postService.getPost(this.permaLink).subscribe((data: PostPayload) => {
      this.post = data;
      this.picture = 'data:image/jpg;base64,' + this.post.pic;
    }, (error: any) => {
      console.log('Failed to getting post');
    });
  }


  deletePost() {
    this.postService.deletePost(this.permaLink).subscribe(data => {
      console.log('Post successfully deleted');
      this.router.navigate(['/']);
    }, error => {
      console.log('Failed while deleting post');
    });
  }

  editPost() {
    this.router.navigate(['/edit-post/', this.permaLink]);
  }
}

import {Component, OnInit} from '@angular/core';
import {AddPostService} from '../add-post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PostPayload} from '../add-post/post-payload';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  permaLink: Number;
  private post: PostPayload;
  private picture: any;
  private postPayload: PostPayload;
  editPostForm: FormGroup;
  title = new FormControl('');
  content = new FormControl('');
  imgURL: any;
  private base64Image: any;

  constructor(private postService: AddPostService, private router: Router, private route: ActivatedRoute) {
    this.editPostForm = new FormGroup({
      title: this.title,
      content: this.content
    });
    this.postPayload = {
      content: '',
      title: '',
      pic: [],
      username: '',
      id: ''
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.permaLink = params.id;
    });

    this.postService.getPost(this.permaLink).subscribe((data: PostPayload) => {
      this.post = data;
      this.base64Image = this.post.pic;
      this.imgURL = 'data:image/jpg;base64,' + this.base64Image;
      this.editPostForm.controls.title.setValue(this.post.title);
      this.editPostForm.controls.content.setValue(this.post.content);
    }, (error: any) => {
      console.log('Failed to getting post');
    });
  }

  editPost() {
    this.postPayload.content = this.editPostForm.get('content').value;
    this.postPayload.title = this.editPostForm.get('title').value;
    this.postPayload.pic = this.base64Image;
    this.postService.editPost(this.permaLink, this.postPayload).subscribe(data => {
      console.log('Post successfully edited');
      this.router.navigate(['/post/', this.permaLink]);
    }, error => {
      console.log('Failed while editing post');
    });
  }

  public onFileChanged(event) {

    const reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        this.base64Image = btoa(reader.result);
      }
      this.imgURL = 'data:image/jpg;base64,' + this.base64Image;
    };

  }

}

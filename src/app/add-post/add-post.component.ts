import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PostPayload} from './post-payload';
import {AddPostService} from '../add-post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  addPostForm: FormGroup;
  postPayload: PostPayload;
  title = new FormControl('');
  content = new FormControl('');
  imgURL: any;
  private base64Image: any;
  feedback: string;

  constructor(private addPostService: AddPostService, private router: Router) {
    this.addPostForm = new FormGroup({
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
  }

  addPost() {


    this.postPayload.content = this.addPostForm.get('content').value;
    this.postPayload.title = this.addPostForm.get('title').value;
    this.postPayload.pic = this.base64Image;
    this.addPostService.addPost(this.postPayload).subscribe(data => {
      console.log('Post successfully created');
      // TODO: should navigate to post after created post
      this.router.navigateByUrl('/');
    }, error => {
      console.log('Failed send post to server.');
      document.getElementById('feedback').innerHTML = 'Failed send post to server.';

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

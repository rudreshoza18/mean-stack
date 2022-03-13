import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from '../post.model';
import { HttpErrorResponse } from '@angular/common/http';
import { mimeType } from './mime-type.validator';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  edit;
  postId;
  public post: Post;
  public isLoading = false;
  form: FormGroup;
  public imagePreview: any;
  constructor(public postsService: PostsService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.has('postId')) {
        this.edit = true;
        this.isLoading = true;
        this.postId = params.get('postId');
        this.postsService.getEditPost(this.postId).subscribe((postData: any) => {
          this.isLoading = false;
          this.post = {
            id: postData.data._id,
            title: postData.data.title,
            content: postData.data.content,
            imagePath: postData.data.imagePath
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content
          });
        }, (error: HttpErrorResponse) => {
          console.error(error);
          this.isLoading = false;
        });
      } else {
        this.edit = false;
        this.postId = null;
      }
    });
  }
  onAddPost() {
    if (this.form.invalid) {
      return;
    }
    if (this.edit) {
      this.postsService.editPost(this.postId, this.form.value.title, this.form.value.content);
    } else {
      this.postsService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
    }
    this.form.reset();
    this.router.navigate(['/']);
  }

  onImagePicked(imagePicked: Event) {
    const file = (imagePicked.target as HTMLInputElement).files[0];
    this.form.patchValue({
      image: file
    });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}

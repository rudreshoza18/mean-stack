import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from '../post.model';
import { HttpErrorResponse } from '@angular/common/http';
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
  constructor(public postsService: PostsService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
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
            content: postData.data.content
          };
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
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.edit) {
      this.postsService.editPost(this.postId, form.value.title, form.value.content);
    } else {
      this.postsService.addPost(form.value.title, form.value.content);
    }
    form.resetForm();
    this.router.navigate(['/']);
  }
}

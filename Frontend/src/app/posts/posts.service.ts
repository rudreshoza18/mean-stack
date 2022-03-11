import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map, retry } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) { }

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(
        'http://localhost:3000/api/posts'
      )
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
      .subscribe((responseData: any) => {
        const id = responseData.data._id;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
  getEditPost(postId) {
    console.log(postId);
    return this.http.get('http://localhost:3000/api/posts/' +  postId );
}
editPost(postId, postTitle, postContent) {
  const post = {
    id: postId,
    title: postTitle,
    content: postContent
  };
  this.http.put('http://localhost:3000/api/post/' + postId, post)
    .subscribe((upPost: any) => {
      const updatedPost: any = [...this.posts];
      const oldPost = updatedPost.findIndex((p => p.id === postId));
      updatedPost[oldPost] = post;
      this.posts = updatedPost;
      this.postsUpdated.next([...this.posts]);
    });
}
}

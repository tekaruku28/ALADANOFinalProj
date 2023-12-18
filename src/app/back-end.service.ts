import { Injectable } from '@angular/core';
import { PostService } from './post.service';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
// import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class BackEndService {

  constructor(private postService: PostService, private http: HttpClient) { }

  
  saveData(){
    const listofPosts: Post[] = this.postService.getPost();
    this.http.put('https://aladanoangularproj-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json', listofPosts)
    .subscribe((res)=>{
      console.log(res);
    })
  }

  fetchData(){
     return this.http.get<Post[]>('https://aladanoangularproj-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
      .pipe(tap((listsOfPosts: Post[]) => {
        console.log(listsOfPosts);
        this.postService.setPosts(listsOfPosts);
      })
      )
  }
 

  updateData(index: number, updatedPost: Post) {
        this.postService.updatePost(index, updatedPost);
    this.http.put(`https://aladanoangularproj-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${index}.json`, updatedPost)
        .subscribe(response => {
            console.log(response);
        });
  }

  //deleting data from
  deleteData(index: number){
    this.postService.deleteButton(index);
    this.http.delete(`https://asia-southeast1.firebasedatabase.app/posts/${index}.json`)
        .subscribe(response => {
            console.log(response);
        });
}

  //comment

  addComment(index: number, comment: string) {
    const post = this.postService.getSpecPost(index);
    if (!post.comments) {
        post.comments = [];
    }
    post.comments.push(comment);
    this.http.put(`https://aladanoangularproj-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${index}.json`, post)
      .subscribe(response => {
        console.log(response);
      });
}


  







  // fetchData(): Observable<Post[]>{
  //   this.http.get<Post[]>('https://crud-app-f0d6e-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
  //     .pipe(tap((listsOfPosts: Post[]) => {
  //       console.log(listsOfPosts);
  //       this.postService.setPosts(listsOfPosts);
  //     })
  //     ).subscribe()
  // }
}

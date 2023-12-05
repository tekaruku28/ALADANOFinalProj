import { Component, Input, OnInit } from '@angular/core';
import{Post} from '../post.model';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { BackEndService } from '../back-end.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})


export class PostComponent implements OnInit{
@Input() index: number = 0;
@Input() post?: Post;
  commentText: any;
  
  constructor(private postService: PostService, private router: Router, private backEndService: BackEndService){

  }
 
  ngOnInit(): void{
      console.log(this.post);
  }
  delete(){
    // this.postService.deleteButton(this.index);
    this.backEndService.deleteData(this.index);
  }
  onEdit(){
    this.router.navigate(['/post-edit', this.index]);
  }
  onClick() {
    this.postService.likePost(this.index)
    }
  
    //comment part func
    addAComment(commentText: string){
      if(commentText.trim() !== ''){
        this.backEndService.addComment(this.index, commentText);
        this.commentText = '';
      }
    }

}

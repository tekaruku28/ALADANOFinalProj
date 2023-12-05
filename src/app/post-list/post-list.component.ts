import { Component, OnInit } from '@angular/core';
import{Post} from '../post.model';
import { PostService } from '../post.service';
import { BackEndService } from '../back-end.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{
  index = 0;
  listofPosts: Post[]=[];
  

constructor(private backEndService: BackEndService, private postService: PostService ) {}

ngOnInit() {
  this.listofPosts = this.postService.getPost();
  this.backEndService.fetchData().subscribe((posts) => { 
  this.listofPosts = posts;
  });
}

}



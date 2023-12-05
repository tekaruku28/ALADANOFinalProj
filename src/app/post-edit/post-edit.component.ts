import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Post } from '../post.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BackEndService } from '../back-end.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent {
  //identifiers
  form!: FormGroup;
  index: number = 0;
  editMode = false;
  
  constructor(private postService:PostService, private route:Router, 
    private actRoute: ActivatedRoute, private backEndService: BackEndService){}

  ngOnInit(): void{

    // identifier for parameters
let editTitle = "";
let editDescription = "";
let editImgPath = "";

      this.actRoute.params.subscribe((params: Params) => {
         if(params['index']){
          console.log(params['index']);
          this.index = params['index'];
         
          const post = this.postService.getSpecPost(this.index);

          editTitle = post.title;
          editDescription = post.description;
          editImgPath = post.imgPath;
          
          this.editMode = true;

        }
      }
      );

    this.form = new FormGroup({
      title: new FormControl(editTitle, [Validators.required]),
      imgPath: new FormControl(editImgPath, [Validators.required]),
      description: new FormControl(editDescription, [Validators.required])
     })
    }

  //submit function  
    onsubmit(){
      const title = this.form.value.title;
      const imgPath = this.form.value.imgPath;
      const description = this.form.value.description;

      const post: Post = new Post(
        title, imgPath, description, '', new Date(), 0, []
        );
      

        if(this.editMode == true) {
            this.postService.updatePost(this.index, post);
            this.backEndService.updateData(this.index, post);

          }else{
            this.postService.addPost(post);
            this.backEndService.saveData();
          }

        this.route.navigate(['post-list']);
     }
}

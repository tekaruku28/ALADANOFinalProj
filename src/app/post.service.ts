import { EventEmitter, Injectable } from '@angular/core';
import{ Post } from './post.model';

@Injectable({ providedIn: 'root'})
export class PostService{
    listChangeEvent: EventEmitter<Post[]> = new EventEmitter();
    listofPosts: Post[]=[
        // new Post(
        //   'Valorant',
        //   'Dave Angelo',
        //   'Valorant is a popular first-person tactical shooter video game developed and published by Riot Games. Released in 2020, Valorant has quickly gained a dedicated fan base and established itself as a competitive esports title. The game is known for its strategic gameplay, precise gunplay, and unique character abilities. In Valorant, players assume the roles of "agents," each with their own distinct set of abilities. These abilities can range from offensive skills like deploying barriers or throwing fireballs to defensive tools such as healing or revealing enemy positions. The combination of gunplay and agent abilities encourages players to work as a team, devising strategies to outsmart and outmaneuver their opponents.',
        //   new Date(),
        //   'https://images.livemint.com/img/2020/06/03/1600x900/Valorant_1591218052835_1591218061187.jpg',  
        //    0

        // )
    ];
    firestore: any;
    http: any;

    getPost(){
        return this.listofPosts;
    }
    deleteButton(index: number){
        this.listofPosts.splice(index, 1);
    }
    addPost(post: Post){
        this.listofPosts.push(post);
    }
    updatePost(index: number, post: Post ){
        this.listofPosts[index] = post;
    }
    getSpecPost(index: number){
        return this.listofPosts[index];
    }
    likePost(userId: string, index: number) {
        const post = this.listofPosts[index];
        if (!post.likedBy) {
          post.likedBy = [];
        }
        const userIndex = post.likedBy.indexOf(userId);
        if (userIndex === -1) {
          // User has not liked the post yet, so add their ID to the array
          post.likedBy.push(userId);
        } else {
          // User has already liked the post, so remove their ID from the array
          post.likedBy.splice(userIndex, 1);
        }
        post.numberOfLikes = post.likedBy.length;
        this.http.put(`https://aladanoangularproj-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${index}.json`, post)
          .subscribe(() => {
            console.log('Post updated in Firebase');
          });
      }
    
    addComment(index: number, comment: string) {
        if (!this.listofPosts[index].comments) {
            this.listofPosts[index].comments = [];
        }
        this.listofPosts[index].comments.push(comment);
    
        // Save the updated post with the new comment to Firebase
        const postRef = this.firestore.collection('posts').doc(this.listofPosts[index].id);
        postRef.update(this.listofPosts[index]);
    }
    
    setPosts(listsOfPosts:Post[]){
        this.listofPosts = listsOfPosts;
        this.listChangeEvent.emit(listsOfPosts);   
       }
    
    //save data for crud process in db firebase

}
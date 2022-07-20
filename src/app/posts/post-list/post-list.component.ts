import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  // posts = [
  //   { title: 'First Post', content: `First Post's Content` },
  //   { title: 'Secod Post', content: `Second Post's Content` },
  //   { title: 'Third Post', content: `Third Post's Content` },
  // ];

  posts: Post[] = []
  private postsSub: Subscription = new Subscription;

  constructor(public postsService: PostsService) {
  }

  ngOnInit(): void {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }


  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

}

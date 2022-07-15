import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  // posts = [
  //   { title: 'First Post', content: `First Post's Content` },
  //   { title: 'Secod Post', content: `Second Post's Content` },
  //   { title: 'Third Post', content: `Third Post's Content` },
  // ];

  @Input() posts: Post[] = []

  constructor() { }

  ngOnInit(): void {
  }

}

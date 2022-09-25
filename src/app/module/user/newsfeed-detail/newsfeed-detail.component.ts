import {Component, OnInit} from '@angular/core';
import {PostService} from "../../../services/post.service";
import {Post2} from "../../../models/post2";
import {LikePostService} from "../../../services/likePost.service";
import {LikePost} from "../../../models/likePost";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-newsfeed-detail',
  templateUrl: './newsfeed-detail.component.html',
  styleUrls: ['./newsfeed-detail.component.css']
})
export class NewsfeedDetailComponent implements OnInit {

  id = localStorage.getItem('USERID');
  post?: Post2[]
  post1?: Post2
  like?: LikePost[]
  comment?: Comment[]

  constructor(private postService: PostService,
              private userService: UserService,
              private likePostService: LikePostService,
              private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.findOne()
  }

  findOne() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      console.log("id post: " + id)
      // @ts-ignore
      this.postService.findById(id).subscribe(result => {
        this.post1 = result
      }, error => {
        console.log("Lỗi: " + error)
      })
    })
  }
}

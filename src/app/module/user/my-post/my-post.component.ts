import {Component, OnInit} from '@angular/core';
import {PostService} from "../../../services/post.service";
import {UserService} from "../../../services/user.service";
import {LikePostService} from "../../../services/likePost.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Post2} from "../../../models/post2";
import {LikePost} from "../../../models/likePost";

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.css']
})
export class MyPostComponent implements OnInit {

  idUserLogIn = localStorage.getItem("USERID")
  post?: Post2[]
  like?: LikePost[]
  idPost?: string
  idUser?: any

  constructor(private postService: PostService,
              private userService: UserService,
              private likePostService: LikePostService,
              private activatedRoute: ActivatedRoute,
              private router: Router,) {
  }

  ngOnInit(): void {
    this.myPost()
  }

  myPost() {
    console.log("id user = " + this.idUserLogIn)
    this.postService.getAllPostByUser(<string>this.idUserLogIn).subscribe(result => {
      console.log("ALO" + result)
      this.post = result
    }, error => {
      console.log("Lỗi: " + error)
    })
  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {FriendRelationService} from "../../../services/friend-relation.service";
import {FriendRelation} from "../../../models/friend-relation";
import {ImageService} from "../../../services/image.service";
import {PostService} from "../../../services/post.service";
import {Post2} from "../../../models/post2";
import {LikePost} from "../../../models/likePost";
import {Comment} from "../../../models/comment";
import {DisLikePost} from "../../../models/dis-like-post";
import {IconHeart} from "../../../models/icon-heart";
import {AnswerComment} from "../../../models/answer-comment";
import {FormControl, FormGroup} from "@angular/forms";
import {CommentService} from "../../../services/comment.service";
import {LikePostService} from "../../../services/likePost.service";
import {LikeCommentService} from "../../../services/like-comment.service";
import {AnswerCommentService} from "../../../services/answer-comment.service";

@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.css']
})
export class PeopleDetailComponent implements OnInit {

  idUserLogIn = localStorage.getItem("USERID")
  friendRelations?: any;
  friend?: FriendRelation;
  user?: User[];
  userDetail?: User
  post?: Post2[]
  countFriend? = 0
  countImage? = 0
  noInfo = 'Không có thông tin'
  currentUser: string = "";
  idUser: string | undefined;
  users!: User[];
  like?: LikePost[]
  likePost?: LikePost
  comment?: Comment[]
  commentOne?: Comment
  disLikePost?: DisLikePost
  heart?: IconHeart
  answerComments?: AnswerComment[]
  check = true
  checkUser2 = false
  checkAlreadyFriend = false
  checkAcceptFriend = false
  checkRemoveFriend = true
  menu: any
  size: any
  avatarUserLogin?: any

  commentCreateForm: FormGroup = new FormGroup({
    content: new FormControl("",)
  })

  answerCommentsForm: FormGroup = new FormGroup({
    content: new FormControl("",)
  })

  constructor(private router: Router,
              private userService: UserService,
              private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private imageService: ImageService,
              private friendRelationService: FriendRelationService,
              private commentService: CommentService,
              private likePostService: LikePostService,
              private likeCommentService: LikeCommentService,
              private answerCommentService: AnswerCommentService,
  ) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const id: any = paramMap.get('id');
      console.log("id user: " + id)
      this.idUser = id
      this.userService.userDetail(id).subscribe(result => {
        this.userDetail = result
      }, error => {
        console.log("Lỗi: " + error)
      })
      this.userService.userDetail(this.idUserLogIn).subscribe(result => {
        this.avatarUserLogin = result.avatar
      })
      this.imageService.allImageOfUser(id).subscribe(result => {
        try {
          this.countImage = result.length
        } catch (err) {
          console.log("lỗi length")
        }
      }, error => {
        console.log("Lỗi: " + error)
      })
      this.postService.getAllPostByUser(id).subscribe(result => {
        this.post = result
      }, error => {
        console.log("Lỗi: " + error)
      })
      this.friendRelationService.agree(this.idUserLogIn, id).subscribe(rs => {
        try {
          if (rs.length > 0) {
            this.checkUser2 = true;
          }
        } catch (err) {
          console.log("lỗi length")
        }
      })
    })
  }

  ngOnInit(): void {
    localStorage.setItem('Url', window.location.href);
    this.allComment()
    this.allAnswerComment()
    this.listRequest()
    this.friendCheck()
    this.friendList()
  }

  friendList() {
    this.friendRelationService.listFriend(this.idUser).subscribe(result => {
      console.log("rs: " + this.checkAcceptFriend)
      this.friendRelations = result
      try {
        this.countFriend = result.length
      } catch (err) {
        console.log("lỗi length")
      }
      for (let i = 0; i < this.friendRelations.length; i++) {
        // console.log("Kiểu dữ liệu: " + JSON.stringify(this.friendRelations[i]))
        if (this.friendRelations[i].id == this.idUserLogIn) {
          this.checkAcceptFriend = true;
        }
      }
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  friendCheck() {
    this.friendRelationService.friend(this.idUserLogIn, this.idUser).subscribe(rs => {
      try {
        if (rs.length > 0) {
          this.checkAcceptFriend = true;
        }
      } catch (err) {
        console.log("lỗi length")
      }
    })
  }

  createLike(idPost: any) {
    console.log("vào hàm createLike")
    const likePost = {
      userLike: {
        id: this.idUserLogIn
      },
      post: {
        id: idPost
      },
    }
    console.log(likePost)
    // @ts-ignore
    this.likePostService.createLike(likePost, idPost, this.idUserLogIn).subscribe(result => {
      this.likePost = result
      this.ngOnInit()
    }, error => {
      console.log("Lỗi: " + error)
      this.ngOnInit()
    })
  }

  createDisLike(idPost: any) {
    console.log("vào hàm createDisLike")
    const disLikePost = {
      userLike: {
        id: this.idUserLogIn
      },
      post: {
        id: idPost
      },
    }
    console.log(disLikePost)
    // @ts-ignore
    this.likePostService.createDisLike(disLikePost, idPost, this.idUserLogIn).subscribe(result => {
      this.disLikePost = result
      console.log(result)
      this.ngOnInit()
    }, error => {
      console.log("Lỗi: " + error)
      this.ngOnInit()
    })
  }

  createHeart(idPost: any) {
    console.log("vào hàm createHeart")
    const heart = {
      userLike: {
        id: this.idUserLogIn
      },
      post: {
        id: idPost
      },
    }
    console.log(heart)
    // @ts-ignore
    this.likePostService.createHeart(heart, idPost, this.idUserLogIn).subscribe(result => {
      this.disLikePost = result
      console.log(result)
    }, error => {
      console.log("Lỗi: " + error)
    })
    this.ngOnInit()
  }

  allAnswerComment() {
    console.log("Vào hàm allAnswerComment")
    this.answerCommentService.getAll().subscribe(rs => {
      this.answerComments = rs
      console.log("Oke")
    })
  }

  allComment() {
    console.log("vào hàm allComment")
    this.commentService.getAll().subscribe(result => {
      // @ts-ignore
      this.comment = result
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  createComment(idPost: any) {
    console.log("vào hàm createComment")
    const comment = {
      content: this.commentCreateForm.value.content,
      user: {
        id: this.idUserLogIn
      },
      post: {
        id: idPost
      }
    }
    // @ts-ignore
    this.commentService.save(comment, this.idUserLogIn, idPost).subscribe(rs => {
      console.log("Đã vào")
      // @ts-ignore
      this.commentOne = rs
      this.ngOnInit()
      console.log("Đã vào" + rs)
    }, error => {
      console.log("Lỗi: " + error)
    })
    this.ngOnInit()
  }

  createLikeComment(idComment: any) {
    console.log("vào hàm createLikeComment")
    const commentLike = {
      userLike: {
        id: this.idUserLogIn
      },
      comment: {
        id: idComment
      },
    }
    // @ts-ignore
    this.likeCommentService.createLikeComment(commentLike, idComment, this.idUserLogIn).subscribe(rs => {
      this.disLikePost = rs
      console.log(rs)
      this.ngOnInit()
    }, error => {
      console.log("Lỗi: " + error)
    })
    this.ngOnInit()
  }

  createDisLikeComment(idComment: any) {
    console.log("vào hàm createDisLikeComment")
    const dislikeComment = {
      userLike: {
        id: this.idUserLogIn
      },
      comment: {
        id: idComment
      },
    }
    // @ts-ignore
    this.likeCommentService.createDisLikeComment(dislikeComment, idComment, this.idUserLogIn).subscribe(rs => {
      this.disLikePost = rs
      this.ngOnInit()
    }, error => {
      console.log("Lỗi: " + error)
    })
    this.ngOnInit()
  }

  createAnswerComment(idComment: any) {
    console.log("vào hàm createAnswerComment")
    const answerComment = {
      content: this.answerCommentsForm.value.content,
      user: {
        id: this.idUserLogIn
      },
      comment: {
        id: idComment
      }
    }
    // @ts-ignore
    this.answerCommentService.save(answerComment, this.idUserLogIn, idComment).subscribe(rs => {
      console.log("Đã vào")
      // @ts-ignore
      this.commentOne = rs
      this.ngOnInit()
    }, error => {
      console.log("Lỗi: " + error)
      this.ngOnInit()
    })
  }

  deleteComment(idComment: any, idPost: any) {
    console.log("idComment là: " + idComment);
    this.commentService.deleteComment(this.idUserLogIn, idComment, idPost).subscribe(rs => {
      this.ngOnInit()
    }, error => {
      console.log(error)
      this.ngOnInit()
    })
  }

  sendRequestFriend(idFriend: any) {
    this.friendRelationService.sendRequestFriend(this.idUserLogIn, idFriend).subscribe(rs => {
      this.ngOnInit()
    })
  }

  listRequest() {
    this.friendRelationService.friendCheck(this.idUserLogIn).subscribe(rs => {
      try {
        for (let i = 0; i < rs.length; i++) {
          if (rs[i].idFriend == this.idUser) {
            this.friend = rs[i]
            this.checkAlreadyFriend = true
          }
        }
      } catch (err) {
        console.log("")
      }
    })
  }

  acceptFriend() {
    this.friendRelationService.acceptFriend(this.idUserLogIn, this.idUser).subscribe(rs => {
      this.checkAlreadyFriend = false
      this.ngOnInit()
    })
  }

  removeFriend() {
    this.friendRelationService.unfriend(this.idUserLogIn, this.idUser).subscribe(rs => {
      this.checkRemoveFriend = false
    })
  }
}

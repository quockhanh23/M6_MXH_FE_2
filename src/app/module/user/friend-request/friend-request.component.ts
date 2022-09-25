import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {FriendRelationService} from "../../../services/friend-relation.service";
import {Router} from "@angular/router";

const URL_HREF = "http://localhost:4200"
declare var $: any;

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnInit {

  idUserLogIn = localStorage.getItem("USERID")
  idUser: string | undefined;
  listFriendRequest?: User[];
  listFriendRequestSend?: User[];
  count1?: any
  count2?: any
  checkHeight1 = 'height: 640px'
  checkHeight2 = 'height: 640px'
  marginTop = 'margin-top: 40px'
  px = 'px'
  myRequest = 'Những người bạn đã gửi lời mời'
  peopleRequest = 'Lời mời kết bạn'
  url = localStorage.getItem("Url")

  constructor(private friendRelationService: FriendRelationService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.listRequestSend()
    this.listRequest()
    console.log(window.location.href)
  }

  listRequestSend() {
    this.friendRelationService.listRequestSend(this.idUserLogIn).subscribe(rs => {
      this.listFriendRequestSend = rs;
      this.count1 = rs.length
      if (this.count1 > 0) {
        this.checkHeight2 = 'height: 100%';
        this.marginTop = 'margin-top:' + ' ' + this.count1 * rs.length + this.px
      }
      console.log(this.count1)
    })
    this.count1 = 0
  }

  listRequest() {
    this.friendRelationService.listRequest(this.idUserLogIn).subscribe(rs => {
      this.listFriendRequest = rs;
      this.count2 = rs.length
      if (this.count2 > 0) {
        this.checkHeight1 = 'height: 100%';
        this.marginTop = 'margin-top:' + ' ' + this.count1 * rs.length + this.px
      }
      console.log(this.count2)
    })
    this.count2 = 0
  }

  acceptFriend(idFriend: any) {
    this.friendRelationService.acceptFriend(this.idUserLogIn, idFriend).subscribe(rs => {
      this.ngOnInit()
    })
  }

  deleteRequest(idFriend: any) {
    this.friendRelationService.unfriend(this.idUserLogIn, idFriend).subscribe(rs => {
      this.ngOnInit()
    })
  }

  back() {
    if (this.url == URL_HREF + '/user/listFriend/' + this.idUserLogIn) {
      this.router.navigate(['user/listFriend', this.idUserLogIn]).then()
    }
    if (this.url == URL_HREF + '/user/newsfeed') {
      this.router.navigate(['user/newsfeed']).then()
    }
  }
}

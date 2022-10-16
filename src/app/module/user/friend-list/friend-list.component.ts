import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {FriendRelationService} from "../../../services/friend-relation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../models/user";


@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  list? = 'Danh sách'
  idUserLogIn = localStorage.getItem("USERID")
  listFriend?: User[];
  count?: any
  count2?: any
  idUser?: any
  nameUser?: any
  obj?: Object
  px?: number
  height: any
  routerLink = 'user/people-detail'
  routerLink2 = 'user/user-detail'
  heightIfBlank1: any
  heightIfBlank2: any
  checkLength = false

  constructor(private userService: UserService,
              private friendRelationService: FriendRelationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    localStorage.setItem('Url', window.location.href);
    this.idUser = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.findById(this.idUser).subscribe(rs => {
      this.nameUser = rs.fullName
    })
    this.friendRelationService.listFriend(this.idUser).subscribe(rs => {
      if (rs.length == 0 || rs.length == undefined) {
        this.checkLength = true
        this.heightIfBlank1 = 'height: 120px'
        this.heightIfBlank2 = 'height: 250px'
      }
      console.log("idUser: " + this.idUser)
      this.count = rs.length
      if (rs.length > 0 && rs.length < 4) {
        this.px = rs.length * 60 + 400
        this.height = 'height: ' + this.px + 'px'
        console.log("px: " + this.px)
      }
      if (rs.length >= 4 && rs.length < 8) {
        this.px = rs.length * 60 + 100
        this.height = 'height: ' + this.px + 'px'
      }
      if (rs.length >= 8) {
        this.px = rs.length * 60
        this.height = 'height: ' + this.px + 'px'
      }
      this.listFriend = rs
      for (let i = 0; i < this.listFriend.length; i++) {
        this.friendRelationService.listMutualFriend(this.listFriend[i].id, this.idUserLogIn).subscribe(rs => {
          this.count2 = rs.length
        })
      }
    }, error => {
      console.log(error)
    })
  }

  back() {
    this.router.navigate([this.routerLink2]).then()
  }

  back2() {
    this.router.navigate([this.routerLink, this.idUser]).then()
  }
}

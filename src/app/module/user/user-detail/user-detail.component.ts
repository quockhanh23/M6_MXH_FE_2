import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {ShortNewService} from "../../../services/short-new.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  my? = 'của tôi'
  currentUser: any
  avatar: string = "";
  cover: string = "";
  url: string = "null";

  constructor(private router: Router,
              private userService: UserService,
              private shortNewService: ShortNewService
  ) {
    if (localStorage.getItem('currentUser') == null) {
      this.router.navigate(['']).then()
    }
    // @ts-ignore
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.avatar = this.currentUser.avatar;
    this.cover = this.currentUser.cover;
    this.userService.getUserProfile(this.currentUser.id).subscribe(result => {
      this.currentUser = result;
      localStorage.setItem('currentUser', JSON.stringify(result));
      this.avatar = this.currentUser.avatar;
      this.cover = this.currentUser.cover;
    }, error => {
      console.log(error);
    })
  }

  ngOnInit(): void {
    localStorage.setItem('UrlUserDetail', window.location.href);
    this.shortNewService.newDay().subscribe()
  }
}

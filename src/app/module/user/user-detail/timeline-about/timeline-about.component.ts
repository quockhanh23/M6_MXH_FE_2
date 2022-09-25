import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-timeline-about',
  templateUrl: './timeline-about.component.html',
  styleUrls: ['./timeline-about.component.css']
})
export class TimelineAboutComponent implements OnInit {

  currentUser: any
  avatar: string = "";
  cover: string = "";
  url: string = "null";

  constructor(private router: Router,
              private userService: UserService,
  ) {
    if (localStorage.getItem('currentUser') == null) {
      this.router.navigate([''])
    }
    // @ts-ignore
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.avatar = this.currentUser.avatar;
    this.cover = this.currentUser.cover;
    this.userService.getUserProfile(this.currentUser.id).subscribe(result => {
      this.currentUser = result;
      localStorage.setItem('currentUser',JSON.stringify(result));
      this.avatar = this.currentUser.avatar;
      this.cover = this.currentUser.cover;
    }, error => {
      console.log(error);
    })

  }

  ngOnInit(): void {
  }
}

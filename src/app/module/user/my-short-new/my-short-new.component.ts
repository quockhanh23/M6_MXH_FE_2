import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ShortNewService} from "../../../services/short-new.service";
import {ShortNews} from "../../../models/short-news";

@Component({
  selector: 'app-my-short-new',
  templateUrl: './my-short-new.component.html',
  styleUrls: ['./my-short-new.component.css']
})
export class MyShortNewComponent implements OnInit {

  idUserLogIn = localStorage.getItem("USERID")
  shortNew?: ShortNews[]

  constructor(private userService: UserService,
              private shortNewService: ShortNewService
  ) {
  }

  ngOnInit(): void {
    this.myShortNews()
  }

  myShortNews() {
    this.shortNewService.myShortNews(this.idUserLogIn).subscribe(rs => {
      this.shortNew = rs
    })
  }

  delete(idSortNew: any) {
    this.shortNewService.deleteShortNews(idSortNew, this.idUserLogIn).subscribe(rs => {
      this.ngOnInit()
    })
  }

  delete2(idSortNew: any) {
    this.shortNewService.deleteShortNews2(idSortNew, this.idUserLogIn).subscribe(rs => {
      this.ngOnInit()
    })
  }
}

import {Component, OnInit} from '@angular/core';
import {ShortNews} from "../../../models/short-news";
import {UserService} from "../../../services/user.service";
import {ShortNewService} from "../../../services/short-new.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-short-news-all',
  templateUrl: './short-news-all.component.html',
  styleUrls: ['./short-news-all.component.css']
})
export class ShortNewsAllComponent implements OnInit {

  idUserLogIn = localStorage.getItem("USERID")
  shortNew?: ShortNews[]
  check = false;
  shortNewCreate?: ShortNews
  count?: any;
  height?: string

  shortNewForm: FormGroup = new FormGroup({
    content: new FormControl("",),
    image: new FormControl("",)
  })

  constructor(private userService: UserService,
              private shortNewService: ShortNewService) {
  }

  ngOnInit(): void {
    this.allShortNews()
  }

  allShortNews() {
    this.shortNewService.allShortNews().subscribe(rs => {
      // console.log("Kiểu dữ liệu: " + JSON.stringify(rs))
      this.shortNew = rs
      this.count = rs.length
      if (rs.length == null) {
        this.count = 0;
      }
      if (this.count > 5 && this.count <= 10) {
        this.height = 'height: 120px'
      }
      if (this.count < 5) {
        this.height = 'height: 400px'
      }
      if (this.count > 10) {
        this.height = 'height: 100px'
      }
      console.log(this.height)
      console.log(this.count)
    })
  }

  createShortNew() {
    console.log("vào hàm createShortNew")
    const newShort = {
      content: this.shortNewForm.value.content,
      image: this.shortNewForm.value.image,
      user: {
        id: this.idUserLogIn
      }
    }
    console.log(newShort)
    // @ts-ignore
    this.shortNewService.createShortNew(newShort, this.idUserLogIn).subscribe(rs => {
      this.shortNewCreate = rs
      this.allShortNews()
    }, error => {
      console.log("Lỗi: " + error)
      this.allShortNews()
    })
  }

  showCreate() {
    this.check = true;
    console.log(this.check)
  }

  closeCreate() {
    this.check = false;
  }
}

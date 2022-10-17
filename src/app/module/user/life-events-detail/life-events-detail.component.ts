import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LifeEvents} from "../../../models/life-events";
import {LifeEventsService} from "../../../services/life-events.service";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-life-events-detail',
  templateUrl: './life-events-detail.component.html',
  styleUrls: ['./life-events-detail.component.css']
})
export class LifeEventsDetailComponent implements OnInit {
  date?: string
  idUserLogIn = localStorage.getItem("USERID")
  lifeEvent?: LifeEvents
  lifeEvents?: LifeEvents[]

  lifeEventsCreateForm: FormGroup = new FormGroup({
    work: new FormControl("",),
    timeline: new FormControl("",)
  })

  updateForm = new FormGroup({
    work: new FormControl(''),
    timeline: new FormControl("",)
  });

  constructor(private lifeEventsService: LifeEventsService,
              private userService: UserService,
              private router: Router,) {
  }

  ngOnInit(): void {
  }

  createLifeEvent() {
    console.log("vào hàm createLifeEvent")
    const life = {
      user: {
        id: this.idUserLogIn
      },
      work: this.lifeEventsCreateForm.value.work,
      timeline: this.lifeEventsCreateForm.value.timeline,
    }
    console.log(life)
    // @ts-ignore
    this.lifeEventsService.createLifeEvents(life, this.idUserLogIn).subscribe(result => {
      this.lifeEvent = result
    }, error => {
      console.log("Lỗi: " + error)
    })
  }

  getOne(idLifeEvent: any) {
    console.log("vào hàm getOne")
    // @ts-ignore
    this.lifeEventsService.getOne(this.idUserLogIn, idLifeEvent).subscribe(result => {
      this.lifeEvent = result
    }, error => {
      console.log("Lỗi: " + error)
    })
  }
}

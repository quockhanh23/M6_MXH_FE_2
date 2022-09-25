import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {MessengerService} from "../../../services/messenger.service";
import {Messenger} from "../../../models/messenger";
import {User} from "../../../models/user";
import {Conversation} from "../../../models/conversation";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-messenger-detail',
  templateUrl: './messenger-detail.component.html',
  styleUrls: ['./messenger-detail.component.css']
})
export class MessengerDetailComponent implements OnInit {
  idConversation?: any
  idUserLogIn = localStorage.getItem("USERID")
  messengers?: Messenger[]
  messenger?: Messenger
  user?: User
  idUser?: any
  conversation?: Conversation
  withUser = 'Đang trò truyện với : '
  count = 0
  count2 = 0
  height: any
  background: any
  myScrollContainer: any;
  border = 'border: #b2dba1 1px solid'

  messengerForm: FormGroup = new FormGroup({
    content: new FormControl("",),
    image: new FormControl("",)
  })


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private messengerService: MessengerService) {
  }

  ngOnInit(): void {
    this.idUser = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("idUser: " + this.idUser)
    this.userService.findById(this.idUser).subscribe(rs => {
      this.user = rs;
    })
    // @ts-ignore
    this.messengerService.myMessenger(this.idUserLogIn).subscribe(rs => {
      for (let i = 0; i < rs.length; i++) {
        console.log("idUser: " + this.idUser)
        if (rs[i].idSender?.id == this.idUserLogIn && rs[i].idReceiver?.id == this.idUser) {
          this.conversation = rs[i]
          break
        }
        if (rs[i].idReceiver?.id == this.idUserLogIn && rs[i].idSender?.id == this.idUser) {
          this.conversation = rs[i]
          break
        }
      }
      this.idConversation = this.conversation?.id
      if (this.idConversation == undefined) {
        // @ts-ignore
        this.messengerService.createConversation(this.idUserLogIn, this.idUser).subscribe(rs => {
          this.conversation = rs
          console.log("this.conversation" + this.conversation)
          this.idConversation = this.conversation?.id
        })
      }
      console.log("idConversation: " + this.idConversation)
      this.findById();
    })
    this.scrollToBottom()
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }

  findById() {
    this.messengerService.messenger(this.idUser, this.idConversation).subscribe(rs => {
      console.log("this.messenger" + this.messengers)
      this.messengers = rs
      this.count = rs.length
      this.checkCount()
    }, error => {
      this.checkCount()
    })
    // @ts-ignore
    this.messengerService.messenger(this.idUserLogIn, this.idConversation).subscribe(rs => {
      console.log("this.messenger" + this.messengers)
      this.messengers = rs
      this.count2 = rs.length
      this.checkCount()
    }, error => {
      this.checkCount()
    })
  }

  checkCount() {
    console.log("alo")
    if (this.count == 0 && this.count2 == 0) {
      this.height = 'height: 400px'
      console.log("vào đây 1 " + this.count + this.count2)
    } else {
      let px = this.count2 * 2
      this.height = 'height: ' + px + 'px'
      console.log("vào đây 2 " + this.count + this.count2)
    }
    console.log("" + this.height)
  }

  createMessenger(idConversation: any) {
    console.log("vào hàm createMessenger")
    const newMessenger = {
      content: this.messengerForm.value.content,
      image: this.messengerForm.value.image,
    }
    console.log(newMessenger)
    // @ts-ignore
    this.messengerService.createMessenger(idConversation, this.idUserLogIn, newMessenger).subscribe(rs => {
      console.log("vào đây")
      this.messenger = rs
    }, error => {
      console.log("Lỗi: " + error)
    })
    this.ngOnInit()
  }

  changeBackgroundColor1() {
    this.background = 'background-color: pink'
  }

  changeBackgroundColor2() {
    this.background = 'background-color: #afd9ee'
  }

  changeBackgroundColor3() {
    this.background = 'background-color: #1deecf'
  }
}

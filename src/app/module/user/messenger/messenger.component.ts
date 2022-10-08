import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MessengerService} from "../../../services/messenger.service";
import {UserService} from "../../../services/user.service";
import {FriendRelationService} from "../../../services/friend-relation.service";
import {User} from "../../../models/user";
import {Conversation} from "../../../models/conversation";
import {Messenger} from "../../../models/messenger";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {finalize, Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  idConversation?: string
  idUserLogIn = localStorage.getItem("USERID")
  listFriend?: User[];
  conversations?: Conversation[];
  conversation?: Conversation;
  messengers?: Messenger[]
  messenger?: Messenger
  userName?: User
  userName1?: User
  idUser?: any
  withUser = 'Đang trò truyện với : '
  border = 'border: #b2dba1 1px solid'
  countFriend = 0
  content: any;
  myScrollContainer: any;
  count = 0
  background: any
  checkDone = false
  checkButton = true
  checkConversation = true
  checkOpenInfo = false
  withMessage = 12
  withInfo = 0
  fb: any;
  downloadURL!: Observable<string>;

  messengerForm: FormGroup = new FormGroup({
    content: new FormControl("",),
    image: new FormControl("",)
  })

  constructor(private userService: UserService,
              private friendRelationService: FriendRelationService,
              private messengerService: MessengerService,
              private storage: AngularFireStorage,
              private router: Router) {
  }

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }

  ngOnInit(): void {
    this.friendRelationService.listFriend(this.idUserLogIn).subscribe(rs => {
      this.listFriend = rs
      try {
        this.countFriend = rs.length
      } catch (err) {
        console.log("lỗi length")
      }
    })
    // @ts-ignore
    this.messengerService.myMessenger(this.idUserLogIn).subscribe(rs => {
      this.conversations = rs
    })
    this.scrollToBottom();
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log("lỗi scroll")
    }
  }

  createConversation(idReceiver: any) {
    // @ts-ignore
    this.messengerService.createConversation(this.idUserLogIn, idReceiver).subscribe(rs => {
      this.conversation = rs
      this.idConversation = rs.id
      localStorage.setItem("idConversation", <string>rs.id)
      console.log("idConversation: " + this.idConversation)
      // @ts-ignore
      this.messengerService.findAllByConversationOrderById(this.idConversation).subscribe(rs => {
        this.messengers = rs
        try {
          this.count = rs.length
        } catch (err) {
          console.log("lỗi length")
        }
      })
      // @ts-ignore
      this.messengerService.findById(this.idConversation).subscribe(rs => {
        if (rs != null) {
          this.conversation = rs
        }
      })
      this.userService.findById(this.conversation?.idReceiver?.id).subscribe(rs => {
        this.userName = rs
      })
      this.userService.findById(this.conversation?.idSender?.id).subscribe(rs => {
        this.userName1 = rs
      })
      this.ngOnInit()
    })
  }

  createMessenger(idConversation: any) {
    console.log("vào hàm createMessenger")
    const newMessenger = {
      content: this.messengerForm.value.content,
      image: this.fb
    }
    console.log(newMessenger)
    // @ts-ignore
    this.messengerService.createMessenger(idConversation, this.idUserLogIn, newMessenger).subscribe(rs => {
      console.log("vào đây")
      // @ts-ignore
      this.messengerService.findAllByConversationOrderById(this.idConversation).subscribe(rs => {
        this.messengers = rs
        this.fb = null
        try {
          this.count = rs.length
        } catch (err) {
          console.log("lỗi length")
        }
        this.ngOnInit()
      })
    }, error => {
      console.log("Lỗi: " + error)
    })
    this.ngOnInit()
  }

  onFileSelected(event: any) {
    this.checkDone = true
    this.checkButton = false
    let n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
            this.checkDone = false
            this.checkButton = true
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  closeMessage() {
    this.checkConversation = false
  }

  openMessage() {
    this.checkConversation = true
    this.ngOnInit()
  }

  openInfo() {
    this.checkOpenInfo = true
    this.withMessage = 9
    this.withInfo = 3
  }

  closeInfo() {
    this.checkOpenInfo = false
    this.withMessage = 12
    this.withInfo = 0
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

  changeBackgroundColor4() {
    this.background = 'background-color: #fcfcfc'
  }
}

import {Component, OnInit} from '@angular/core';
import {GroupService} from "../../../services/group.service";
import {TheGroup} from "../../../models/the-group";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
  idUserLogIn = localStorage.getItem("USERID")
  theGroup?: TheGroup
  idGroup?: any

  constructor(private groupService: GroupService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const id: any = paramMap.get('id');
      console.log("id idGroup: " + id)
      this.idGroup = id;
    })
    this.check()
  }

  check() {
    this.groupService.createGroupParticipant(this.idUserLogIn, this.idGroup).subscribe(rs => {
    })
  }

  joinGroupParticipant() {
    this.groupService.createGroupParticipant(this.idUserLogIn, this.idGroup).subscribe(rs => {
    })
  }
}

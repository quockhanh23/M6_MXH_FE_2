import {Component, OnInit} from '@angular/core';
import {GroupService} from "../../../services/group.service";
import {TheGroup} from "../../../models/the-group";

@Component({
  selector: 'app-group-shared',
  templateUrl: './group-shared.component.html',
  styleUrls: ['./group-shared.component.css']
})
export class GroupSharedComponent implements OnInit {

  idUserLogIn = localStorage.getItem("USERID")
  theGroup?: TheGroup[]

  constructor(private groupService: GroupService,
  ) {
  }

  ngOnInit(): void {
    this.groupService.allGroup().subscribe(rs => {
      this.theGroup = rs
    })
  }
}

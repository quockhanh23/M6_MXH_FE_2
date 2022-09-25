import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-log-out',
  templateUrl: './dialog-log-out.component.html',
  styleUrls: ['./dialog-log-out.component.css']
})
export class DialogLogOutComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogLogOutComponent>) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

import { Component, OnInit } from '@angular/core';
import {HeadService} from "../../services/head.service";
import {SITE_NAME} from "../../services/data.service";

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {

  constructor(
      private _head : HeadService
  ) { }

  ngOnInit() {
      this._head.setPageTitle('Page 404 | ' + SITE_NAME );
  }

}

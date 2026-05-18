import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tabeau-cours-devises',
  templateUrl: './tabeau-cours-devises.component.html',
  styleUrls: ['./tabeau-cours-devises.component.scss']
})
export class TabeauCoursDevisesComponent implements OnInit {
  @Input() var1 : string;
  constructor() { }

  ngOnInit() {
  }

}

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {codeWS, DataService} from '../../services/data.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FaqComponent implements OnInit {
  title = 'Foire aux questions';
  foireAuxQuestion: any;

  constructor(private _data: DataService) {
  }


  ngOnInit() {
    this._data.dataResponse.subscribe(art => {
      if (art.code === codeWS.FOIRE_AUX_QUESTIONS) {
        this.foireAuxQuestion = art.data.data['tab'];

      }
    });
    this._data.getWpData('/bfm/faq');
  }
}

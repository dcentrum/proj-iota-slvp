import { Component } from '@angular/core';
import { MamService } from './core/mam.service';
import { IotaService } from './core/iota.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'iotangular';
  constructor(private mam: MamService, private iota: IotaService) {
    this.iota.getNodeInfo();
  }
}
``
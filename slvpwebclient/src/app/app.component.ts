import { Component } from '@angular/core';
import { MamService } from './core/mam.service';
import { IotaService } from './core/iota.service';
declare let window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ipfs:any;
  title = 'tangular';
  constructor(private mam: MamService, private iota: IotaService) {
    //this.iota.getNodeInfo();
    window.addEventListener('load', function () {      
      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof window.IpfsHttpClient !== 'undefined') {
        // Use Mist/MetaMask's provider
        this.ipfs = window.IpfsHttpClient('ipfs.inpura.io', '5001')
      }
      console.log(this.ipfs);
    });
  }
  
}
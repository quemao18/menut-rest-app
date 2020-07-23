import { Component, OnInit} from '@angular/core';
import { VersionCheckService } from './services/version/version-check.service';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

    constructor(private versionCheckService: VersionCheckService){
      
    }

    ngOnInit(){
      this.versionCheckService.initVersionCheck(environment.versionCheckURL);
    }
}

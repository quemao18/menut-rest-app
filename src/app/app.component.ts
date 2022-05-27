import { Component, OnInit} from '@angular/core';
import { VersionCheckService } from './services/version/version-check.service';
import { environment } from 'environments/environment';
import { MessagingService } from './services/notification/messaging.service';
import { SettingService } from './services/settings/setting.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

    constructor(
      private versionCheckService: VersionCheckService, 
      private messagingService: MessagingService,
      private settingService: SettingService
      ){      
        this.redirect();
    }

    private settings: any;

    async ngOnInit(){
    
      await this.getSettings();
      // this.versionCheckService.initVersionCheck(environment.versionCheckURL);
      if(this.settings.fcm)
        this.messagingService.requestPermission();

    }

    async getSettings() {
      await this.settingService.gets().toPromise().then(
        (docs: any)=>{
          docs.forEach((data: any) => {
            console.log(data)
            this.settings = data.data;
            localStorage.setItem('settings', JSON.stringify(this.settings));
          });
      })
    }

    redirect(){
      //dev
      if(window.location.hostname === 'dev.admin.chacaitoba.com')
        window.location.href = 'https://dev.admin.chacaitoba.com/#/dashboard';
      if(window.location.hostname === 'dev.menu.chacaitoba.com')
        window.location.href = 'https://dev.menu.chacaitoba.com/#/customer';
      if(window.location.hostname === 'dev.mesonero.chacaitoba.com')
        window.location.href = 'https://dev.mesonero.chacaitoba.com/#/waiter';
      //prod
      if(window.location.hostname === 'admin.chacaitoba.com')
        window.location.href = 'https://admin.chacaitoba.com/#/dashboard';
      if(window.location.hostname === 'menu.chacaitoba.com')
        window.location.href = 'https://menu.chacaitoba.com/#/customer';
      if(window.location.hostname === 'mesonero.chacaitoba.com')
        window.location.href = 'https://mesonero.chacaitoba.com/#/waiter';
    }
}

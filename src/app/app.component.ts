import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { VersionCheckService } from './services/version/version-check.service';
import { environment } from 'environments/environment';
import { MessagingService } from './services/notification/messaging.service';
import { SettingService } from './services/settings/setting.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from './services/theme/theme.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{

    constructor(
      private versionCheckService: VersionCheckService, 
      private messagingService: MessagingService,
      private settingService: SettingService,
      private afs: AngularFirestore,
      private themeService: ThemeService,
      @Inject(DOCUMENT) private document: Document
      ){      
    }

    private settingsCollection: AngularFirestoreCollection<any>;
    settings: Observable<any[]>;

    ngOnInit(){
      this.settings = this.settingService.getSettings;
      this.messagingService.requestPermission();
      this.messagingService.receiveMessage();
      if(environment.production){
        this.versionCheckService.checkForUpdates();  
      }

    }

    getSettings() {
      this.settingsCollection = this.afs.collection<any>('settings', 
      ref => ref.where('projectId', '==', environment.firebaseConfig.projectId));
      this.settingsCollection.valueChanges({idField: 'id'})
      .subscribe(data => {
        if(data && data.length > 0){
          this.settingService.setSettings(data[0]);
          // this.themeService.setTheme('chancho-taco');
          this.themeService.setTheme(data[0].projectId);
        }else{
          this.settingsCollection.add({projectId: environment.firebaseConfig.projectId})
        }
      });
    }

    redirect(){
      //prod
      /** 
       * no use
      if(window.location.hostname === 'admin.chacaitoba.com')
        window.location.href = 'https://admin.chacaitoba.com/#/dashboard';
      if(window.location.hostname === 'menu.chacaitoba.com')
        window.location.href = 'https://menu.chacaitoba.com/#/customer';
      if(window.location.hostname === 'mesonero.chacaitoba.com')
        window.location.href = 'https://mesonero.chacaitoba.com/#/waiter';
      */
    }
}

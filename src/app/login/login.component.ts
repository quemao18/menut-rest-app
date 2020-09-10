import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SettingService } from 'app/services/settings/setting.service';
import { MessagingService } from 'app/services/notification/messaging.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  profileForm = new FormGroup({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
  });
  settings: any;

  constructor(public authService: AuthService, private formBuilder: FormBuilder, private settingService: SettingService, private messagingService: MessagingService) { }

  async ngOnInit() {
    await this.getSettings();
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

}

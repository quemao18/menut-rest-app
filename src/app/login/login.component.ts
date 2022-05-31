import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';



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

  constructor(public authService: AuthService) { }

  async ngOnInit() {

  }
}

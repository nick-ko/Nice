import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authService: AuthService, private router: Router, private loadingCtrl: LoadingController) { }
    isLoading = false;
    isLogin = true;
  ngOnInit() {
  }

  register() {
      this.isLoading = true;
      this.authService.login();
      this.loadingCtrl.create({keyboardClose: true, message: 'Inscription ...'}).then(loadingEl => {
          loadingEl.present();
          setTimeout(() => {
              this.isLoading = false;
              loadingEl.dismiss();
              this.router.navigateByUrl('/places/tabs/discover');
          }, 1500);
      });
  }

}

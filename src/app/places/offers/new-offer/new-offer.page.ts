import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PlacesService} from '../../places.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  form: FormGroup;

  constructor(private placeService: PlacesService, private router: Router, private loadingController: LoadingController) { }

  ngOnInit() {
    this.form = new FormGroup({
        title: new FormControl(null, {
          updateOn: 'blur',
          validators : [Validators.required]
        }),
        description: new FormControl(null, {
            updateOn: 'blur',
            validators : [Validators.required]
        }),
        price: new FormControl(null, {
            updateOn: 'blur',
            validators : [Validators.required]
        }),
        phone: new FormControl(null, {
            updateOn: 'blur',
            validators : [Validators.required]
        })
    });
  }

  createNewOffer() {
      if (!this.form.valid) {
          return;
      }

      this.loadingController.create({
          message: 'Creationde votre site touristique........'
      }).then(loadingEl => {
          loadingEl.present();

          this.placeService.addPlace(this.form.value.title,
              this.form.value.description,
              'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
              this.form.value.price,
              this.form.value.phone)
              .subscribe(() => {
              loadingEl.dismiss();
              this.form.reset();
              this.router.navigate(['/places/tabs/offers']);
          });
      });

  }

}

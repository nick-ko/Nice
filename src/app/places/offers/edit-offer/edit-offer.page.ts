import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlacesService} from '../../places.service';
import {LoadingController, NavController} from '@ionic/angular';
import {Place} from '../../places.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
    place: Place;
    form: FormGroup;
    private placesSub: Subscription;

  constructor(private route: ActivatedRoute,
              private placeService: PlacesService,
              private navCtrl: NavController,
              private router: Router,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.placesSub = this.placeService.findPlace(paramMap.get('placeId')).subscribe(places => {
           // @ts-ignore
           this.place = places;
           this.form = new FormGroup({
               title: new FormControl(this.place.title, {
                   updateOn: 'blur',
                   validators : [Validators.required]
               }),
               description: new FormControl(this.place.description, {
                   updateOn: 'blur',
                   validators : [Validators.required]
               }),
               price: new FormControl(this.place.price, {
                   updateOn: 'blur',
                   validators : [Validators.required]
               }),
               phone: new FormControl(this.place.phone, {
                   updateOn: 'blur',
                   validators : [Validators.required, Validators.maxLength(8)]
               })
           });
       });
    });
  }

  updateOffer() {
      if (!this.form.valid) {
        return;
      }
      this.loadingCtrl.create({
          message: 'mise a jour.....'
      }).then(loadingEl => {
          loadingEl.present();
          this.placeService.updatePlace(this.place.id, this.form.value.title, this.form.value.description, this.form.value.price, this.form.value.phone
          ).subscribe(() => {
              loadingEl.dismiss();
              this.form.reset();
              this.router.navigate(['/places/tabs/offers']);
          });
      });

  }

    ngOnDestroy() {
        if (this.placesSub) {
            this.placesSub.unsubscribe();
        }
    }

}

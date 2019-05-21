import {Component, OnDestroy, OnInit} from '@angular/core';
import {Place} from '../../places.model';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {PlacesService} from '../../places.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {
  place: Place[];
  private placesSub: Subscription;

  constructor(private route: ActivatedRoute, private navCtrl: NavController, private placesService: PlacesService) { }

  ngOnInit() {

    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.placesSub = this.placesService.findPlace(paramMap.get('placeId')).subscribe(places => {
         // @ts-ignore
          this.place = places;
       });
    });
  }

    ngOnDestroy() {
        if (this.placesSub) {
            this.placesSub.unsubscribe();
        }
    }

}

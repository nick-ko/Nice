import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlacesService} from '../places.service';
import { Place } from '../places.model';
import {IonItemSliding} from '@ionic/angular';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
    offers: Place[];
    private placesSub: Subscription;

  constructor(private placesService: PlacesService, private router: Router) { }

  ngOnInit() {
       this.placesSub = this.placesService.place.subscribe(places => {
           this.offers = places;
       });
  }
  onEdit(offerId: string, slidingItem: IonItemSliding) {
      slidingItem.close();
      this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]);
      console.log('editer  ' + offerId);
  }
    onDelete(offerId: string, slidingItem: IonItemSliding) {
        slidingItem.close();
        console.log('supprimer  ' + offerId);
    }

    ngOnDestroy() {
        if (this.placesSub) {
            this.placesSub.unsubscribe();
        }
    }

}

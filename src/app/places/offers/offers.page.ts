import { Component, OnInit } from '@angular/core';
import {PlacesService} from '../places.service';
import { Place } from '../places.model';
import {IonItemSliding} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
    loadedPlace: Place;

  constructor(private placesService: PlacesService, private router: Router) { }

  ngOnInit() {
      // @ts-ignore
      this.loadedPlace = this.placesService.getPlace();
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

}

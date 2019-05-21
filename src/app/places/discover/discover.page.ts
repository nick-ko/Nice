import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlacesService} from '../places.service';
import {Place} from '../places.model';
import {SegmentChangeEventDetail} from '@ionic/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit , OnDestroy {
  loadedPlace: Place[];
  listedLoadedPlaces: Place[];
  relevantPlace: Place[];
  private placesSub: Subscription;
  private chosenFilter = 'all';


  constructor(private placesService: PlacesService, private authService: AuthService) { }

  ngOnInit() {
       this.placesSub = this.placesService.place.subscribe(places => {
           this.loadedPlace = places;
           this.relevantPlace = this.loadedPlace;
           this.listedLoadedPlaces = this.relevantPlace.slice(1);
       });

  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
         if (event.detail.value === 'all') {
             this.relevantPlace = this.loadedPlace;
             this.loadedPlace = this.relevantPlace;
         } else {
             this.relevantPlace = this.loadedPlace.filter(place => place.userId !== this.authService.userId);
         }
         this.listedLoadedPlaces = this.relevantPlace.slice(1);
  }

    ngOnDestroy() {
        if (this.placesSub) {
            this.placesSub.unsubscribe();
        }
    }

}

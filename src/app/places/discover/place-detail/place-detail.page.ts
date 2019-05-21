import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PlacesService} from '../../places.service';
import {Place} from '../../places.model';
import {ActionSheetController, LoadingController, ModalController, NavController} from '@ionic/angular';
import {CreateBookingComponent} from '../../../bookings/create-booking/create-booking.component';
import {Subscription} from 'rxjs';
import {BookingService} from '../../../bookings/booking.service';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit , OnDestroy {
        place: Place;
        isBookable=false;
        private placesSub: Subscription;

  constructor(private route: ActivatedRoute,
              private placesService: PlacesService,
              private navCtrl: NavController,
              private modalController: ModalController,
              private actionSheetCtrl: ActionSheetController,
              private bookingService: BookingService,
              private loadingCtrl: LoadingController,
              private authService: AuthService) { }

  ngOnInit() {
      this.route.paramMap.subscribe(paramMap => {
          if (!paramMap.has('placeId')) {
              this.navCtrl.navigateBack('/places/tabs/offers');
              return;
          }
          this.placesSub = this.placesService.findPlace(paramMap.get('placeId')).subscribe(place => {
           this.place = place;
           this.isBookable = place.userId !== this.authService.userId;
       });
      });
  }

  onBook() {
      this.actionSheetCtrl.create({
         header: 'Reservation',
          buttons: [
              {
                  text: 'Selectionnez la Date de la visite',
                  handler: () => {
                      this.openBookingModal('select');
                  }
              },
              {
                  text: 'Annuler',
                  role: 'cancel'
              }
          ]
      }).then(actionSheetEl => {
          actionSheetEl.present();
      });
    }
    openBookingModal(mode: 'select') {
        console.log(mode);

        this.modalController.create({component: CreateBookingComponent, componentProps: {selectedPlace: this.place }})
            .then(modalEl => {
                modalEl.present();
                return modalEl.onDidDismiss();
            }).then(resultData => {
            console.log(resultData.data, resultData.role);
            if (resultData.role === 'confirm') {
                this.loadingCtrl.create({message: 'reseration.....'}).then(loadingEl => {
                    loadingEl.present();
                    const data = resultData.data.bookingData;
                    this.bookingService.addBooking(this.place.id,
                        this.place.title,
                        this.place.imageUrl,
                        data.firstName,
                        data.lastName,
                        data.guessNumber,
                        data.startDate,
                        data.endDate).subscribe(() => {
                            loadingEl.dismiss();
                    });
                    console.log('Reservé');
                });
            }
        });
    }

    ngOnDestroy() {
        if (this.placesSub) {
            this.placesSub.unsubscribe();
        }
    }

}

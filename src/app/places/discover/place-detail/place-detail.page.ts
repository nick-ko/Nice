import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PlacesService} from '../../places.service';
import {Place} from '../../places.model';
import {ActionSheetController, ModalController, NavController} from '@ionic/angular';
import {CreateBookingComponent} from '../../../bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
    place: Place;

  constructor(private route: ActivatedRoute,
              private placesService: PlacesService,
              private navCtrl: NavController,
              private modalController: ModalController,
              private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
      this.route.paramMap.subscribe(paramMap => {
          if (!paramMap.has('placeId')) {
              this.navCtrl.navigateBack('/places/tabs/offers');
              return;
          }
          this.place = this.placesService.findPlace(paramMap.get('placeId'));
      });
  }

  onBook() {
      this.actionSheetCtrl.create({
         header: 'Selectionner une action',
          buttons: [
              {
                  text: 'Selectionnez la Date de visite',
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
        });
    }

}

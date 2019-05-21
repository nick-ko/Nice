import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookingService} from './booking.service';
import {BookingModel} from './booking.model';
import {IonItemSliding, LoadingController} from '@ionic/angular';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBooking: BookingModel[];
  private bookingSub: Subscription;

  constructor(private bookingService: BookingService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
     this.bookingSub = this.bookingService.bookings.subscribe(bookings => {
       this.loadedBooking = bookings;
     });
  }

    onCancel(bookingId: string, slidingBooking: IonItemSliding) {
        slidingBooking.close();
        this.loadingCtrl.create({message: 'suppression en cours....'}).then(loadingEl => {
          loadingEl.present();
          this.bookingService.cancelBooking(bookingId).subscribe(() => {
             loadingEl.dismiss();
           });
        });

    }

    ngOnDestroy() {
        if (this.bookingSub) {
            this.bookingSub.unsubscribe();
        }
    }

}

import { Component, OnInit } from '@angular/core';
import {BookingService} from './booking.service';
import {BookingModel} from './booking.model';
import {IonItemSliding} from '@ionic/angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  loadedBooking: BookingModel[];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.loadedBooking = this.bookingService.bookings;
  }

    onCancel(offerId: string, slidingBooking: IonItemSliding) {
        slidingBooking.close();
        console.log('annuler  ' + offerId);
    }

}

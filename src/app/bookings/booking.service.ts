import {Injectable} from '@angular/core';
import {BookingModel} from './booking.model';

@Injectable({providedIn: 'root'})

export class BookingService {
    private _bookings: BookingModel[] = [{
        id: 'xyz',
        placeId : 'p2',
        placeTitle: 'Manhattan Masion',
        guessNumber: 2,
        userId: 'abc'
    }];

    get bookings() {
       return [...this._bookings];
    }
}

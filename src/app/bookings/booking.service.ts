import {Injectable} from '@angular/core';
import {BookingModel} from './booking.model';
import {BehaviorSubject} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {delay, take, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class BookingService {
    private _bookings = new BehaviorSubject<BookingModel[]>([]);

    constructor(private authService: AuthService) {}

    get bookings() {
       return this._bookings.asObservable();
    }

    addBooking(placeId: string,
               placeTitle: string,
               placeImage: string,
               firstName: string,
               lastName: string,
               guessNumber: number,
               availableFrom: Date,
               availableTo: Date) {

        const newBooking = new BookingModel(Math.random().toString(),
            placeId,
            this.authService.userId,
            placeTitle,
            placeImage,
            firstName,
            lastName,
            guessNumber,
            availableFrom,
            availableTo);
        return this.bookings.pipe(take(1),
         delay(1000),
        tap(bookings => {
            this._bookings.next(bookings.concat(newBooking));
        })
        );

    }
    cancelBooking(bookingId: string) {
        return this.bookings.pipe(take(1),
            delay(1000),
            tap(bookings => {
                this._bookings.next(bookings.filter(b => b.id !== bookingId));
            })
        );
    }
}

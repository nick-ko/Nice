import { Injectable } from '@angular/core';
import {Place} from './places.model';
import {AuthService} from '../auth/auth.service';
import {BehaviorSubject} from 'rxjs';
import {take, map, tap, delay} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class PlacesService {

    private _places  = new BehaviorSubject<Place []>([
        new Place(
            'p1',
            'Abidjan',
            'Abidjan By Night.',
            'data:image/jpeg;base64,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',
            149.99,
            56789030,
            'abc'
        ),
        new Place(
            'p2',
            'L\'Amour Toujours',
            'A romantic place in Paris!',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Paris_Night.jpg/1024px-Paris_Night.jpg',
            189.99,
            785908945,
            'abc'
        ),
        new Place(
            'p3',
            'The Foggy Palace',
            'Not your average city trip!',
            'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
            99.99,
            450978344,
            'abc'
        )
    ]);

  get place() {
    return this._places.asObservable();
  }

  constructor(private authService: AuthService) { }

  findPlace(id: string) {
    return this.place.pipe(
        take(1),
        map(places => {
        return {...places.find(p => p.id === id)};
    })
    );

  }

  addPlace(title: string, description: string, imageUrl: string, price: number, phone: number) {
    const newPlace = new Place(Math.random().toString(),
        title,
        description,
        imageUrl,
        price,
        phone,
        this.authService.userId);
    console.log(newPlace);
    return this.place.pipe(
        take(1),
        delay(1000),
        tap(places => {
            this._places.next(places.concat(newPlace));
    })
    );
  }

  updatePlace(placeId: string, title: string, description: string, price: number, phone: number) {

      return this.place.pipe(take(1), delay(1000), tap(places => {
          // @ts-ignore
          const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
          const updatePlace = [...places];
          const oldPlace = updatePlace[updatedPlaceIndex];
          updatePlace[updatedPlaceIndex] = new Place(oldPlace.id, title, description, oldPlace.imageUrl, price, phone, oldPlace.userId);
          this._places.next(updatePlace);
      }));
  }

}

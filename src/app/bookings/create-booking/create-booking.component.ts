import {Component, Input, OnInit} from '@angular/core';
import {Place} from '../../places/places.model';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
 @Input() selectedPlace: Place;
  constructor(private modalClr: ModalController) { }

  ngOnInit() {}

  onCancel() {
    this.modalClr.dismiss(null, 'annuler');
  }

}

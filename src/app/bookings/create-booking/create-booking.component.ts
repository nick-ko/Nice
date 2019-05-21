import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Place} from '../../places/places.model';
import {ModalController} from '@ionic/angular';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
 @Input() selectedPlace: Place;
 @ViewChild('f') form: NgForm;
  startDate: string;
  endDate: string;
  constructor(private modalClr: ModalController) { }

  ngOnInit() {}

  onCancel() {
    this.modalClr.dismiss(null, 'annuler');
  }

  onBookPlace() {
      if (!this.form.valid) {
          return;
      }
      this.modalClr.dismiss({bookingData: {
          firstName: this.form.value['first-name'],
          lastName: this.form.value['last-name'],
          guessNumber: +this.form.value['guess-number'],
          startDate: new Date(this.form.value['date-from']),
          endDate: new Date(this.form.value['date-to']),
          }}, 'confirm');
  }
  validesDate() {
      const startDate = new Date(this.form.value['date-form']);
      const endDate = new Date(this.form.value['date-to']);
      return endDate > startDate;
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { CalendarService } from 'app/services/calendar/calendar.service';
import { map } from 'rxjs/operators';
import { FirebaseDates } from '../interfaces/firebase-date';

@Component({
    selector: 'app-modal-content',
    templateUrl: './modal.content.html',
    styleUrls: ['./modal.component.scss']
})
export class NgbdModalContent implements OnInit {
  @Input() house: string;
  daysOccupied: number[];
  isLoading: boolean;
  constructor(
    public activeModal: NgbActiveModal,
    private calendarService: CalendarService,
  ) {}

  ngOnInit() {
    // const nextMonthBtn = $('.mat-calendar-next-button');
    this.isLoading = true;
    if (this.house === 'La petita del Molí') {
      this.subscribeToPetita();
    } else {
      this.subscribeToGran();
    }
  }

  subscribeToPetita() {
    this.calendarService.getDatesPetita()
      .pipe(
        map(action => {
          const data = action.payload.data() as FirebaseDates;
          return { ...data };
        }),
      )
      .subscribe((data) => {
        this.daysOccupied = data.DiesOcupats.map(d => +`${d.seconds}000`);
        this.isLoading = false;
      })
  }
  
  subscribeToGran() {
    this.calendarService.getDatesGran()
      .pipe(
        map(action => {
          const data = action.payload.data() as FirebaseDates;
          return { ...data };
        }),
      )
      .subscribe((data) => {
        this.daysOccupied = data.DiesOcupats.map(d => +`${d.seconds}000`);
        this.isLoading = false;
      })
  }
}

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class NgbdModalComponent {
  @Input() house: string;
  constructor(
    private modalService: NgbModal,
  ) {}

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.house = this.house;
  }
}

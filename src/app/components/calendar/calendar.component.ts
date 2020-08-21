import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { CalendarService } from 'app/services/calendar/calendar.service';
import { FirebaseDates } from '../interfaces/firebase-date';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],

})
export class CalendarComponent implements OnInit {
  pricePetita: string;
  priceGran: string;
  startDate: any;
  endDate: any;
  numNights: number;
  minDate: Date = new Date();
  maxDate: Date;
  daysOccupiedPetita: number[];
  daysOccupiedGran: number[];
  petitaIsAvailable: boolean;
  granIsAvailable: boolean;
  granIsShort: boolean;

  filter = (d: Date | null): boolean => {
    if (!d){
      return true;
    }
    
    const dayTime = new Date(d).getTime();
    const dayIsOcInPetita = this.daysOccupiedPetita.includes(dayTime);
    const dayIsOcInGran = this.daysOccupiedGran.includes(dayTime);
    return !dayIsOcInGran || !dayIsOcInPetita;
  }

  constructor(
    private _adapter: DateAdapter<any>,
    private calendarService: CalendarService,
  ) { }

  
  ngOnInit(): void {
    this._adapter.setLocale('es');
    this.subscribeToPetita();
    this.subscribeToGran();
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
      this.daysOccupiedPetita = data.DiesOcupats
                                    .map(d => +`${d.seconds}000`)
                                    // .map(d => d.seconds)
                                    // .map(d => new Date(d))
                                    // .map(d => new Date(d.getUTCFullYear(), d.getMonth(), d.getDate()))
                                    // .map(d => d.getTime());
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
      console.log(data.DiesOcupats)
      this.daysOccupiedGran = data.DiesOcupats
                                    .map(d => +`${d.seconds}000`)
                                    // .map(d => new Date(d))
                                    // .map(d => new Date(d.getUTCFullYear(), d.getMonth(), d.getDate()))
                                    // .map(d => d.getTime());
    })
  }

  changeStart(event: MatDatepickerInputEvent<Date>): void {
    if (!event.value) {
      return;
    }

    this.maxDate = new Date(this.getNextOccupiedDate(event.value));
    this.startDate = event.value;
    this.pricePetita = this.getPricePetita();
    this.priceGran = this.getPriceGran();
  }

  changeEnd(event: MatDatepickerInputEvent<Date>): void {
    if (!event.value) {
      return;
    }

    this.maxDate = undefined;
    this.endDate = event.value;
    this.pricePetita = this.getPricePetita();
    this.priceGran = this.getPriceGran();
  }

  getPricePetita(): string {
    if (!this.startDate || !this.endDate) {
      return;
    }

    this.petitaIsAvailable = !this.rangeDayOverlaps(this.endDate, this.startDate, this.daysOccupiedPetita);

    const numNights = this.numNights = (this.endDate - this.startDate)/86400000;
    const price =  numNights > 5 
      ? numNights * 66.666666667
      : numNights * 95 ;
    return Number(price.toFixed(2)).toString();
  }

  getPriceGran(): string {
    if (!this.startDate || !this.endDate) {
      return;
    }

    this.granIsAvailable = !this.rangeDayOverlaps(this.endDate, this.startDate, this.daysOccupiedGran);

    const numNights = this.numNights = (this.endDate - this.startDate)/86400000;
    this.granIsShort = numNights < 2;
    const price =  numNights > 5 
      ? numNights * 100
      : numNights * 125 ;
    return Number(price.toFixed(2)).toString();
  }

  getNextOccupiedDate(d: Date): number {
    const date = new Date(d).getTime();
    const occupiedDatesBoth = [...this.daysOccupiedGran, ...this.daysOccupiedPetita]
    return occupiedDatesBoth
      .filter(dt => dt > date)
      .sort()[0]
  }

  rangeDayOverlaps(endDay: Date, startDay: Date, listOccupiedDates: number[]): boolean {
    const end = new Date(endDay).getTime();
    const start = new Date(startDay).getTime();
    const overlapedDays = listOccupiedDates.filter(d => start <= d && d <= end);

    return overlapedDays.length > 0;
  }
}

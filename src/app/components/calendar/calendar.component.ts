import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { CalendarService } from 'app/services/calendar/calendar.service';
import { FirebaseDates } from '../interfaces/firebase-date';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';

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
    public location: Location,
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
        this.daysOccupiedPetita = data.DiesOcupats.map(d => +`${d.seconds}000`)
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
        this.daysOccupiedGran = data.DiesOcupats.map(d => +`${d.seconds}000`)
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

    const numNights = this.numNights = Math.floor((this.endDate - this.startDate)/86400000);
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

    const numNights = this.numNights = Math.floor((this.endDate - this.startDate)/86400000);
    this.granIsShort = numNights < 2;
    const price =  numNights > 5 
      ? numNights * 100
      : numNights * 125 ;
    return Number(price.toFixed(2)).toString();
  }

  getNextOccupiedDate(d: Date): number {
    const date = new Date(d).getTime();
    const commonDates = this.daysOccupiedGran.filter(x => this.daysOccupiedPetita.includes(x));
    return commonDates
      .filter(dt => dt > date)
      .sort()[0]
  }

  rangeDayOverlaps(endDay: Date, startDay: Date, listOccupiedDates: number[]): boolean {
    const end = new Date(endDay).getTime();
    const start = new Date(startDay).getTime();
    const overlapedDays = listOccupiedDates.filter(d => start <= d && d <= end);

    return overlapedDays.length > 0;
  }

  addDayOcc(docName: string) {
    const newArray = this.addDaysToArray(docName);
    if (!newArray || newArray.length === 0) {
      return;
    }

    this.calendarService.updateDiesOcupats(docName, newArray);
  }

  removeDayOcc(docName: string) {
    const newArray = this.removeDaysToArray(docName);
    if (!newArray) {
      return;
    }

    this.calendarService.updateDiesOcupats(docName, newArray);
  }

  addDaysToArray(docName: string): number[] {
    if (!this.startDate || !this.endDate){
      return;
    }

    const days = this.getRangeDays();
    let arr = [];
    if (docName === 'Gran') {
      arr = this.daysOccupiedGran.concat(days.map(d => d.getTime()));
    } else if (docName === 'Petita') {
      arr = this.daysOccupiedPetita.concat(days.map(d => d.getTime()));
    } else {
      return;
    }

    var mySet = new Set(arr)
    return Array.from(mySet);
  }

  removeDaysToArray(docName: string): number[] {
    if (!this.startDate || !this.endDate){
      return;
    }

    const days = this.getRangeDays();
    let days2 = days.map(d => d.getTime());
    switch (docName) {
      case 'Gran':
        return this.daysOccupiedGran.filter(x => !days2.includes(x));
      case 'Petita':
        return this.daysOccupiedPetita.filter(x => !days2.includes(x));
      default:
        return;
    }
  }

  getRangeDays(): Date[] {
    const days = [new Date(this.startDate)];
    for (let i = 0; i < this.numNights; i++) {
      const d = new Date(days[days.length-1]);
      d.setDate(d.getDate() + 1);
      days.push(d);
    }
    return days;
  }

  isAdmin() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }
      if( titlee === '/admin' ) {
          return true;
      }
      else {
          return false;
      }
  }
}

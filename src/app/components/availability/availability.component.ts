import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent implements OnInit {
  @Input() daysOccupied: number[];
  minDate: Date = new Date();
  constructor(
  ) { }

  ngOnInit(): void { }

  filter = (d: Date | null): boolean => {
    if (!d){
      return true;
    }
    
    const dayTime = new Date(d).getTime();
    return !this.daysOccupied.includes(dayTime);
  }
}

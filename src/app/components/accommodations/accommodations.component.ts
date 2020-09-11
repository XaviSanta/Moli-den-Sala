import { Component, OnInit } from '@angular/core';
import baguetteBox from 'baguettebox.js';
import VanillaTilt from 'vanilla-tilt';
import { EmitterService } from 'app/services/emitter/emitter.service';

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrls: ['./accommodations.component.scss']
})
export class AccommodationsComponent implements OnInit {
  nameHouse1: string = `La petita del Molí`;
  nameHouse2: string = `El Molí Vell d'en Sala`;
  count: number = 0;
  isHovering: boolean = false;
  
  hGranAvailable: number;
  hPetitaAvailable: number;

  constructor(
    private sendMessageService: EmitterService,
  ) { }
  

  ngOnInit(): void {
    this.subscribeAvailability();
    const element = document.querySelectorAll('.card');
    VanillaTilt.init(element as any, {
      max: 5,
      scale: 1.01,
      speed: 2000,
      gyroscope: false,
    });

    baguetteBox.run('.gallery');
  }

  private subscribeAvailability() {
    this.sendMessageService.hGran.subscribe(n => {
      var element = document.getElementById('card1');
      var imgtop = document.getElementById('image1');
      if(n === 1) {
        // element.classList.remove('unavailable');
        // element.classList.add('available');
        imgtop.classList.remove('unavailable');
        imgtop.classList.add('available');
      }
      if(n === 2) {
        // element.classList.remove('available');
        // element.classList.add('unavailable');
        imgtop.classList.remove('available');
        imgtop.classList.add('unavailable');
      }
    });
    this.sendMessageService.hPetita.subscribe(n => {
      var element = document.getElementById('card2');
      var imgtop = document.getElementById('image2');

      if(n === 1) {
        // element.classList.remove('unavailable');
        // element.classList.add('available');
        imgtop.classList.remove('unavailable');
        imgtop.classList.add('available');
      }
      if(n === 2) {
        // element.classList.remove('available');
        // element.classList.add('unavailable');
        imgtop.classList.remove('available');
        imgtop.classList.add('unavailable');
      }
    });
  }
}

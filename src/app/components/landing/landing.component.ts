import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let text = document.getElementById('text');
    let clouds = document.getElementsByName('cloud');
    window.addEventListener('scroll', () => {
      let value = window.scrollY;
      text.style.marginBottom = value * 1.5 + 'px';
      clouds.forEach((c,index) => {
        c.style.marginBottom = value * -0.05 + 'px';
        c.style.marginLeft = index <5 
          ? value * 0.2 + 'px' 
          : - value * 0.2 + 'px';
      });
    });
  }
}

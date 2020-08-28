import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  private blurnav: any;

  constructor() { }
  scrollTo (id: string) {
    document.getElementById(id).scrollIntoView({behavior: 'smooth'});
  }
  ngOnInit(): void {
    this.blurnav = document.getElementsByClassName('nav-blur')[0];
    
    // let text = document.getElementById('text');
    // let blurred = document.getElementById('blurred-nav');
    // let clouds = document.getElementsByName('cloud');
    window.addEventListener('scroll', () => {
      let value = window.scrollY;
      // blurred.style.filter = `blur(${value*1.5}px)`;
      this.blurnav.style.top = value * 1.1 + 'px';
      // clouds.forEach((c,index) => {
      //   c.style.marginBottom = value * -0.05 + 'px';
      //   c.style.marginLeft = index <5 
      //     ? value * 0.2 + 'px' 
      //     : - value * 0.2 + 'px';
      // });
    });
  }
}

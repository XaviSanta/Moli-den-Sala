import { Component, OnInit } from '@angular/core';
import VanillaTilt from 'vanilla-tilt';

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
    const element = document.querySelectorAll('.presentation-title')[0];
    this.dragElement(element);
    VanillaTilt.init(element as any, {
      max: 25,
      scale: 1,
      speed: 2000,
    });
    this.blurnav = document.getElementsByClassName('nav-blur')[0];
    const banner = document.getElementsByClassName('banner')[0] as any;
    var currentTime = new Date().getHours();
    if (6 < currentTime && currentTime < 13) {
      banner.className = 'banner day';
    } else if (13 <= currentTime && currentTime < 20) {
      banner.className = 'banner mid';
    } else {
      banner.className = 'banner night';
    }
    // banner.className = 'day';
    // banner.className = 'night';
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

  dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
}

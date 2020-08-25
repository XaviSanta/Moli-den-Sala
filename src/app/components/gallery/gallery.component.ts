import { Component, OnInit } from '@angular/core';
import baguetteBox from 'baguettebox.js';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // baguetteBox.run('.tz-gallery');
    this.hideElf('gallery');
    this.hideElf('reviews');
  }

  hideElf(section: string) {
    try {
      const as = document.querySelectorAll(`div[id=${section}]  a`);
      const a = as[as.length-1] as HTMLElement;
      a.style.display = 'none';
    } catch {
      setTimeout(() => {
        this.hideElf(section)
      }, 2000);
    }
  }
}

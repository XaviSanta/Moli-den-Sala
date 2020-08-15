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
    baguetteBox.run('.tz-gallery');
  }
}

import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrls: ['./accommodations.component.css']
})
export class AccommodationsComponent implements OnInit {
  constructor() { }
  that: this;
  img1;
  img2;
  count: number = 0;
  isHovering: boolean = false;
  ngOnInit(): void {
    this.img1 = $('#image1');
    this.img2 = $('#image2');
    
    $('#image1').hover(this.onHover);
    $('#image2').hover(this.addBackground2);
  }

  private onHover(event: any): void {
    // let isHovering = event.type === 'mouseenter';
    // console.log();
    // // let src = $('#image1').attr('src' );
    // // this.changeBackground(src, event);
    // let count = 0;
    // let showImages = () => {
    //   if (isHovering || count < 10) {
    //     console.log('aa')
    //     setTimeout(() => {
    //       count++;
    //       $('#image1').attr('src', `../../assets/img/moli/petita-i${count}.jpg`);
    //       showImages();
    //     }, 2000);
    //   }
    // }

    // isHovering ? showImages() : $('#image1').attr('src', `../../assets/img/moli/petita1.jpg`);
  }

  public showImages2(): void {
    // setTimeout(() => {
    //   this.count++;
    //   $('#image1').attr('src', `../../assets/img/moli/petita-i${this.count}.jpg`);
    //   if (this.isHovering) {
    //     this.showImages2();
    //   }
    // }, 1000);
  }

  private changeBackground(src: string, event: any): void {
    if (event.type === 'mouseenter') {
      $('#accommodations').css('background', `url(${src})`);
    }

    if (event.type === 'mouseleave') {
      $('#accommodations').css('background', 'white');
    }
  }

  private addBackground2(event) {
  }
}

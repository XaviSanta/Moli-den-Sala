import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.hideElf('faqs');
  }

  hideElf(section: string) {
    try {
      const as = document.querySelectorAll(`div[id=${section}]  a`);
      const a = as[0] as HTMLElement;
      a.style.display = 'none';
    } catch {
      setTimeout(() => {
        this.hideElf(section)
      }, 2000);
    }
  }
}

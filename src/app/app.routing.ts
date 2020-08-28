import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
// import { ProfileComponent } from './examples/profile/profile.component';
// import { SignupComponent } from './examples/signup/signup.component';
// import { LandingComponent } from './examples/landing/landing.component';
// import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
// import { LocationComponent } from './components/location/location.component';
// import { AccommodationsComponent } from './components/accommodations/accommodations.component';
// import { ContactComponent } from './components/contact/contact.component';
// import { GalleryComponent } from './components/gallery/gallery.component';
import { CalendarComponent } from './components/calendar/calendar.component';

const routes: Routes =[
    { path: '', component: ComponentsComponent},
    // { path: 'accommodations',   component: AccommodationsComponent },
    // { path: 'location',         component: LocationComponent },
    // { path: 'gallery',          component: GalleryComponent },
    { path: 'admin',            component: CalendarComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: false,
      // anchorScrolling: 'enabled',
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }

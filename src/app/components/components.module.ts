import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';

import { BasicelementsComponent } from './basicelements/basicelements.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TypographyComponent } from './typography/typography.component';
import { NucleoiconsComponent } from './nucleoicons/nucleoicons.component';
import { ComponentsComponent } from './components.component';
import { NotificationComponent } from './notification/notification.component';
import { NgbdModalComponent } from './modal/modal.component';
import { NgbdModalContent } from './modal/modal.component';
import { MapComponent } from './map/map.component';
import { LandingComponent } from './landing/landing.component';
import { AccommodationsComponent } from './accommodations/accommodations.component';
import { ServicesComponent } from './services/services.component';
import { LocationComponent } from './location/location.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ContactComponent } from './contact/contact.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AvailabilityComponent } from './availability/availability.component';
import { FaqsComponent } from './faqs/faqs.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        JwBootstrapSwitchNg2Module,
        MatNativeDateModule,
        MatInputModule,
        MatDatepickerModule,
    ],
    declarations: [
        ComponentsComponent,
        BasicelementsComponent,
        NavigationComponent,
        TypographyComponent,
        NucleoiconsComponent,
        NotificationComponent,
        NgbdModalComponent,
        NgbdModalContent,
        MapComponent,
        LandingComponent,
        AccommodationsComponent,
        ServicesComponent,
        LocationComponent,
        GalleryComponent,
        ReviewsComponent,
        ContactComponent,
        CalendarComponent,
        AvailabilityComponent,
        FaqsComponent
    ],
    entryComponents: [NgbdModalContent],
    exports:[ ComponentsComponent ]
})
export class ComponentsModule { }

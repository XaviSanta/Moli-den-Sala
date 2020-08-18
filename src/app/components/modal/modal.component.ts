import {Component, Input} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal-content',
    templateUrl: './modal.content.html',
    styleUrls: ['./modal.component.scss']
})
export class NgbdModalContent {
    @Input() name;

    constructor(public activeModal: NgbActiveModal) {}
    
}

@Component({
    selector: 'app-modal-component',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class NgbdModalComponent {
  @Input() name: string;
    constructor(private modalService: NgbModal) {}
    open() {
        const modalRef = this.modalService.open(NgbdModalContent);
        modalRef.componentInstance.name = 'Disponibilidad';
    }
}

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FirebaseDates } from 'app/components/interfaces/firebase-date';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  petitaRef: AngularFirestoreDocument<FirebaseDates>;
  granRef: AngularFirestoreDocument<FirebaseDates>;

  constructor(
    private firestore: AngularFirestore,
  ) {  }
  
  getDatesPetita() {
    return this.firestore.collection('Dates').doc('Petita').snapshotChanges();
  }

  getDatesGran() {
    return this.firestore.collection('Dates').doc('Gran').snapshotChanges();
  }

  createDate(date: Date){
    return this.firestore.collection('Dates').add(date);
  }

  deleteDate(dateId: string){
    this.firestore.doc('Dates/' + dateId).delete();
  }
}

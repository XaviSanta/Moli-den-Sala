import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {
  hGran = new EventEmitter<number>(); 
  hPetita = new EventEmitter<number>(); 
  
  constructor() { }
}

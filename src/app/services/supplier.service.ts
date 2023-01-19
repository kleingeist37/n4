import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SelectModel } from '../shared/interfaces/select-model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  //durch api call ersetzen
  private selectValues : SelectModel[] = [
    {name : "Monkey", value: "0"},
    {name : "Dog", value: "1"},
    {name : "Cat", value: "2"},
    {name : "Horse", value: "3"},
    {name : "Pig", value: "4"},

  ];

  private counter = 5;
  public selectValues$ = new BehaviorSubject<SelectModel[]>(this.selectValues); 

  public addContent(): void {
    this.selectValues.push({name: `Generic Animal ${this.counter}`, value: this.counter.toString()})
    this.counter++;    
  }

}

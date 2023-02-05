import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SelectModel } from '../shared/interfaces/select-model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  //durch api call ersetzen
  private selectValues : SelectModel[] = [
    {name : "Monkey", value: "0", debugOptions: ["sadasd", "aedsasd"], deepOptions: {
      child: [
        {name: "c1", value: "v1"},
        {name: "c2", value: "v2"},
        {name: "c3", value: "v3"},
      ],
      
    }},
    {name : "Dog", value: "1"},
    {name : "Cat", value: "2"},
    {name : "Horse", value: "3"},
    {name : "Pig", value: "4"},

  ];

  private counter = 5;
  public selectValues$ = new BehaviorSubject<SelectModel[]>(this.selectValues); 


  //#region realAPIsimulation


  public getAnimals(): BehaviorSubject<SelectModel[]>{
    // setTimeout(() => {
       return this.selectValues$;
    // }, 1000);

    // return new BehaviorSubject<SelectModel[]>([ {name : "Köter", value: "0"}]);
  }

  //#endregion

  public addContent(): void {
    this.selectValues.push({name: `Generic Animal ${this.counter}`, value: this.counter.toString()})
    this.counter++;    
  }

}

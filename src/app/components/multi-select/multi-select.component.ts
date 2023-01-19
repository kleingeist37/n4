import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { NgIfContext } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { SupplierService } from 'src/app/services/supplier.service';
import { SelectModel } from 'src/app/shared/interfaces/select-model';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
})
export class MultiSelectComponent implements OnInit, OnDestroy {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectControl = new FormControl(''); //ParentForm??

  itemProvider: SelectModel[] = [];
  selectedItems: SelectModel[] = [];
  filteredItems!: Observable<SelectModel[]>;
  subscription!: Subscription;

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  @ViewChild(MatAutocompleteTrigger) autoComplete!: MatAutocompleteTrigger;

  constructor(private supplierService: SupplierService) {}


  ngOnInit(): void {
    //If content is in a database
    this.subscription = this.supplierService.selectValues$.subscribe((x) => {
      this.itemProvider = x;
    });

    this.filteredItems = this.selectControl.valueChanges.pipe(
      startWith(''),
      map((item) => this.filterItems(item || ''))
    );
  }

  ngOnDestroy(): void {
    if(this.subscription != undefined)
      this.subscription.unsubscribe(); 
  }

  public removeItem(itemValue: string): void {
    const targetItem = this.getItem(itemValue);
    const index = this.selectedItems.indexOf(targetItem);

    if (index >= 0) this.selectedItems.splice(index, 1);
  }

  public selectItem(event: MatAutocompleteSelectedEvent): void {
    const targetItem = this.getItem(event.option.value);


    if (targetItem != undefined) 
      //Remove this line if duplicates of selections should be possible
      if(!this.selectedItems.includes(targetItem))
        this.selectedItems.push(targetItem);


    this.resetForm();
  }

  public toggleList(): void {
    this.autoComplete.openPanel();
  }

  private filterItems(value: string): SelectModel[] {
    const target = value.toLowerCase();
    
    return this.itemProvider.filter((x) => x.name.toLowerCase().includes(target));
  }

  private getItem(targetValue: string): SelectModel {
    return this.itemProvider.filter((x) => x.value === targetValue)[0];
  }

  private resetForm(value = '') : void {
    this.input.nativeElement.value = value;
    this.selectControl.setValue(null);
  }

  //Debug Function
  public addContent(){
    this.supplierService.addContent();
    this.resetForm(this.input.nativeElement.value);
  }
}

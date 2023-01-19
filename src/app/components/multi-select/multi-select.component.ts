import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { SupplierService } from 'src/app/services/supplier.service';
import { SelectModel } from 'src/app/shared/interfaces/select-model';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
})
export class MultiSelectComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectControl = new FormControl(''); //ParentForm??

  itemProvider: SelectModel[] = [];
  selectedItems: SelectModel[] = [];
  filteredItems: Observable<SelectModel[]>;
  subscription!: Subscription;

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  constructor(private supplierService: SupplierService) {
    this.filteredItems = this.selectControl.valueChanges.pipe(
      startWith(''),
      map((item) => this.filterItems(item || ''))
    );
  }
  ngOnInit(): void {
    //If content is in a database
    this.subscription = this.supplierService.selectValues$.subscribe((x) => {
      this.itemProvider = x;
    });
  }

  public removeItem(itemValue: string): void {
    const targetItem = this.getItem(itemValue);
    const index = this.selectedItems.indexOf(targetItem);

    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    }
  }

  public selectItem(event: MatAutocompleteSelectedEvent): void {
    const targetItem = this.getItem(event.option.value);

    if (targetItem != undefined) this.selectedItems.push(targetItem);

    this.input.nativeElement.value = '';
    this.selectControl.setValue(null);
  }

  private filterItems(value: string): SelectModel[] {
    const target = value.toLowerCase();

    return this.itemProvider.filter((x) =>
      x.name.toLowerCase().includes(target)
    );
  }

  private getItem(targetValue: string): SelectModel {
    return this.itemProvider.filter((x) => x.value === targetValue)[0];
  }
}
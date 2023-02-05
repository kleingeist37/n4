import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { isObservable, Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent implements OnInit,OnDestroy {

  @Input('input') options : any;

  @Input('asyncInput') asyncOptions!: Observable<any>;
  @Input('asyncTargetProp') asyncProp : string = "";

  private sub!: Subscription;

  constructor() { }
  ngOnDestroy(): void {
    if(this.sub != undefined)
      this.sub.unsubscribe();

  }

  ngOnInit(): void {
    if(isObservable(this.asyncOptions)){
      console.log("bla");
      this.sub = this.asyncOptions.subscribe((data : any) =>{

        if(this.asyncProp.length > 0){
          //analyze object here
          //if string -> convert object wie in first draft ...
          //for debugPurposes      

          this.options = data[0][this.asyncProp];
          // let targetData = data[0][this.asyncProp] as string[];
          // for(let i = 0; i < targetData.length; i++){
          //   this.options.push(data[i])
          // }
          //console.log(data[0][`${this.asyncProp}`]);
        }
        else{
          this.observableHandler(data);
        }
         
      })
    }
  }
  

  private observableHandler(data : any){
    this.options = data;
  }

}



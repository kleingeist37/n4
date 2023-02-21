import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main2',
  templateUrl: './main2.component.html',
  styleUrls: ['./main2.component.scss']
})
export class Main2Component implements OnInit, OnDestroy {

  public id : string = "9999";

  private fallbackValue = "9999";

  private sub!: Subscription
  constructor(private activeRoute: ActivatedRoute) { }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.activeRoute.queryParams.subscribe(x => {
      this.id = x['id'] ? x['id'] : this.fallbackValue;
    });
  }

}

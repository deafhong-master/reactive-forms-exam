/* tslint:disable:component-class-suffix */
import { Component }              from '@angular/core';
import { FormControl }            from '@angular/forms';

@Component({
  selector: 'hero-detail-1',
  templateUrl: './hero-detail-1.component.html'
})
export class HeroDetailComponent1 {
  name = new FormControl();
}

/* tslint:disable:component-class-suffix */
import { Component }              from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'hero-detail-2',
  templateUrl: './hero-detail-2.component.html'
})
export class HeroDetailComponent2 {
  heroForm = new FormGroup ({
    name: new FormControl()
  });
}

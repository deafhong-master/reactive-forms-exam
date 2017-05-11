/* tslint:disable:component-class-suffix */
import { Component, Input, OnChanges }                   from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Address, Hero, states } from './data-model';

@Component({
  selector: 'hero-detail-8',
  templateUrl: './hero-detail-8.component.html'
})
export class HeroDetailComponent8 implements OnChanges {
  @Input() hero: Hero;

  heroForm: FormGroup;
  states = states;

  constructor(private fb: FormBuilder) {
    this.createForm();
    this.logNameChange();
  }

  createForm() {
    this.heroForm = this.fb.group({
      name: ['', Validators.required ],
      secretLairs: this.fb.array([]), // <-- secretLairs as an empty FormArray
      power: '',
      sidekick: ''
    });
  }

  logNameChange() {/* Coming soon */}

  ngOnChanges() {
    this.heroForm.reset({
      name: this.hero.name
    });
    this.setAddresses(this.hero.addresses);
  }

  get secretLairs(): FormArray {
    return this.heroForm.get('secretLairs') as FormArray;
  };

  setAddresses(addresses: Address[]) {
    const addressFGs = addresses.map(address => this.fb.group(address));
    const addressFormArray = this.fb.array(addressFGs);
    this.heroForm.setControl('secretLairs', addressFormArray);
  }

  addLair() {
    this.secretLairs.push(this.fb.group(new Address()));
  }
}

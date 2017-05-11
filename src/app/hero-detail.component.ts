import { Component, Input, Output, OnChanges, EventEmitter }       from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { Address, Hero, states } from './data-model';
import { HeroService }           from './hero.service';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html'
})
export class HeroDetailComponent implements OnChanges {
  @Input() hero: Hero;
  @Output() heroDetailEventEmitter = new EventEmitter();

  heroForm: FormGroup;
  nameChangeLog: string[] = [];
  states = states;

  constructor(
    private fb: FormBuilder,
    private heroService: HeroService) {

    this.createForm();
    this.logNameChange();
  }

  createForm() {
    this.heroForm = this.fb.group({
      name: '',
      secretLairs: this.fb.array([]),
      power: '',
      sidekick: ''
    });
  }

  ngOnChanges() {
    this.heroForm.reset({
      name: this.hero.name,
      power: this.hero.power,
      sidekick: this.hero.sidekick
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

  onSubmit() {
    this.hero = this.prepareSaveHero();
    this.heroService.isHero(this.hero)
      .subscribe((isHero: Boolean) => {
        if (isHero) {
          this.heroService.updateHero(this.hero).subscribe(/* error handling */);
        } else {
          this.heroService.addHero(this.hero).subscribe();
          this.heroDetailEventEmitter.emit({
            code: 'newHero',
            hero: this.hero
          });
        }
        this.ngOnChanges();
      });
  }

  prepareSaveHero(): Hero {
    const formModel = this.heroForm.value;

    // deep copy of form model lairs
    const secretLairsDeepCopy: Address[] = formModel.secretLairs.map(
      (address: Address) => Object.assign({}, address)
    );

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveHero: Hero = {
      id: this.hero.id,
      name: formModel.name as string,
      // addresses: formModel.secretLairs // <-- bad!
      addresses: secretLairsDeepCopy,
      power : formModel.power as string,
      sidekick : formModel.sidekick as boolean
    };
    return saveHero;
  }

  revert() { this.ngOnChanges(); }

  delete() {
    this.hero = this.prepareSaveHero();
    this.heroService.deleteHero(this.hero)
      .subscribe((heroes: Hero[]) => {
        this.ngOnChanges();
        let param: any = {
          code: 'delHero',
          hero: undefined
        };
        if ( heroes.length > 0 ) {
          const heroIdx = heroes.length - 1;
          param.hero = heroes[heroIdx];
          this.heroDetailEventEmitter.emit(param);
        }else {
          this.heroDetailEventEmitter.emit(param);
        }
      });
  }

  logNameChange() {
    const nameControl = this.heroForm.get('name');
    nameControl.valueChanges.forEach(
      (value: string) => this.nameChangeLog.push(value)
    );
  }
}

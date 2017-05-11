import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of }         from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';

import { Hero, heroes } from './data-model';

@Injectable()
export class HeroService {

  delayMs = 500;

  // Fake server get; assume nothing can go wrong
  getHeroes(): Observable<Hero[]> {
    return of(heroes).delay(this.delayMs); // simulate latency with delay
  }

  // Fake server update; assume nothing can go wrong
  updateHero(hero: Hero): Observable<Hero>  {
    const oldHero = heroes.find(h => h.id === hero.id);
    const newHero = Object.assign(oldHero, hero); // Demo: mutate cached hero
    return of(newHero).delay(this.delayMs); // simulate latency with delay
  }

  addEmptyHero(no: number): Observable<Hero> {
    let newHero: Hero = new Hero();
    newHero.id = no;
    newHero.addresses = new Array();
    // newHero.id = Math.max(heroes.)
    return of(newHero).delay(this.delayMs);
  }

  addHero(hero: Hero): Observable<Hero[]> {
    heroes.push(hero);
    return of(heroes).delay(this.delayMs);
  }

  isHero(hero: Hero): Observable<Boolean> {
    const oldHero = heroes.find (h => h.id === hero.id);
    let isHero = false;
    if (oldHero !== undefined) {
      isHero = true;
    }
    return of(isHero).delay(this.delayMs);
  }

  deleteHero(hero: Hero): Observable<Hero[]> {
    const findHero = heroes.findIndex(h => h.id === hero.id);
    heroes.splice(findHero, 1);
    return of(heroes).delay(this.delayMs);
  }
}

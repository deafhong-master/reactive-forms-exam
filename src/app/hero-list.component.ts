import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import { Hero }        from './data-model';
import { HeroService } from './hero.service';

@Component({
  selector: 'hero-list',
  templateUrl: './hero-list.component.html'
})
export class HeroListComponent implements OnInit {
  heroes: Observable<Hero[]>;
  isLoading = false;
  selectedHero: Hero;
  heroIdx: number = 0;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
    this.heroes.subscribe((heroes: Array<Hero>) => {
      this.heroIdx = heroes.length;
    });
  }

  getHeroes() {
    this.isLoading = true;
    this.heroes = this.heroService.getHeroes()
                      // Todo: error handling
                      .finally(() => this.isLoading = false);
    this.selectedHero = undefined;
  }

  addEmptyHero() {
    this.isLoading = true;
    this.heroes = this.heroService.getHeroes()
                      // Todo: error handling
                      .finally(() => this.isLoading = false);
    this.heroService.addEmptyHero(++this.heroIdx)
                    .subscribe((hero: Hero) => {
                      this.selectedHero = hero;
                      this.isLoading = false;
                    });
  }

  select(hero: Hero) {
    this.selectedHero = hero;
  }

  heroDetailEventEmitter(param: any) {
    const code: string = param.code;
    const hero: Hero = param.hero;

    switch ( code ) {
      case 'newHero':
        this.select(hero);
        break;
      case 'delHero':
        if ( hero ) {
          this.select(hero);
        }else {
          this.select(undefined);
        }
        break;
      default :
        break;
    }
  }
}

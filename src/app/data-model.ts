export class Hero {
  id = 0;
  name = '';
  addresses: Address[];
  power = '';
  sidekick = false;
}

export class Address {
  street = '';
  city   = '';
  state  = '';
  zip    = '';
}

export const heroes: Hero[] = [
  {
    id: 1,
    name: 'Whirlwind',
    addresses: [
      {street: '123 Main',  city: 'Anywhere', state: 'CA',  zip: '94801'},
      {street: '456 Maple', city: 'Somewhere', state: 'VA', zip: '23226'},
    ],
    power : '',
    sidekick : false
  },
  {
    id: 2,
    name: 'Bombastic',
    addresses: [
      {street: '789 Elm',  city: 'Smallville', state: 'OH',  zip: '04501'},
    ],
    power : '',
    sidekick : false
  },
  {
    id: 3,
    name: 'Magneta',
    addresses: [ ],
    power : '',
    sidekick : false
  },
];

export const states = ['CA', 'MD', 'OH', 'VA'];

import { Moment } from 'moment';

export interface IAnniversaire {
  id?: number;
  idUser?: string;
  idGuildServer?: string;
  dateAnniversaire?: Moment;
}

export class Anniversaire implements IAnniversaire {
  constructor(public id?: number, public idUser?: string, public idGuildServer?: string, public dateAnniversaire?: Moment) {}
}

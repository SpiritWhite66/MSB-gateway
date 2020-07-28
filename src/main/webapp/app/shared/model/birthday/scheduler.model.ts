import { IPattern } from 'app/shared/model/birthday/pattern.model';

export interface IScheduler {
  id?: number;
  idGuildServer?: string;
  idChannel?: string;
  activated?: boolean;
  hour?: number;
  pattern?: IPattern;
}

export class Scheduler implements IScheduler {
  constructor(
    public id?: number,
    public idGuildServer?: string,
    public idChannel?: string,
    public activated?: boolean,
    public hour?: number,
    public pattern?: IPattern
  ) {
    this.activated = this.activated || false;
  }
}

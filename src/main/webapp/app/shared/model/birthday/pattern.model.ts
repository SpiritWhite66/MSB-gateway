export interface IPattern {
  id?: number;
  message?: string;
}

export class Pattern implements IPattern {
  constructor(public id?: number, public message?: string) {}
}

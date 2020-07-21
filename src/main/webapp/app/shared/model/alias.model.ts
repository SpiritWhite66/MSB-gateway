import { IConfigCommon } from 'app/shared/model/config-common.model';

export interface IAlias {
  id?: number;
  alias?: string;
  configCommons?: IConfigCommon[];
}

export class Alias implements IAlias {
  constructor(public id?: number, public alias?: string, public configCommons?: IConfigCommon[]) {}
}

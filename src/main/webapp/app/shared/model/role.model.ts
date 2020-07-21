import { IConfigCommon } from 'app/shared/model/config-common.model';

export interface IRole {
  id?: number;
  idDiscord?: string;
  name?: string;
  configCommons?: IConfigCommon[];
}

export class Role implements IRole {
  constructor(public id?: number, public idDiscord?: string, public name?: string, public configCommons?: IConfigCommon[]) {}
}

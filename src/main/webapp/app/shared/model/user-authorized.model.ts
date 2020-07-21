import { IConfigCommon } from 'app/shared/model/config-common.model';

export interface IUserAuthorized {
  id?: number;
  user?: string;
  idDiscord?: string;
  configCommons?: IConfigCommon[];
}

export class UserAuthorized implements IUserAuthorized {
  constructor(public id?: number, public user?: string, public idDiscord?: string, public configCommons?: IConfigCommon[]) {}
}

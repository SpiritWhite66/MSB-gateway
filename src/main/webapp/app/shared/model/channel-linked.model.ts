import { IConfigCommon } from 'app/shared/model/config-common.model';

export interface IChannelLinked {
  id?: number;
  name?: string;
  idChannel?: string;
  configCommons?: IConfigCommon[];
}

export class ChannelLinked implements IChannelLinked {
  constructor(public id?: number, public name?: string, public idChannel?: string, public configCommons?: IConfigCommon[]) {}
}

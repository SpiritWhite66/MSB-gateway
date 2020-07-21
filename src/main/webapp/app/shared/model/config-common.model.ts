import { IAlias } from 'app/shared/model/alias.model';
import { IChannelLinked } from 'app/shared/model/channel-linked.model';
import { IUserAuthorized } from 'app/shared/model/user-authorized.model';
import { IRole } from 'app/shared/model/role.model';
import { TypeConfig } from 'app/shared/model/enumerations/type-config.model';

export interface IConfigCommon {
  id?: number;
  idBot?: number;
  activated?: boolean;
  type?: TypeConfig;
  aliases?: IAlias[];
  channelLinkeds?: IChannelLinked[];
  userAuthorizeds?: IUserAuthorized[];
  roles?: IRole[];
}

export class ConfigCommon implements IConfigCommon {
  constructor(
    public id?: number,
    public idBot?: number,
    public activated?: boolean,
    public type?: TypeConfig,
    public aliases?: IAlias[],
    public channelLinkeds?: IChannelLinked[],
    public userAuthorizeds?: IUserAuthorized[],
    public roles?: IRole[]
  ) {
    this.activated = this.activated || false;
  }
}

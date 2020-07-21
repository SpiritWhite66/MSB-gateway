import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IConfigCommon, ConfigCommon } from 'app/shared/model/config-common.model';
import { ConfigCommonService } from './config-common.service';
import { IAlias } from 'app/shared/model/alias.model';
import { AliasService } from 'app/entities/alias/alias.service';
import { IChannelLinked } from 'app/shared/model/channel-linked.model';
import { ChannelLinkedService } from 'app/entities/channel-linked/channel-linked.service';
import { IUserAuthorized } from 'app/shared/model/user-authorized.model';
import { UserAuthorizedService } from 'app/entities/user-authorized/user-authorized.service';
import { IRole } from 'app/shared/model/role.model';
import { RoleService } from 'app/entities/role/role.service';

type SelectableEntity = IAlias | IChannelLinked | IUserAuthorized | IRole;

@Component({
  selector: 'jhi-config-common-update',
  templateUrl: './config-common-update.component.html',
})
export class ConfigCommonUpdateComponent implements OnInit {
  isSaving = false;
  aliases: IAlias[] = [];
  channellinkeds: IChannelLinked[] = [];
  userauthorizeds: IUserAuthorized[] = [];
  roles: IRole[] = [];

  editForm = this.fb.group({
    id: [],
    idBot: [null, [Validators.required]],
    activated: [null, [Validators.required]],
    type: [null, [Validators.required]],
    aliases: [],
    channelLinkeds: [],
    userAuthorizeds: [],
    roles: [],
  });

  constructor(
    protected configCommonService: ConfigCommonService,
    protected aliasService: AliasService,
    protected channelLinkedService: ChannelLinkedService,
    protected userAuthorizedService: UserAuthorizedService,
    protected roleService: RoleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ configCommon }) => {
      this.updateForm(configCommon);

      this.aliasService.query().subscribe((res: HttpResponse<IAlias[]>) => (this.aliases = res.body || []));

      this.channelLinkedService.query().subscribe((res: HttpResponse<IChannelLinked[]>) => (this.channellinkeds = res.body || []));

      this.userAuthorizedService.query().subscribe((res: HttpResponse<IUserAuthorized[]>) => (this.userauthorizeds = res.body || []));

      this.roleService.query().subscribe((res: HttpResponse<IRole[]>) => (this.roles = res.body || []));
    });
  }

  updateForm(configCommon: IConfigCommon): void {
    this.editForm.patchValue({
      id: configCommon.id,
      idBot: configCommon.idBot,
      activated: configCommon.activated,
      type: configCommon.type,
      aliases: configCommon.aliases,
      channelLinkeds: configCommon.channelLinkeds,
      userAuthorizeds: configCommon.userAuthorizeds,
      roles: configCommon.roles,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const configCommon = this.createFromForm();
    if (configCommon.id !== undefined) {
      this.subscribeToSaveResponse(this.configCommonService.update(configCommon));
    } else {
      this.subscribeToSaveResponse(this.configCommonService.create(configCommon));
    }
  }

  private createFromForm(): IConfigCommon {
    return {
      ...new ConfigCommon(),
      id: this.editForm.get(['id'])!.value,
      idBot: this.editForm.get(['idBot'])!.value,
      activated: this.editForm.get(['activated'])!.value,
      type: this.editForm.get(['type'])!.value,
      aliases: this.editForm.get(['aliases'])!.value,
      channelLinkeds: this.editForm.get(['channelLinkeds'])!.value,
      userAuthorizeds: this.editForm.get(['userAuthorizeds'])!.value,
      roles: this.editForm.get(['roles'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConfigCommon>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: SelectableEntity[], option: SelectableEntity): SelectableEntity {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}

import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConfigCommon } from 'app/shared/model/config-common.model';
import { ConfigCommonService } from './config-common.service';

@Component({
  templateUrl: './config-common-delete-dialog.component.html',
})
export class ConfigCommonDeleteDialogComponent {
  configCommon?: IConfigCommon;

  constructor(
    protected configCommonService: ConfigCommonService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.configCommonService.delete(id).subscribe(() => {
      this.eventManager.broadcast('configCommonListModification');
      this.activeModal.close();
    });
  }
}

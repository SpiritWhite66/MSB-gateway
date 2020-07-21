import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAlias } from 'app/shared/model/alias.model';
import { AliasService } from './alias.service';

@Component({
  templateUrl: './alias-delete-dialog.component.html',
})
export class AliasDeleteDialogComponent {
  alias?: IAlias;

  constructor(protected aliasService: AliasService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.aliasService.delete(id).subscribe(() => {
      this.eventManager.broadcast('aliasListModification');
      this.activeModal.close();
    });
  }
}

import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AnniversaireService } from './anniversaire-user.service';
import { IAnniversaire } from 'app/shared/model/birthday/anniversaire.model';

@Component({
  templateUrl: './anniversaire-user-delete-dialog.component.html',
})
export class AnniversaireUserDeleteDialogComponent {
  anniversaire?: IAnniversaire;

  constructor(
    protected anniversaireService: AnniversaireService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.anniversaireService.delete(id).subscribe(() => {
      this.eventManager.broadcast('anniversaireListModification');
      this.activeModal.close();
    });
  }
}

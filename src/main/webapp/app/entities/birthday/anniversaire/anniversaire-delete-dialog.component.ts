import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAnniversaire } from 'app/shared/model/birthday/anniversaire.model';
import { AnniversaireService } from './anniversaire.service';

@Component({
  templateUrl: './anniversaire-delete-dialog.component.html',
})
export class AnniversaireDeleteDialogComponent {
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

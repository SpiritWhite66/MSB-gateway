import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPattern } from 'app/shared/model/birthday/pattern.model';
import { PatternService } from './pattern.service';

@Component({
  templateUrl: './pattern-delete-dialog.component.html',
})
export class PatternDeleteDialogComponent {
  pattern?: IPattern;

  constructor(protected patternService: PatternService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.patternService.delete(id).subscribe(() => {
      this.eventManager.broadcast('patternListModification');
      this.activeModal.close();
    });
  }
}

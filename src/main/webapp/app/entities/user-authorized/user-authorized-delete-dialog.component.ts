import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserAuthorized } from 'app/shared/model/user-authorized.model';
import { UserAuthorizedService } from './user-authorized.service';

@Component({
  templateUrl: './user-authorized-delete-dialog.component.html',
})
export class UserAuthorizedDeleteDialogComponent {
  userAuthorized?: IUserAuthorized;

  constructor(
    protected userAuthorizedService: UserAuthorizedService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.userAuthorizedService.delete(id).subscribe(() => {
      this.eventManager.broadcast('userAuthorizedListModification');
      this.activeModal.close();
    });
  }
}

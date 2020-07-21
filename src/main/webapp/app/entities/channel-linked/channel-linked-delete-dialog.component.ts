import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IChannelLinked } from 'app/shared/model/channel-linked.model';
import { ChannelLinkedService } from './channel-linked.service';

@Component({
  templateUrl: './channel-linked-delete-dialog.component.html',
})
export class ChannelLinkedDeleteDialogComponent {
  channelLinked?: IChannelLinked;

  constructor(
    protected channelLinkedService: ChannelLinkedService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.channelLinkedService.delete(id).subscribe(() => {
      this.eventManager.broadcast('channelLinkedListModification');
      this.activeModal.close();
    });
  }
}

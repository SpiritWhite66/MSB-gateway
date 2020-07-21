import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IChannelLinked } from 'app/shared/model/channel-linked.model';
import { ChannelLinkedService } from './channel-linked.service';
import { ChannelLinkedDeleteDialogComponent } from './channel-linked-delete-dialog.component';

@Component({
  selector: 'jhi-channel-linked',
  templateUrl: './channel-linked.component.html',
})
export class ChannelLinkedComponent implements OnInit, OnDestroy {
  channelLinkeds?: IChannelLinked[];
  eventSubscriber?: Subscription;

  constructor(
    protected channelLinkedService: ChannelLinkedService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.channelLinkedService.query().subscribe((res: HttpResponse<IChannelLinked[]>) => (this.channelLinkeds = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInChannelLinkeds();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IChannelLinked): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInChannelLinkeds(): void {
    this.eventSubscriber = this.eventManager.subscribe('channelLinkedListModification', () => this.loadAll());
  }

  delete(channelLinked: IChannelLinked): void {
    const modalRef = this.modalService.open(ChannelLinkedDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.channelLinked = channelLinked;
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAlias } from 'app/shared/model/alias.model';
import { AliasService } from './alias.service';
import { AliasDeleteDialogComponent } from './alias-delete-dialog.component';

@Component({
  selector: 'jhi-alias',
  templateUrl: './alias.component.html',
})
export class AliasComponent implements OnInit, OnDestroy {
  aliases?: IAlias[];
  eventSubscriber?: Subscription;

  constructor(protected aliasService: AliasService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.aliasService.query().subscribe((res: HttpResponse<IAlias[]>) => (this.aliases = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAliases();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAlias): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAliases(): void {
    this.eventSubscriber = this.eventManager.subscribe('aliasListModification', () => this.loadAll());
  }

  delete(alias: IAlias): void {
    const modalRef = this.modalService.open(AliasDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.alias = alias;
  }
}

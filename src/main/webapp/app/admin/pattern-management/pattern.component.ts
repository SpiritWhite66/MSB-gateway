import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPattern } from 'app/shared/model/birthday/pattern.model';
import { PatternService } from './pattern.service';
import { PatternDeleteDialogComponent } from './pattern-delete-dialog.component';

@Component({
  selector: 'jhi-pattern',
  templateUrl: './pattern.component.html',
})
export class PatternComponent implements OnInit, OnDestroy {
  patterns?: IPattern[];
  eventSubscriber?: Subscription;

  constructor(protected patternService: PatternService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.patternService.query().subscribe((res: HttpResponse<IPattern[]>) => (this.patterns = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPatterns();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPattern): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPatterns(): void {
    this.eventSubscriber = this.eventManager.subscribe('patternListModification', () => this.loadAll());
  }

  delete(pattern: IPattern): void {
    const modalRef = this.modalService.open(PatternDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pattern = pattern;
  }
}

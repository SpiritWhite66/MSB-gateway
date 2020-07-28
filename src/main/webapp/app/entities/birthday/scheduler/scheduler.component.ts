import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IScheduler } from 'app/shared/model/birthday/scheduler.model';
import { SchedulerService } from './scheduler.service';
import { SchedulerDeleteDialogComponent } from './scheduler-delete-dialog.component';

@Component({
  selector: 'jhi-scheduler',
  templateUrl: './scheduler.component.html',
})
export class SchedulerComponent implements OnInit, OnDestroy {
  schedulers?: IScheduler[];
  eventSubscriber?: Subscription;

  constructor(protected schedulerService: SchedulerService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.schedulerService.query().subscribe((res: HttpResponse<IScheduler[]>) => (this.schedulers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSchedulers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IScheduler): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSchedulers(): void {
    this.eventSubscriber = this.eventManager.subscribe('schedulerListModification', () => this.loadAll());
  }

  delete(scheduler: IScheduler): void {
    const modalRef = this.modalService.open(SchedulerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.scheduler = scheduler;
  }
}

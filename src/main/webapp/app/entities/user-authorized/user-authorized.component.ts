import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserAuthorized } from 'app/shared/model/user-authorized.model';
import { UserAuthorizedService } from './user-authorized.service';
import { UserAuthorizedDeleteDialogComponent } from './user-authorized-delete-dialog.component';

@Component({
  selector: 'jhi-user-authorized',
  templateUrl: './user-authorized.component.html',
})
export class UserAuthorizedComponent implements OnInit, OnDestroy {
  userAuthorizeds?: IUserAuthorized[];
  eventSubscriber?: Subscription;

  constructor(
    protected userAuthorizedService: UserAuthorizedService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.userAuthorizedService.query().subscribe((res: HttpResponse<IUserAuthorized[]>) => (this.userAuthorizeds = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUserAuthorizeds();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUserAuthorized): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUserAuthorizeds(): void {
    this.eventSubscriber = this.eventManager.subscribe('userAuthorizedListModification', () => this.loadAll());
  }

  delete(userAuthorized: IUserAuthorized): void {
    const modalRef = this.modalService.open(UserAuthorizedDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userAuthorized = userAuthorized;
  }
}

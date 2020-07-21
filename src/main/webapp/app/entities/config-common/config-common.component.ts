import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IConfigCommon } from 'app/shared/model/config-common.model';
import { ConfigCommonService } from './config-common.service';
import { ConfigCommonDeleteDialogComponent } from './config-common-delete-dialog.component';

@Component({
  selector: 'jhi-config-common',
  templateUrl: './config-common.component.html',
})
export class ConfigCommonComponent implements OnInit, OnDestroy {
  configCommons?: IConfigCommon[];
  eventSubscriber?: Subscription;

  constructor(
    protected configCommonService: ConfigCommonService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.configCommonService.query().subscribe((res: HttpResponse<IConfigCommon[]>) => (this.configCommons = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInConfigCommons();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IConfigCommon): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInConfigCommons(): void {
    this.eventSubscriber = this.eventManager.subscribe('configCommonListModification', () => this.loadAll());
  }

  delete(configCommon: IConfigCommon): void {
    const modalRef = this.modalService.open(ConfigCommonDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.configCommon = configCommon;
  }
}

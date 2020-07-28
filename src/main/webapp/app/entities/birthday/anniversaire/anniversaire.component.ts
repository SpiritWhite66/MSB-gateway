import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';

import { IAnniversaire } from 'app/shared/model/birthday/anniversaire.model';
import { AnniversaireService } from './anniversaire.service';
import { AnniversaireDeleteDialogComponent } from './anniversaire-delete-dialog.component';

@Component({
  selector: 'jhi-anniversaire',
  templateUrl: './anniversaire.component.html',
})
export class AnniversaireComponent implements OnInit, OnDestroy {
  anniversaires?: IAnniversaire[];
  eventSubscriber?: Subscription;

  constructor(
    protected anniversaireService: AnniversaireService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  editForm = this.fb.group({
    idGuildServer: [null, [Validators.required]],
  });

  loadAll(): void {
    this.anniversaireService.query().subscribe((res: HttpResponse<IAnniversaire[]>) => (this.anniversaires = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAnniversaires();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAnniversaire): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAnniversaires(): void {
    this.eventSubscriber = this.eventManager.subscribe('anniversaireListModification', () => this.loadAll());
  }

  delete(anniversaire: IAnniversaire): void {
    const modalRef = this.modalService.open(AnniversaireDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.anniversaire = anniversaire;
  }
}

import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAnniversaire } from 'app/shared/model/birthday/anniversaire.model';
import { JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs';

import { AnniversaireUserDeleteDialogComponent } from './anniversaire-user-delete-dialog.component';
import { AnniversaireService } from './anniversaire-user.service';

@Component({
  selector: 'jhi-anniversaire',
  templateUrl: './anniversaire-user.component.html',
})
export class AnniversaireComponent implements OnInit, OnDestroy {
  anniversaires?: IAnniversaire[];
  eventSubscriber?: Subscription;
  idDiscord?: string | null;
  paramJson?: IAnniversaire[];

  editForm: FormGroup = this.fb.group({
    idGuildServer: [this.idDiscord, [Validators.required]],
  });

  constructor(
    protected anniversaireService: AnniversaireService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  loadAll(): void {
    this.anniversaireService.query().subscribe((res: HttpResponse<IAnniversaire[]>) => (this.anniversaires = res.body || []));
  }

  loadByDiscord(): void {
    this.idDiscord = this.editForm.get(['idGuildServer'])!.value;
    if (this.idDiscord) {
      this.anniversaireService
        .findByIdGuildServer(this.idDiscord)
        .subscribe((res: HttpResponse<IAnniversaire[]>) => (this.anniversaires = res.body || []));
    }
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ anniversaire }) => {
      this.paramJson = anniversaire;
      if (anniversaire !== undefined && Array.length > 0) {
        this.anniversaires = anniversaire;
        this.updateForm(this.activatedRoute.snapshot.params['id']);
      } else {
        this.loadAll();
      }
      this.updateForm(this.activatedRoute.snapshot.params['id']);
    });

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

  updateForm(idDiscord: string): void {
    this.editForm.patchValue({
      idGuildServer: idDiscord,
    });
  }

  registerChangeInAnniversaires(): void {
    this.eventSubscriber = this.eventManager.subscribe('anniversaireListModification', () => this.loadAll());
  }

  delete(anniversaire: IAnniversaire): void {
    const modalRef = this.modalService.open(AnniversaireUserDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.anniversaire = anniversaire;
  }
}

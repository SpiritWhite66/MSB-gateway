import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IAnniversaire, Anniversaire } from 'app/shared/model/birthday/anniversaire.model';
import { AnniversaireService } from './anniversaire.service';

@Component({
  selector: 'jhi-anniversaire-update',
  templateUrl: './anniversaire-update.component.html',
})
export class AnniversaireUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    idUser: [null, [Validators.required]],
    idGuildServer: [null, [Validators.required]],
    dateAnniversaire: [],
  });

  constructor(protected anniversaireService: AnniversaireService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ anniversaire }) => {
      if (!anniversaire.id) {
        const today = moment().startOf('day');
        anniversaire.dateAnniversaire = today;
      }

      this.updateForm(anniversaire);
    });
  }

  updateForm(anniversaire: IAnniversaire): void {
    this.editForm.patchValue({
      id: anniversaire.id,
      idUser: anniversaire.idUser,
      idGuildServer: anniversaire.idGuildServer,
      dateAnniversaire: anniversaire.dateAnniversaire ? anniversaire.dateAnniversaire.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const anniversaire = this.createFromForm();
    if (anniversaire.id !== undefined) {
      this.subscribeToSaveResponse(this.anniversaireService.update(anniversaire));
    } else {
      this.subscribeToSaveResponse(this.anniversaireService.create(anniversaire));
    }
  }

  private createFromForm(): IAnniversaire {
    return {
      ...new Anniversaire(),
      id: this.editForm.get(['id'])!.value,
      idUser: this.editForm.get(['idUser'])!.value,
      idGuildServer: this.editForm.get(['idGuildServer'])!.value,
      dateAnniversaire: this.editForm.get(['dateAnniversaire'])!.value
        ? moment(this.editForm.get(['dateAnniversaire'])!.value, DATE_TIME_FORMAT)
        : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAnniversaire>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}

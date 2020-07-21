import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAlias, Alias } from 'app/shared/model/alias.model';
import { AliasService } from './alias.service';

@Component({
  selector: 'jhi-alias-update',
  templateUrl: './alias-update.component.html',
})
export class AliasUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    alias: [],
  });

  constructor(protected aliasService: AliasService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ alias }) => {
      this.updateForm(alias);
    });
  }

  updateForm(alias: IAlias): void {
    this.editForm.patchValue({
      id: alias.id,
      alias: alias.alias,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const alias = this.createFromForm();
    if (alias.id !== undefined) {
      this.subscribeToSaveResponse(this.aliasService.update(alias));
    } else {
      this.subscribeToSaveResponse(this.aliasService.create(alias));
    }
  }

  private createFromForm(): IAlias {
    return {
      ...new Alias(),
      id: this.editForm.get(['id'])!.value,
      alias: this.editForm.get(['alias'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlias>>): void {
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

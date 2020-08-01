import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPattern, Pattern } from 'app/shared/model/birthday/pattern.model';
import { PatternService } from './pattern.service';

@Component({
  selector: 'jhi-pattern-update',
  templateUrl: './pattern-update.component.html',
})
export class PatternUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    message: [null, [Validators.required]],
  });

  constructor(protected patternService: PatternService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pattern }) => {
      this.updateForm(pattern);
    });
  }

  updateForm(pattern: IPattern): void {
    this.editForm.patchValue({
      id: pattern.id,
      message: pattern.message,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pattern = this.createFromForm();
    if (pattern.id !== undefined) {
      this.subscribeToSaveResponse(this.patternService.update(pattern));
    } else {
      this.subscribeToSaveResponse(this.patternService.create(pattern));
    }
  }

  private createFromForm(): IPattern {
    return {
      ...new Pattern(),
      id: this.editForm.get(['id'])!.value,
      message: this.editForm.get(['message'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPattern>>): void {
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

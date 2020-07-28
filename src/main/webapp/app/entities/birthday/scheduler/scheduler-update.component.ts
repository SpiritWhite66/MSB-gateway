import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IScheduler, Scheduler } from 'app/shared/model/birthday/scheduler.model';
import { SchedulerService } from './scheduler.service';
import { IPattern } from 'app/shared/model/birthday/pattern.model';
import { PatternService } from 'app/entities/birthday/pattern/pattern.service';

@Component({
  selector: 'jhi-scheduler-update',
  templateUrl: './scheduler-update.component.html',
})
export class SchedulerUpdateComponent implements OnInit {
  isSaving = false;
  patterns: IPattern[] = [];

  editForm = this.fb.group({
    id: [],
    idGuildServer: [null, [Validators.required]],
    idChannel: [null, [Validators.required]],
    activated: [null, [Validators.required]],
    hour: [null, [Validators.required]],
    pattern: [],
  });

  constructor(
    protected schedulerService: SchedulerService,
    protected patternService: PatternService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ scheduler }) => {
      this.updateForm(scheduler);

      this.patternService
        .query({ filter: 'scheduler-is-null' })
        .pipe(
          map((res: HttpResponse<IPattern[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPattern[]) => {
          if (!scheduler.pattern || !scheduler.pattern.id) {
            this.patterns = resBody;
          } else {
            this.patternService
              .find(scheduler.pattern.id)
              .pipe(
                map((subRes: HttpResponse<IPattern>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPattern[]) => (this.patterns = concatRes));
          }
        });
    });
  }

  updateForm(scheduler: IScheduler): void {
    this.editForm.patchValue({
      id: scheduler.id,
      idGuildServer: scheduler.idGuildServer,
      idChannel: scheduler.idChannel,
      activated: scheduler.activated,
      hour: scheduler.hour,
      pattern: scheduler.pattern,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const scheduler = this.createFromForm();
    if (scheduler.id !== undefined) {
      this.subscribeToSaveResponse(this.schedulerService.update(scheduler));
    } else {
      this.subscribeToSaveResponse(this.schedulerService.create(scheduler));
    }
  }

  private createFromForm(): IScheduler {
    return {
      ...new Scheduler(),
      id: this.editForm.get(['id'])!.value,
      idGuildServer: this.editForm.get(['idGuildServer'])!.value,
      idChannel: this.editForm.get(['idChannel'])!.value,
      activated: this.editForm.get(['activated'])!.value,
      hour: this.editForm.get(['hour'])!.value,
      pattern: this.editForm.get(['pattern'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IScheduler>>): void {
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

  trackById(index: number, item: IPattern): any {
    return item.id;
  }
}

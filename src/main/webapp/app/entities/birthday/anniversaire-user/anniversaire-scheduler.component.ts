import { Scheduler, IScheduler } from './../../../shared/model/birthday/scheduler.model';
import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { SchedulerService } from 'app/admin/scheduler-management/scheduler.service';

@Component({
  selector: 'jhi-anniversaire-scheduler',
  templateUrl: './anniversaire-scheduler.component.html',
})
export class AnniversaireSchedulerComponent implements OnInit {
  @Input() idGuildServer: string | undefined;

  scheduler: IScheduler = new Scheduler();

  editForm = this.fb.group({
    id: [],
    idGuildServer: [this.idGuildServer, [Validators.required]],
    idChannel: [null, [Validators.required]],
    activated: [null, [Validators.required]],
    hour: [null, [Validators.required]],
  });

  constructor(protected schedulerService: SchedulerService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadByIdGuildServer();
    this.updateForm(this.scheduler);
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

  loadByIdGuildServer(): void {
    this.scheduler = new Scheduler();
  }
}

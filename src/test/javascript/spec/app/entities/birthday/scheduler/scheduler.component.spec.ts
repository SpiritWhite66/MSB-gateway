import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { SchedulerComponent } from 'app/entities/birthday/scheduler/scheduler.component';
import { SchedulerService } from 'app/entities/birthday/scheduler/scheduler.service';
import { Scheduler } from 'app/shared/model/birthday/scheduler.model';

describe('Component Tests', () => {
  describe('Scheduler Management Component', () => {
    let comp: SchedulerComponent;
    let fixture: ComponentFixture<SchedulerComponent>;
    let service: SchedulerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SchedulerComponent],
      })
        .overrideTemplate(SchedulerComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SchedulerComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SchedulerService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Scheduler(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.schedulers && comp.schedulers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

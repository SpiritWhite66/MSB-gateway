import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PatternUpdateComponent } from 'app/entities/birthday/pattern/pattern-update.component';
import { PatternService } from 'app/entities/birthday/pattern/pattern.service';
import { Pattern } from 'app/shared/model/birthday/pattern.model';

describe('Component Tests', () => {
  describe('Pattern Management Update Component', () => {
    let comp: PatternUpdateComponent;
    let fixture: ComponentFixture<PatternUpdateComponent>;
    let service: PatternService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PatternUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PatternUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PatternUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PatternService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Pattern(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Pattern();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { AnniversaireUpdateComponent } from 'app/entities/birthday/anniversaire/anniversaire-update.component';
import { AnniversaireService } from 'app/entities/birthday/anniversaire/anniversaire.service';
import { Anniversaire } from 'app/shared/model/birthday/anniversaire.model';

describe('Component Tests', () => {
  describe('Anniversaire Management Update Component', () => {
    let comp: AnniversaireUpdateComponent;
    let fixture: ComponentFixture<AnniversaireUpdateComponent>;
    let service: AnniversaireService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AnniversaireUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AnniversaireUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AnniversaireUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AnniversaireService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Anniversaire(123);
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
        const entity = new Anniversaire();
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

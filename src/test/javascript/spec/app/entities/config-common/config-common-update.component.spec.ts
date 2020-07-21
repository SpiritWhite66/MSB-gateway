import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { ConfigCommonUpdateComponent } from 'app/entities/config-common/config-common-update.component';
import { ConfigCommonService } from 'app/entities/config-common/config-common.service';
import { ConfigCommon } from 'app/shared/model/config-common.model';

describe('Component Tests', () => {
  describe('ConfigCommon Management Update Component', () => {
    let comp: ConfigCommonUpdateComponent;
    let fixture: ComponentFixture<ConfigCommonUpdateComponent>;
    let service: ConfigCommonService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ConfigCommonUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ConfigCommonUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ConfigCommonUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConfigCommonService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ConfigCommon(123);
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
        const entity = new ConfigCommon();
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

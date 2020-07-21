import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { UserAuthorizedUpdateComponent } from 'app/entities/user-authorized/user-authorized-update.component';
import { UserAuthorizedService } from 'app/entities/user-authorized/user-authorized.service';
import { UserAuthorized } from 'app/shared/model/user-authorized.model';

describe('Component Tests', () => {
  describe('UserAuthorized Management Update Component', () => {
    let comp: UserAuthorizedUpdateComponent;
    let fixture: ComponentFixture<UserAuthorizedUpdateComponent>;
    let service: UserAuthorizedService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [UserAuthorizedUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(UserAuthorizedUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserAuthorizedUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserAuthorizedService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserAuthorized(123);
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
        const entity = new UserAuthorized();
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

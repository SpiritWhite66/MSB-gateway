import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { ChannelLinkedUpdateComponent } from 'app/entities/channel-linked/channel-linked-update.component';
import { ChannelLinkedService } from 'app/entities/channel-linked/channel-linked.service';
import { ChannelLinked } from 'app/shared/model/channel-linked.model';

describe('Component Tests', () => {
  describe('ChannelLinked Management Update Component', () => {
    let comp: ChannelLinkedUpdateComponent;
    let fixture: ComponentFixture<ChannelLinkedUpdateComponent>;
    let service: ChannelLinkedService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ChannelLinkedUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ChannelLinkedUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChannelLinkedUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChannelLinkedService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ChannelLinked(123);
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
        const entity = new ChannelLinked();
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

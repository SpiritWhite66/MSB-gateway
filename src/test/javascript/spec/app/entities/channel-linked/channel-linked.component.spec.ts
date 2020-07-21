import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { ChannelLinkedComponent } from 'app/entities/channel-linked/channel-linked.component';
import { ChannelLinkedService } from 'app/entities/channel-linked/channel-linked.service';
import { ChannelLinked } from 'app/shared/model/channel-linked.model';

describe('Component Tests', () => {
  describe('ChannelLinked Management Component', () => {
    let comp: ChannelLinkedComponent;
    let fixture: ComponentFixture<ChannelLinkedComponent>;
    let service: ChannelLinkedService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ChannelLinkedComponent],
      })
        .overrideTemplate(ChannelLinkedComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChannelLinkedComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChannelLinkedService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ChannelLinked(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.channelLinkeds && comp.channelLinkeds[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

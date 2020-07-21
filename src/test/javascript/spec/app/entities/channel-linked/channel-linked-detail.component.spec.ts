import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { ChannelLinkedDetailComponent } from 'app/entities/channel-linked/channel-linked-detail.component';
import { ChannelLinked } from 'app/shared/model/channel-linked.model';

describe('Component Tests', () => {
  describe('ChannelLinked Management Detail Component', () => {
    let comp: ChannelLinkedDetailComponent;
    let fixture: ComponentFixture<ChannelLinkedDetailComponent>;
    const route = ({ data: of({ channelLinked: new ChannelLinked(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ChannelLinkedDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ChannelLinkedDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ChannelLinkedDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load channelLinked on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.channelLinked).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

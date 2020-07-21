import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { UserAuthorizedDetailComponent } from 'app/entities/user-authorized/user-authorized-detail.component';
import { UserAuthorized } from 'app/shared/model/user-authorized.model';

describe('Component Tests', () => {
  describe('UserAuthorized Management Detail Component', () => {
    let comp: UserAuthorizedDetailComponent;
    let fixture: ComponentFixture<UserAuthorizedDetailComponent>;
    const route = ({ data: of({ userAuthorized: new UserAuthorized(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [UserAuthorizedDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(UserAuthorizedDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserAuthorizedDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load userAuthorized on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userAuthorized).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAnniversaire } from 'app/shared/model/birthday/anniversaire.model';

type EntityResponseType = HttpResponse<IAnniversaire>;
type EntityArrayResponseType = HttpResponse<IAnniversaire[]>;

@Injectable({ providedIn: 'root' })
export class AnniversaireService {
  public resourceUrl = SERVER_API_URL + 'services/birthday/api/anniversaires';

  constructor(protected http: HttpClient) {}

  create(anniversaire: IAnniversaire): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(anniversaire);
    return this.http
      .post<IAnniversaire>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(anniversaire: IAnniversaire): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(anniversaire);
    return this.http
      .put<IAnniversaire>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAnniversaire>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAnniversaire[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(anniversaire: IAnniversaire): IAnniversaire {
    const copy: IAnniversaire = Object.assign({}, anniversaire, {
      dateAnniversaire:
        anniversaire.dateAnniversaire && anniversaire.dateAnniversaire.isValid() ? anniversaire.dateAnniversaire.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateAnniversaire = res.body.dateAnniversaire ? moment(res.body.dateAnniversaire) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((anniversaire: IAnniversaire) => {
        anniversaire.dateAnniversaire = anniversaire.dateAnniversaire ? moment(anniversaire.dateAnniversaire) : undefined;
      });
    }
    return res;
  }
}

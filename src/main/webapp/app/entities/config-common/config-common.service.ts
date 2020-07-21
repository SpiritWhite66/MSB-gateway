import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IConfigCommon } from 'app/shared/model/config-common.model';

type EntityResponseType = HttpResponse<IConfigCommon>;
type EntityArrayResponseType = HttpResponse<IConfigCommon[]>;

@Injectable({ providedIn: 'root' })
export class ConfigCommonService {
  public resourceUrl = SERVER_API_URL + 'api/config-commons';

  constructor(protected http: HttpClient) {}

  create(configCommon: IConfigCommon): Observable<EntityResponseType> {
    return this.http.post<IConfigCommon>(this.resourceUrl, configCommon, { observe: 'response' });
  }

  update(configCommon: IConfigCommon): Observable<EntityResponseType> {
    return this.http.put<IConfigCommon>(this.resourceUrl, configCommon, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IConfigCommon>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IConfigCommon[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

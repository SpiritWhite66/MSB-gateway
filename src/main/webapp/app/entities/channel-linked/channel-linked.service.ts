import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IChannelLinked } from 'app/shared/model/channel-linked.model';

type EntityResponseType = HttpResponse<IChannelLinked>;
type EntityArrayResponseType = HttpResponse<IChannelLinked[]>;

@Injectable({ providedIn: 'root' })
export class ChannelLinkedService {
  public resourceUrl = SERVER_API_URL + 'api/channel-linkeds';

  constructor(protected http: HttpClient) {}

  create(channelLinked: IChannelLinked): Observable<EntityResponseType> {
    return this.http.post<IChannelLinked>(this.resourceUrl, channelLinked, { observe: 'response' });
  }

  update(channelLinked: IChannelLinked): Observable<EntityResponseType> {
    return this.http.put<IChannelLinked>(this.resourceUrl, channelLinked, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IChannelLinked>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IChannelLinked[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

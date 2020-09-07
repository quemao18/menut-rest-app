import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

const collection = 'settings';

@Injectable({
  providedIn: 'root'
})


export class SettingService {
  constructor(
    private firestore: AngularFirestore,
    private http: HttpClient
  ) {
    this.firestore.firestore.settings({experimentalForceLongPolling: true})
  }

  generateHeaders() {
    const headers = new HttpHeaders( { authorization: `Bearer ${this.getAccessToken()}` } );
    return headers;
  }

  getAccessToken() {
    return (localStorage.getItem('access_token'));
  }

  public create(data: any) {
    return this.http.post(environment.apiUrl+ `/${collection}`, data, 
    { headers: this.generateHeaders() }
    );
  }

  public getById(documentId: string) {
    return this.http.get(environment.apiUrl+ `/${collection}/` + documentId, 
    { headers: this.generateHeaders() }
    );
  }

  public gets(status?: boolean) {
    if(status)
    return this.http.get(environment.apiUrl+ `/${collection}/status/`+ status, 
    { headers: this.generateHeaders() }
    );
    else
    return this.http.get(environment.apiUrl+ `/${collection}`, 
    { headers: this.generateHeaders() }
    );
  }

  public update(documentId: string, data: any) {
    return this.http.put(environment.apiUrl+ `/${collection}/` + documentId, data, 
    { headers: this.generateHeaders() }
    );
  }

  public delete(documentId: string) {
    return this.http.delete(environment.apiUrl+ `/${collection}/` + documentId, 
    { headers: this.generateHeaders() }
    );
  }
}
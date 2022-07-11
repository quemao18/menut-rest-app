import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const collection = 'settings';

@Injectable({
  providedIn: 'root'
})



export class SettingService {

  private settingsCollection: AngularFirestoreCollection<any>;
  settings: Observable<any[]>;

  constructor(
    private firestore: AngularFirestore,
    private http: HttpClient,
    private afs: AngularFirestore,
  ) {
    this.firestore.firestore.settings({experimentalForceLongPolling: true})
    this.settingsCollection = this.afs.collection<any>('settings', 
      ref => ref.where('projectId', '==', environment.firebaseConfig.projectId));
      this.settingsCollection.valueChanges({idField: 'id'})
      .subscribe(data => {
        if(data && data.length > 0){
          this.setSettings(data[0]);
          // this.themeService.setTheme('chancho-taco');
          //this.themeService.setTheme(data[0].projectId);
        }else{
          this.settingsCollection.add({projectId: environment.firebaseConfig.projectId})
        }
      });
  }

  generateHeaders() {
    return new HttpHeaders( { authorization: `Bearer ${this.getAccessToken()}` } );
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
  
  get getSettings(): any{
    return this.settings;//JSON.parse(localStorage.getItem('settings')!);
  }

  setSettings(settings: any){
    this.settings = settings;
    localStorage.setItem('settings', JSON.stringify(settings));
  }

}
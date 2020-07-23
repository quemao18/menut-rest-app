import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

const collection = 'dishes';

@Injectable({
  providedIn: 'root'
})


export class DishService {
  constructor(
    private firestore: AngularFirestore
  ) {
    this.firestore.firestore.settings({experimentalForceLongPolling: true})
  }

  public create(data: any) {
    return this.firestore.collection(collection).add(data);
  }

  public getById(documentId: string) {
    return this.firestore.collection(collection).doc(documentId).snapshotChanges();
  }

  public getsByMenuId(menuId?) {
    if(menuId)
    return this.firestore.collection(collection, ref => ref
      // .limit(limit)
      .orderBy('order', 'asc')
      .where('menuId', '==', menuId)
    ).get();
    else
    return this.firestore.collection(collection, ref => ref
      // .limit(limit)
      .orderBy('order', 'asc')
      // .where('menuId', '==', menuId)
    ).get();
  }

  public gets() {
    return this.firestore.collection(collection, ref => ref
      // .limit(limit)
      .orderBy('order', 'asc')
      // .where('menuId', '==', menuId)
    ).get();
  }

  public update(documentId: string, data: any) {
    return this.firestore.collection(collection).doc(documentId).set(data, { merge: true });
  }

  public delete(documentId: string) {
    return this.firestore.collection(collection).doc(documentId).delete();
  }
}
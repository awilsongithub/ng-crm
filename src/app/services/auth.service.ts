import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { Client } from '../models/Client';

@Injectable({
  providedIn: "root"
})
export class AuthService {
    client: Client;
    clientDoc: AngularFirestoreDocument<Client>;

  constructor(
    private afAuth: AngularFireAuth, 
    private afs: AngularFirestore
) {}

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then((userData) => resolve(userData => {
            this.client = userData.user;
        }), (err) => reject(err));
    });
  }

  getAuth() {
    // return this.afAuth.authState().pipe(map((auth) => auth));
    // return this.afAuth.authState.map(auth => auth);
    
    // get the document for client
    this.clientDoc = this.afs.doc<Client>(`clients/`)
    // per docs 2019
    this.client = this.afAuth.authState.pipe(
        switchMap(client => {
            if(client) {
                return this.afs.doc<Client>
            }
        })
    )
  }
}

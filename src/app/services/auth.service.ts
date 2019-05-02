import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { Client } from "../models/Client";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  client: Client;
  clientDoc: AngularFirestoreDocument<Client>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {}

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
        (userData) =>
          resolve((userData) => {
            this.client = userData.user;
          }),
        (err) => reject(err)
      );
    });
  }

  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => resolve(res), (err) => reject(err));
    });
  }

  getAuth() {
    // operator chaining transitioned to use of .pipe() in RXJS 6
    // see https://stackoverflow.com/questions/50203241/angular-5-to-6-upgrade-property-map-does-not-exist-on-type-observable
    return this.afAuth.authState.pipe(map((auth) => auth));
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}

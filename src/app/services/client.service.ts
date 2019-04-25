import { Injectable } from "@angular/core";
// collection is a table, document is a row/entry in the table
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable } from "rxjs";
import{ map } from 'rxjs/operators';


import { Client } from "../models/Client";

@Injectable({
  providedIn: "root"
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private afs: AngularFirestore) {
    /**
     * the collection method takes a path and an optional queryFn (callback?) (to sort in our case). do we then have our client data? async handled by hi level collection method???
     */

    this.clientsCollection = this.afs.collection("clients", ref =>
      ref.orderBy("lastName", "asc")
    );
    console.log(this.clientsCollection);
  }

  getClients(): Observable<Client[]> {
    // get clients with id
    this.clients = this.clientsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Client; // data is a client
        data.id = action.payload.doc.id;
        return data;
      });
    }));

    return this.clients;
  }
} // end class

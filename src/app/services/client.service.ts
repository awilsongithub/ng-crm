import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
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
    this.clientsCollection = this.afs.collection("clients", (ref) =>
      ref.orderBy("lastName", "asc")
    );
    console.log(this.clientsCollection);
  }

  getClients(): Observable<Client[]> {
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((action) => {
          const data = action.payload.doc.data() as Client;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
    return this.clients;
  }

  /** GET CLIENT, ADD ID MANUALLY
   * if no id needed can use valueChanges
   * get actions with payload whose data will be a client
   * manually add id to client and return it
   *
   * ACTIONS API = {type: ie value, payload: }
   */
  getClient(id: string): Observable<Client> {
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          console.log("action w NO payload", action);
          return null;
        } else {
          console.log("action w payload", action.payload);
          const data = action.payload.data() as Client;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.client;
  }

  newClient(client: Client) {
    this.clientsCollection.add(client);
  }

  updateClient(client: Client) {
    // get doc by id from afs
    // call set? method
    this.clientDoc = this.afs.doc<Client>(`clients/${client.id}`);
    this.clientDoc.update(client);
  }
} // end class

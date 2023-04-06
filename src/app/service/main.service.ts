import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Commande } from '../models/commande';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://localhost:5000/commandes'

  findAll() {
    return this.http.get<Commande[]>(this.apiUrl)
  }

  delete(id: any) {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  persist(commande: any) {
    return  this.http.post<Commande>(this.apiUrl, commande)
  }

  completed(id: any,payee: any) {
    return this.http.patch(`${this.apiUrl}/${id}`, {payee: !payee})
  }

  update(commande: any) {
    return this.http.put(`${this.apiUrl}/${commande.id}`, commande)
  }

}

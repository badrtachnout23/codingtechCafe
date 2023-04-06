import { Component } from '@angular/core';
import { DashboardService } from 'src/app/service/main.service';
import { Commande } from 'src/app/models/commande';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private dashboardService: DashboardService){

  }

  ngOnInit(){
    this.getCommandes()
  }

  editForm = false
  searchNomClient = ''
  showForm = false

  commandes: Commande[] = [];

  myCommande: Commande = {
      boisson: '',
      numeroTable: 0,
      nomClient: '',
      payee: false
  }

  resultCommandes: Commande[] = []

  getCommandes() {
    this.dashboardService.findAll().subscribe(commandes => {
        this.resultCommandes = this.commandes = commandes
      })
  }

  deleteCommande(id: any) {
    this.dashboardService.delete(id).subscribe(() => {
      this.commandes = this.commandes.filter(commande => commande.id != id)
      this.ngOnInit()
    })
  }

  persistCommande() {
    this.dashboardService.persist(this.myCommande).subscribe((commande) => {
      this.commandes = [commande, ...this.commandes]
      this.resetCommande()
      this.showForm = false
      this.ngOnInit()

    })
  }

  resetCommande() {
    this.myCommande = {
      boisson: '',
      numeroTable: 0,
      nomClient: '',
      payee: false
    }
  }

  editCommande(commande: any) {
    this.myCommande = commande
    this.editForm = true
    // this.ngOnInit()

  }

  updateCommande() {
    this.dashboardService.update(this.myCommande).subscribe(commande => {
      this.resetCommande();
      this.editForm = false
      this.ngOnInit()
    })
  }

  searchClient() {
    this.resultCommandes = this.commandes.filter(commande =>
      commande.nomClient.toLowerCase().includes(this.searchNomClient.toLowerCase())
      )
  }

}

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
    this.getCommandes();
  }

  commandes: Commande[] = [];
  myCommande: Commande = {
      boisson: '',
      numeroTable: 0,
      nomClient: '',
      payee: false
  }

  togglePayee(id: any, payee: any){

  }

  getCommandes() {
    this.dashboardService.findAll().subscribe(commandes => this.commandes = commandes)
  }

  deleteCommande(id: any) {
    this.dashboardService.delete(id).subscribe( () => {
      this.commandes = this.commandes.filter(commande => commande.id != id)
    })
  }

  persistCommande () {
    this.dashboardService.persist(this.myCommande)
    .subscribe((commande) =>{
      this.commandes = [commande, ...this.commandes];
      this.resetCommande();
    } 
      )}

  resetCommande(){
    this.myCommande = {
      boisson: '',
      numeroTable: 0,
      nomClient: '',
      payee: false
    }
  }    
}

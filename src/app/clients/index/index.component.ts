import { Component, OnInit} from '@angular/core';
import { ClientsService } from '../clients.service';
import { Clients } from '../clients';
import { MatTableModule } from '@angular/material/table';
import { EditComponent } from '../edit/edit.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-index',
  templateUrl:'./index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent  {
  clients: Clients[];
  columns: string[] = ['firstname','lastname','email','phonenumber','_id'];

  constructor(public clientsService: ClientsService,private dialog: MatDialog) { }
  /*ngOnInit(): void {
  this.clientsService.getClients().subscribe(res=>{
    console.log(res)
    this.clients=res; 
    })
}*/
ngOnInit(): void {
  this.clientsService.getClients().subscribe(
    (data: any) => {
      // Assuming 'data' is the API response containing client data
      this.clients = data as Clients[]; // Assigning response to clients array
    },
    (error) => {
      console.error('Error fetching clients:', error);
    }
  );
}

deleteClient(id: object): void {
    // Show confirmation dialog before deleting
    if (confirm('Are you sure you want to delete this client ?')) {
      // Call service method to delete beneficiary
      this.clientsService.deleteClient(id).subscribe(
        () => {
          console.log('formation deleted successfully');
          // Refresh beneficiary list after deletion
          this.clientsService.getClients();
        })
    };
  }
 /* openEditModal(clientId: object): void {
    const dialogRef = this.dialog.open(EditComponent, {
      data: { clientId: clientId } // Pass the client ID to the EditComponent modal
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle modal close event if needed
    });
  }
*/
onedit(id: string, data:Clients) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  this.clientsService.updateClient(id,data).subscribe((r) => {
    dialogConfig.data = r;
    this.dialog.open(EditComponent, dialogConfig);
  });
}
}


    

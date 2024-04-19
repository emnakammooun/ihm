import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule

@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule
  ],
  exports:[
    CreateComponent,
    EditComponent

    ]
})
export class ClientsModule {
  
 }

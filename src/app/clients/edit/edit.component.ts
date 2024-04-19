import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../clients.service';
import { Clients } from '../clients';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  clientForm: FormGroup;
  display = "none";
  clientId: string;
  client: Clients | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private clientsService: ClientsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.clientForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [''],
      phonenumber: ['']
    });
    this.clientId = this.data.clientId;;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.clientId = idParam;
        this.loadClient(); // Load client data when component initializes
      } else {
        console.error('Client ID parameter is missing.');
      }
    });
  }

  loadClient(): void {
    this.clientsService.getClient(this.clientId).subscribe(
      (client: Clients) => {
        this.client = client;
        // Populate form fields with client data using patchValue
        this.clientForm.patchValue({
          firstname: this.client.firstname,
          lastname: this.client.lastname,
          email: this.client.email,
          phonenumber: this.client.phonenumber
        });
      },
      error => {
        console.error('Error loading client:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.clientForm.valid && this.clientId) {
      const updatedClientData = this.clientForm.value;
      // Update client using service
      this.clientsService.updateClient(this.clientId, updatedClientData).subscribe(
        () => {
          console.log('Client updated successfully!');
          // Optionally, navigate to a different route after successful update
          this.router.navigate(['/clients']);
        },
        error => {
          console.error('Error updating client:', error);
        }
      );
    } else {
      console.error('Form is invalid or Client ID is missing. Cannot submit.');
    }
  }

  openModal(): void {
    this.display = "block";
  }

  closeModal(): void {
    this.display = "none";
  }
}

import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ClientsService } from '../clients.service';
import { Clients } from '../clients';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit
{ clientForm: FormGroup;

  constructor(
    public formBuilder:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private clientsService: ClientsService){
      this.clientForm = this.formBuilder.group({
        firstname:[''],
        lastname:[''],
        email:[''],
        phonenumber:[''],
    })
  }
    
    ngOnInit():void{

    }

 onSubmit():any{
    this.clientsService.addClient(this.clientForm.value)
    .subscribe(()=>{
      console.log("Client created successfully!");
      window.location.reload();
  })
}

/* onSubmit() {
  if (this.clientForm.valid) {
    const formData = this.clientForm.value;
    this.clientsService.addClient(this.clientForm.value).subscribe(
      response => {
        console.log('Client saved successfully:', response);
        // Optionally, reset the form after successful save
        this.clientForm.reset();
      },
      error => {
        console.error('Error saving client:', error);
      }
    );
  } else {
    console.error('Form is invalid. Cannot submit.');
  }
}*/

  @ViewChild('myModal') myModal!: ElementRef;
  display = "none";
  clients:Clients=new Clients()
  
  addClient=()=>{
    this.clientsService.addClient(this.clients).subscribe((data=>{
    console.log(data)
    this.closeModal()
    window.location.reload();

    }))
    }

    openModal() {
    this.display = "block";
    }

    closeModal() {
    this.display = "none";

    }
    
  }

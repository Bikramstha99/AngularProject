import { Component } from '@angular/core';
import { UserApiService } from '../../services/userapi.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isModalOpen = false;

  user = {
    Id: '',
    FirstName: '',
    LastName: '',
    UserName: '',
    Email: '',
    Gender: '',
    UserType: null,
    Password: ''
  };

  constructor(private userApiService: UserApiService) {

  }

  userTypes = [
    { id: 2, name: 'InternalUser' },
    { id: 3, name: 'ClientUser' }
  ];

  openModal() {
    this.isModalOpen = true;
  }

  closeModal(event?: Event) {
    this.isModalOpen = false;
  }

  createUser() {
    this.userApiService.createUser(this.user).subscribe((res) => {
      alert('user succesfully created');
    },
    (err)=>{
       alert("error occur");
    });
  }
}

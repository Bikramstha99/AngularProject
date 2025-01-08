import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../services/userapi.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  implements OnInit {
  isModalOpen = false;
  isModalEMployeeOpen = false;
  showRoleModal =false;
  userLists: Array<any> = [];
  roleLists : Array<any> = [];
  employeeLists : Array<any> = [];
  selectedRoleUserId:any;

  user = {
    id: '1',
    firstName: 'bikra',
    lastName: 'dh',
    userName: 'nikka',
    email: 'stha.bikram@gail.co,',
    gender: '1',
    userType: 1,
    password: 'Leomessi10@'
  };

  employee = {
    Name: 'Bikki'
  };

  constructor(private userApiService: UserApiService) {

  }
  ngOnInit(): void {
    this.userApiService.getUser().subscribe((res) => {
      this.userLists = res.data;
      console.log(this.userLists)
    },
    (err)=>{
       alert("error occur");
    });
  }

  userTypes = [
    { id: 1, name: 'Super Admin'},
    { id: 2, name: 'Internal User' },
    { id: 3, name: 'Client User' }
  ];

  openModal() {
    this.isModalOpen = true;
  }

  closeModal(event?: Event) {
    this.isModalOpen = false;
  }

  createUser() {
    this.user.userType = Number(this.user.userType); // Ensure it's an integer
    this.userApiService.createUser(this.user).subscribe((res) => {
      alert('user succesfully created');
    },
    (err)=>{
       alert("error occur");
    });
  }

  employees = [
    { name: 'John Doe', salary: 50000 },
    { name: 'Jane Smith', salary: 60000 },
    { name: 'Sam Wilson', salary: 70000 }
  ];

  permissions = [
    { name: 'View Dashboard', assigned: false },
    { name: 'Edit Profile', assigned: false },
    { name: 'Manage Users', assigned: false }
  ];

  selectedEmployee: any = null;
  showModal = false;

  savePermissions() {
    console.log('Permissions saved:', this.permissions);
    this.closeModal();
  }
  openRoleModal(user: any) {
    this.selectedRoleUserId = user.id;  // Assuming user object contains userId
    this.userApiService.getRoles().subscribe((res) => {
      this.roleLists = res.data;
    },
    (err)=>{
       alert("error occur");
    });
    this.showRoleModal = true;
  }

  closeRoleModal() {
    this.selectedEmployee = null;
    this.showRoleModal = false;
  }

  saveRole() {
    const selectedRoles = this.roleLists
      .filter(role => role.isSelected)  // Filter selected roles
      .map(role => ({
        userId: this.selectedRoleUserId,            // Include userId
        roleId: role.roleId,            // Include roleId
        roleName: role.roleName,        // Include roleName
        isSelected: role.isSelected    // Include isSelected
      }));
    this.userApiService.addRoleToUser(selectedRoles).subscribe((res) => {
      alert('role succesfully added');
    },
    (err)=>{
       alert("error occur");
    });
    console.log(selectedRoles);
  }

  openEmployeeModal() {
    this.isModalEMployeeOpen = true;
  }

  closeemployeeModal() {
    this.isModalEMployeeOpen = false;
  }

  createEmployee() {
    this.userApiService.createEmployee(this.employee).subscribe((res) => {
      alert('employee succesfully created');
    },
    (err)=>{
       alert("error occur");
    });
  }
  
  deleteemployee(employee: any){

  }
}

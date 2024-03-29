import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ServiceService } from 'src/app/service.service';
import { AuthService } from 'src/app/shared/auth.service';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  logo: any;
  line1: any;
  line2: any;
  line3: any;
  line4: any;
  email: any;
  website: any;
  menuItems: any;
  template: any;
  photo: any;
  address: any;

  loading = false;

  profileCheck = false;
  checkProfile() {
    this.loading = true;
    this.service.checkProfile().subscribe(

      (res: any) => {
        this.profileCheck = res;
        console.log(res);
        if (!res) {
          this.confirmationService.confirm({

            message: 'Please Complete Your Profile.',
            header: 'Profile',
            icon: 'pi pi-user',
            acceptIcon: "none",
            rejectIcon: "none",
            rejectButtonStyleClass: "p-button-text",
            accept: () => {

              this.route.navigate(['home/profile']);

            },
            reject: () => {
              this.route.navigate(['home/profile']);
            }
          });
        }
        console.log(res);
        this.loading = false;
      },
      (err: any) => { console.log(err); this.loading = false }

    );
  }


  constructor(private confirmationService: ConfirmationService, private service: HomeService, private route: Router, private authSerivce: AuthService) {
    this.role = this.authSerivce.getRole();
  }

  role: string = '';

  ngOnInit(): void {
    this.checkProfile();
  }


  alert(str: any) {
    if ((this.profileCheck && (str === 'images' || str === 'videos')) || str === 'profile')
      this.route.navigate(['home/' + str]);
    else {
      this.confirmationService.confirm({

        message: 'Please Complete Your Profile.',
        header: 'Profile',
        icon: 'pi pi-user',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {

          this.route.navigate(['home/profile']);

        },
        reject: () => {
          this.route.navigate(['home/profile']);
        }
      });
    }
  }

}

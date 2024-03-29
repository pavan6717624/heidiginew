import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ServiceService } from '../service.service';
export class Login {
  mobile: string = '';
  password: string = '';
}

export class DropDown
{
  code: string ='';
  name: string ='';
}
export class LoginStatus {
  userId: string = "";
  userType: string = "";
  loginStatus: boolean = false;
  loginId: string = "";
  jwt: string = '';
  subscriptionType: string = '';
}
export class Signup {
  mobile: string = '';
  password: string = '';
  name: string = '';
  email: string = '';
  role: string = '';
  category: string ='';
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router, private messageService: MessageService) { }
  name: string = '';
  email: string = '';
  mobile: number | undefined;
  password: string = '';
  isLogin: boolean = true;
  ctype: string = 'Business';
  cpassword: string = '';
  getLoginDetails() {


    this.loading = true;
    this.service.getLoginDetails().subscribe(
      (res: any) => {
        this.loading = false;
        this.loginStatus = res;
        console.log(this.loginStatus);

        if (this.loginStatus.userType === 'Customer') {
          this.router.navigate(['home/start'], { state: { loginStatus: res } });
        }
        else if (this.loginStatus.userType === 'Designer') {
          this.router.navigate(['home/designer'], { state: { loginStatus: res } });

        }
        else if(this.loginStatus.userType === 'Admin') {
          this.router.navigate(['admin'], { state: { loginStatus: res } });

        }

      },
      (err: any) => {
        this.loading = false;

      }
    );
  }


  ngOnInit(): void {
    console.log("liogin");
    this.getLoginDetails();
    this.getCategories();
  }
  categories: DropDown[]=[];



  getCategories()
  {
    this.service.getCategories().subscribe(
      (res: any) => {
        this.categories=res;
        console.log(this.categories);
      },
      (err: any) => {
        this.categories=[];

      }
    );
  }

  loading: boolean = false;
  type: string = 'password';
  icon: string = 'pi pi-eye-slash'
  loginStatus: LoginStatus = new LoginStatus();
  category: DropDown = new DropDown();

  changeType() {
    console.log(this.type);
    if (this.type == 'password') {
      this.type = 'text';
      this.icon = 'pi pi-eye';
    }
    else {
      this.type = 'password';
      this.icon = 'pi pi-eye-slash';
    }
    console.log(this.type);
  }
  loginOrSingup() {


    if ((this.mobile + "").trim().length != 10) {
      this.messageService.add({ severity: 'error', summary: 'Invalid Mobile Number Provided.', detail: '' });
      return;
    }

    if (this.password==null || this.password.trim().length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Invalid Password Provided.', detail: '' });
      return;
    }





    if (this.isLogin) {
      var login = new Login();
      login.mobile = this.mobile + "";
      login.password = this.password;

      console.log(login);
      this.loading = true;
      this.service.login(login).subscribe(
        (res: any) => {
          // if (res)
          //   this.router.navigate(['home']);
          // else {
          //   this.loading = false;
          //   console.log("login faield");
          //   this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: '' });
          // }


          this.loginStatus = res;
          console.log(res);
          if (this.loginStatus.loginStatus) {

            let tokenStr = 'Bearer ' + this.loginStatus.jwt;
            localStorage.setItem('token', tokenStr);


            this.router.navigate(['home'], { state: { loginStatus: res } });

          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: '' });
            this.password = "";
            this.loading = false;
          }

        },
        (err) => {
          console.log(err + " Error");
          this.loading = false;
        }
      );
    }
    else {


      if (this.name==null || this.name.trim().length == 0) {
        this.messageService.add({ severity: 'error', summary: 'Invalid Name Provided.', detail: '' });
        return;
      }

      if (this.email==null || this.email.trim().length == 0 || this.email.trim().indexOf("@") == -1 || this.email.trim().indexOf(".") == -1) {
        this.messageService.add({ severity: 'error', summary: 'Invalid Email Provided.', detail: '' });
        return;
      }



      if (this.cpassword ==null || this.cpassword.trim().length == 0) {
        this.messageService.add({ severity: 'error', summary: 'Invalid Confirm Password Provided.', detail: '' });
        return;
      }

      if ( this.password != this.cpassword) {
        this.messageService.add({ severity: 'error', summary: 'Password didnot Match', detail: '' });
        return;
      }
      
      if (this.ctype=='Business' && ( this.category  == null || this.category.name   == null || this.category.name.trim().length  == 0)) {
        this.messageService.add({ severity: 'error', summary: 'Select Category', detail: '' });
        return;
      }


      var signup = new Signup();
      signup.name = this.name;
      signup.email = this.email;
      signup.mobile = this.mobile + "";
      signup.password = this.password;
      signup.role = this.ctype;
      signup.category=this.category.name;




      console.log(signup);

      this.loading = true;
      this.service.signUp(signup).subscribe(
        (res: any) => {
          if (res && res.loginStatus)
            this.router.navigate(['success']);
          else if (res && !res.loginStatus) {
            this.loading = false;
            console.log("SignUp failed");
            this.messageService.add({ severity: 'error', summary: res.message, detail: '' });
          }
          else {
            this.loading = false;
            console.log("SignUp failed");
            this.messageService.add({ severity: 'error', summary: "SignUp failed", detail: '' });
          }
        },
        (err) => { console.log(err + " Error"); this.loading = false; }
      );

    }

  }

}
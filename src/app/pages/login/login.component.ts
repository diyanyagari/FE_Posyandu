import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../service/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signup = false;
  fusername;
  username;
  password;
  fpassword;
  email;
  nama_lengkap;
  alamat;
  id_posyandu;

  constructor(
    private auth: AuthService,
    public router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
      this.router.navigate(['/'])
    }
    this.fusername = '';
    this.username = '';
    this.password = '';
    this.fpassword = '';
    this.email = '';
    this.nama_lengkap = '';
    this.alamat = '';
    this.id_posyandu = '';
    this.signup = false
  }

  onRegister() {
    this.auth.register(this.email, this.fusername, this.fpassword, this.nama_lengkap, this.alamat, this.id_posyandu)
      .subscribe(res => {
        let response = JSON.parse(res._body)
        if (response.status == 200) {
          this.toastr.info('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Registration Success', '', {
            closeButton: true,
            enableHtml: true,
            timeOut: 2000,
            toastClass: "alert alert-info alert-with-icon",
            positionClass: 'toast-' + 'top' + '-' + 'right'
          });
          setTimeout(() => this.ngOnInit(), 15);
        }
      })
  }

  onLogin() {
    this.auth.login(this.username, this.password)
      .subscribe(res => {
        let response = JSON.parse(res._body)
        if (response.status == 200) {
          sessionStorage.setItem('token', response.values)
          this.toastr.info('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Login Success', '', {
            closeButton: true,
            enableHtml: true,
            timeOut: 2000,
            toastClass: "alert alert-info alert-with-icon",
            positionClass: 'toast-' + 'top' + '-' + 'right'
          });
          setTimeout(() => this.router.navigate(['/']), 15);
        } else {
          this.toastr.warning('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> '+ response.values + '' , '', {
            closeButton: true,
            enableHtml: true,
            timeOut: 2000,
            toastClass: "alert alert-warning alert-with-icon",
            positionClass: 'toast-' + 'top' + '-' +  'right'
          });
        }
      })
  }

}

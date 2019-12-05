import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Validators, FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-tambah-balita',
  templateUrl: './tambah-balita.component.html',
  styleUrls: ['./tambah-balita.component.scss']
})
export class TambahBalitaComponent implements OnInit {

  form: FormGroup;
  url = environment.BASE_URL;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private http: Http,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      'nama_balita': new FormControl('', Validators.required),
      'tgl_lahir': new FormControl(new Date(), Validators.required),
      'umur': new FormControl('', Validators.required),
      'alamat': new FormControl('', Validators.required),
      'nik_ayah': new FormControl('', Validators.required),
      'nama_ayah': new FormControl('', Validators.required),
      'nama_ibu': new FormControl('', Validators.required),
      'nik_ibu': new FormControl('', Validators.required),
      'noHp_ayah': new FormControl('', Validators.required),
      'noHp_ibu': new FormControl('', Validators.required)
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSave() {
    if (this.form.invalid) {
      this.validateAllFormFields(this.form);
      this.toastr.warning('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Data Incomplete', '', {
        closeButton: true,
        enableHtml: true,
        timeOut: 2000,
        toastClass: "alert alert-warning alert-with-icon",
        positionClass: 'toast-' + 'top' + '-' + 'right'
      });
    } else {
      this.http.post(this.url + 'insert_balita', this.form.value).subscribe(res => {
        console.log(res)
        this.toastr.info('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Successful', '', {
          closeButton: true,
          enableHtml: true,
          timeOut: 2000,
          toastClass: "alert alert-info alert-with-icon",
          positionClass: 'toast-' + 'top' + '-' + 'right'
        });
        setTimeout(() => this.router.navigate(['/dashboard']), 1000);
      })
    }
  }

  tglLahir() {
    let datenow = new Date();
    let birthday = new Date(this.form.get('tgl_lahir').value);
    let year = 0;
    if (datenow.getMonth() < birthday.getMonth()) {
      year = 1;
    } else if ((datenow.getMonth() == birthday.getMonth()) && datenow.getDate() < birthday.getDate()) {
      year = 1;
    }
    let umurTahun = datenow.getFullYear() - birthday.getFullYear() - year;
    let umurBulan;
    let umurHari;
    if (umurTahun < 0) {
      umurTahun = 0;
    }

    if ((datenow.getMonth() < birthday.getMonth()) && (datenow.getFullYear() == birthday.getFullYear())) {
    	umurBulan = birthday.getMonth() - datenow.getMonth();
    } else if ((datenow.getMonth() > birthday.getMonth()) && (datenow.getFullYear() == birthday.getFullYear())) {
    	umurBulan = datenow.getMonth() - birthday.getMonth();
    }

    this.form.get('umur').setValue(umurTahun)
  }

}

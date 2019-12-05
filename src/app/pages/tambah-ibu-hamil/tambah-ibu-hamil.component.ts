import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Validators, FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-tambah-ibu-hamil',
  templateUrl: './tambah-ibu-hamil.component.html',
  styleUrls: ['./tambah-ibu-hamil.component.scss']
})
export class TambahIbuHamilComponent implements OnInit {

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
      'nama_ayah': new FormControl('', Validators.required),
      'nik_ayah': new FormControl('', Validators.required),
      'nama_ibu': new FormControl('', Validators.required),
      'nik_ibu': new FormControl('', Validators.required),
      'alamat': new FormControl('', Validators.required),
      'noHp': new FormControl('', Validators.required)
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
      this.http.post(this.url + 'insert_ibu_hamil', this.form.value).subscribe(res => {
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

}

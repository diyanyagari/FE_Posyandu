import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-tambah-kunjungan-ibu-hamil',
  templateUrl: './tambah-kunjungan-ibu-hamil.component.html',
  styleUrls: ['./tambah-kunjungan-ibu-hamil.component.scss']
})
export class TambahKunjunganIbuHamilComponent implements OnInit {

  url = environment.BASE_URL;
  form: FormGroup;
  dataIbu;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private http: Http,
    private toastr: ToastrService,
    private api: ApiService,
  ) { }

  ngOnInit() {
    let data = sessionStorage.getItem('dataIbuHamil')
    this.dataIbu = JSON.parse(data);

    this.form = this.fb.group({
      'tgl_kunjungan': new FormControl('', Validators.required),
      'id_ibu': new FormControl('', Validators.required),
      'bb': new FormControl('', Validators.required),
      'rPenyakit': new FormControl('', Validators.required),
      'rAlergi': new FormControl('', Validators.required),
      'rKB': new FormControl('', Validators.required),
      'hamilke': new FormControl('', Validators.required),
      'usiaAnakTerakhir': new FormControl('', Validators.required),
      'tmptLahirAnak': new FormControl('', Validators.required),
      'BBAnak': new FormControl('', Validators.required),
      'rImunisasi': new FormControl('', Validators.required)
    });

    let x = new Date();
    let hari = x.getDay() + 1;
    let tglHari;
    let bln: number = x.getMonth() + 1;
    if (hari.toString().length == 1) {
      tglHari = '0' + hari;
    } else {
      tglHari = hari;
    }
    this.form.get('tgl_kunjungan').setValue(x.getFullYear() + '-' + bln + '-' + tglHari);
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
    this.form.get('id_ibu').setValue(this.dataIbu.id_ibu)
    this.api.add(this.url + 'insertKunjunganIbuHamil', this.form.value).subscribe(res => {
      this.toastr.warning('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Success', '', {
        closeButton: true,
        enableHtml: true,
        timeOut: 2000,
        toastClass: "alert alert-info alert-with-icon",
        positionClass: 'toast-' + 'top' + '-' + 'right'
      });
      this.ngOnInit();
      this.router.navigate(['/dashboard'])
    })
  }

}

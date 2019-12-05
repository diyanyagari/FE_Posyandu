import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-tambah-kunjungan-balita',
  templateUrl: './tambah-kunjungan-balita.component.html',
  styleUrls: ['./tambah-kunjungan-balita.component.scss']
})
export class TambahKunjunganBalitaComponent implements OnInit {

  url = environment.BASE_URL;
  form: FormGroup;
  dataBalita;
  kodeKunjungan = 'BB';
  kunjungan;
  umur;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private http: Http,
    private toastr: ToastrService,
    private api: ApiService,
  ) { }

  ngOnInit() {
    let data = sessionStorage.getItem('data')
    this.dataBalita = JSON.parse(data);

    this.form = this.fb.group({
      'tgl_kunjungan': new FormControl('', Validators.required),
      'id_balita': new FormControl('', Validators.required),
      'id_jenis_kunjungan': new FormControl('', Validators.required),
      'beratbadan': new FormControl('', Validators.required),
      'tinggi': new FormControl('', Validators.required),
      'jenisImunisasi': new FormControl('', Validators.required),
      'id': new FormControl('', Validators.required),
      'jk': new FormControl('', Validators.required),
      'keteranganPemberianVitamin': new FormControl('', Validators.required)
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
    this.getUmur();
    this.getKunjungan();
  }

  getUmur() {
    let datenow = new Date(this.form.get('tgl_kunjungan').value);
    let birthday = new Date(this.dataBalita.tgl_lahir);
    let year = 0;
    if (datenow.getMonth() < birthday.getMonth()) {
      year = 1;
    } else if ((datenow.getMonth() == birthday.getMonth()) && datenow.getDate() < birthday.getDate()) {
      year = 1;
    }
    let umurTahun = datenow.getFullYear() - birthday.getFullYear() - year;
    if (umurTahun < 0) {
      umurTahun = 0;
    }

    let bulan;
    if (datenow.getFullYear() - birthday.getFullYear() == 0) {
      bulan = datenow.getMonth() - birthday.getMonth();
    } else if (datenow.getFullYear() > birthday.getFullYear()) {
      if (datenow.getMonth() > birthday.getMonth()) {
        bulan = datenow.getMonth() - birthday.getMonth();
      } else if (datenow.getMonth() < birthday.getMonth()) {
        bulan = (12 - birthday.getMonth()) + datenow.getMonth()
      }
    }
    this.umur = umurTahun + ' Tahun ' + bulan + ' Bulan' 
  }

  onChange(val) {
    this.kodeKunjungan = val;
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
    let datenow = new Date(this.form.get('tgl_kunjungan').value);
    let birthday = new Date(this.dataBalita.tgl_lahir);
    if(datenow < birthday) {
      this.toastr.warning('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Tanggal Kunjungan Melebihi Tanggal Lahir', '', {
        closeButton: true,
        enableHtml: true,
        timeOut: 2000,
        toastClass: "alert alert-warning alert-with-icon",
        positionClass: 'toast-' + 'top' + '-' + 'right'
      });
    } else {
      let year = 0;
      if (datenow.getMonth() < birthday.getMonth()) {
        year = 1;
      } else if ((datenow.getMonth() == birthday.getMonth()) && datenow.getDate() < birthday.getDate()) {
        year = 1;
      }
      let umurTahun = datenow.getFullYear() - birthday.getFullYear() - year;
      if (umurTahun < 0) {
        umurTahun = 0;
      }
  
      let bulan;
      if (datenow.getFullYear() - birthday.getFullYear() == 0) {
        bulan = datenow.getMonth() - birthday.getMonth();
      } else if (datenow.getFullYear() > birthday.getFullYear()) {
        if (datenow.getMonth() > birthday.getMonth()) {
          bulan = datenow.getMonth() - birthday.getMonth();
        } else if (datenow.getMonth() < birthday.getMonth()) {
          bulan = (12 - birthday.getMonth()) + datenow.getMonth()
        }
      }
  
      let beratIdeal = 2 * (umurTahun + (bulan / 10)) + 8;
      let toleransi = 2;
      let beratSekarang = this.form.get('beratbadan').value
      let sttsGizi;
      if ((beratSekarang >= (beratIdeal - toleransi)) && (beratSekarang <= (beratIdeal + toleransi))) {
        sttsGizi = 'Normal';
      } else if (beratSekarang > beratIdeal + toleransi) {
        sttsGizi = 'Obesitas';
      } else if (beratSekarang < beratIdeal - toleransi) {
        sttsGizi = 'Kurang Gizi';
      }
      let dataKirim = {
        'tgl_kunjungan': this.form.get('tgl_kunjungan').value,
        'id_balita': this.dataBalita.id_balita,
        'id_jenis_kunjungan': this.form.get('id_jenis_kunjungan').value,
        'beratbadan': this.form.get('beratbadan').value,
        'tinggi': this.form.get('tinggi').value,
        'jenisImunisasi': this.form.get('jenisImunisasi').value,
        'keteranganPemberianVitamin': this.form.get('keteranganPemberianVitamin').value,
        'sttsGizi': sttsGizi
      }
      this.api.add(this.url + 'insertKunjungan', dataKirim).subscribe(res => {
        this.getKunjungan();
      })
    }
  }

  getKunjungan() {
    this.api.add(this.url + 'viewKunjunganBalita', { 'id_balita': this.dataBalita.id_balita }).subscribe(res => {
      this.kunjungan = res.values
    })
  }

}

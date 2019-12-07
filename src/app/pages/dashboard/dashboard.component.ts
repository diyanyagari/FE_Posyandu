import { Component, OnInit } from "@angular/core";
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
import { ApiService } from '../../../service/api.service';
import { FormGroup, FormBuilder, FormControl, FormControlDirective, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { SharedService } from '../../../service/shared.service'


@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {

  url = environment.BASE_URL;
  jmlBayi;
  jmlIbuHamil;
  dataIbuHamil;
  dataBalita;

  data: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000
  }, {
    eid: 'e102',
    ename: 'ram',
    esal: 2000
  }, {
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
  }];

  constructor(
    private http: Http,
    private api: ApiService,
    private fb: FormBuilder,
    public router: Router,
    private excelExport: SharedService
  ) { }

  ngOnInit() {
    this.getDataIbuHamil();
    this.getDataBalita();
    this.getCountBalita();
    this.getCountIbuHamil();
  }

  getCountBalita() {
    this.api.get(this.url + 'countBalita').subscribe(res => {
      this.jmlBayi = res.values.jumlahBalita
    })
  }

  getCountIbuHamil() {
    this.api.get(this.url + 'countIbuHamil').subscribe(res => {
      this.jmlIbuHamil = res.values.jumlahIbuHamil
    })
  }

  getDataIbuHamil() {
    this.api.get(this.url + 'viewIbuHamil').subscribe(res => {
      this.dataIbuHamil = res.values
    })
  }

  getDataBalita() {
    this.api.get(this.url + 'viewBalita').subscribe(res => {
      this.dataBalita = res.values
    })
  }

  tambahBalita() {
    this.router.navigate(['/tambah-balita'])
  }

  tambahIbuHamil() {
    this.router.navigate(['/tambah-ibu-hamil'])
  }

  tambahkunjunganbalita(data) {
    sessionStorage.setItem('data', JSON.stringify(data));
    this.router.navigate(['/tambah-kunjungan-balita'])
  }

  tambahkunjunganibuhamil(data) {
    sessionStorage.setItem('dataIbuHamil', JSON.stringify(data));
    this.router.navigate(['/tambah-kunjungan-ibu-hamil'])
  }

  riwayat(data) {
    sessionStorage.setItem('data', JSON.stringify(data));
    this.router.navigate(['/riwayat-balita'])
  }

  riwayatIbu(data) {
    sessionStorage.setItem('dataIbuHamil', JSON.stringify(data));
    this.router.navigate(['/riwayat-ibu-hamil'])
  }

  exportAsXLSX(param): void {
    if (param == 'B') {
      let dataPrint: any = [];
      this.api.add(this.url + 'viewKunjunganBalita', { 'id_balita': '' }).subscribe(res => {
        this.api.get(this.url + 'viewBalita').subscribe(ress => {
          for (let i = 0; i < res.values.length; i++) {
            for (let j = 0; j < ress.values.length; j++) {
              if (ress.values[j].id_balita == res.values[i].id_balita) {
                let x = new Date(res.values[i].tgl_kunjungan);
                let hari = x.getDay() + 1;
                let tglHari;
                let bln: number = x.getMonth() + 1;
                if (hari.toString().length == 1) {
                  tglHari = '0' + hari;
                } else {
                  tglHari = hari;
                }

                let y = new Date(ress.values[j].tgl_lahir);
                let hariY = y.getDay() + 1;
                let tglHariY;
                let blnY: number = y.getMonth() + 1;
                if (hariY.toString().length == 1) {
                  tglHariY = '0' + hariY;
                } else {
                  tglHariY = hariY;
                }
                let dataTemp = {
                  'Tanggal Kunjungan': tglHari + '/' + bln + '/' + x.getFullYear(),
                  'Nama Balita': ress.values[j].nama_balita,
                  'Tanggal Lahir': tglHariY + '/' + blnY + '/' + y.getFullYear(),
                  'Umur': ress.values[j].umurTahun,
                  'Alamat': ress.values[j].alamat,
                  'Nama Ibu': ress.values[j].nama_ibu,
                  'Nama Ayah': ress.values[j].nama_ayah,
                  'Berat Badan': res.values[i].beratbadan,
                  'Tinggi': res.values[i].tinggi,
                  'Keterangan Pemberian Vitamin': res.values[i].keteranganPemberianVit,
                  'Status Gizi': res.values[i].sttsGizi
                }
                dataPrint.push(dataTemp)
              }
            }
          }
          this.excelExport.exportAsExcelFile(dataPrint, 'Riwayat Kunjungan Balita');
        });
      })
    } else {
      let dataPrint: any = [];
      this.api.add(this.url + 'viewKunjunganIbuHamil', { 'id_ibu_hamil': '' }).subscribe(res => {
        this.api.get(this.url + 'viewIbuHamil').subscribe(ress => {
          for (let i = 0; i < res.values.length; i++) {
            for (let j = 0; j < ress.values.length; j++) {
              if (ress.values[j].id_ibu == res.values[i].id_ibu_hamil) {
                let x = new Date(res.values[i].tgl_kunjungan);
                let hari = x.getDay() + 1;
                let tglHari;
                let bln: number = x.getMonth() + 1;
                if (hari.toString().length == 1) {
                  tglHari = '0' + hari;
                } else {
                  tglHari = hari;
                }
                let dataTemp = {
                  'Tanggal Kunjungan': tglHari + '/' + bln + '/' + x.getFullYear(),
                  'Nama Ibu': ress.values[j].nama_ibu,
                  'Alamat': ress.values[j].alamat,
                  'No. Handphone': ress.values[j].noHp,
                  'Berat Badan': res.values[i].BB,
                  'Riwayat Penyakit': res.values[i].riwayatPenyakit,
                  'Riwayat Alergi': res.values[i].riwayatAlergi,
                  'Riwayat KB': res.values[i].riwayatKB,
                  'Hamil Ke-': res.values[i].hamilke,
                  'Usia Anak Terakhir': res.values[i].usiaAnakTerakhir + 'Tahun',
                  'Tempat Lahir Anak Terakhir': res.values[i].tempat_lahir,
                  'Berat Badan Anak Terakhir': res.values[i].BBanakTerakhir,
                  'Riwayat Imunisasi': res.values[i].riwayatImunisasi
                }
                dataPrint.push(dataTemp)
              }
            }
          }
          this.excelExport.exportAsExcelFile(dataPrint, 'Riwayat Kunjungan Ibu Hamil');
        });
      })
    }
  }
}

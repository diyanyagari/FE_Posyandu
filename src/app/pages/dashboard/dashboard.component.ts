import { Component, OnInit } from "@angular/core";
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
import { ApiService } from '../../../service/api.service';
import { FormGroup, FormBuilder, FormControl, FormControlDirective, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

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

  constructor(
    private http: Http,
    private api: ApiService,
    private fb: FormBuilder,
    public router: Router,
  ) {}

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
}

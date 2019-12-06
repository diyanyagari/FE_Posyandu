import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-riwayat-ibu-hamil',
  templateUrl: './riwayat-ibu-hamil.component.html',
  styleUrls: ['./riwayat-ibu-hamil.component.scss']
})
export class RiwayatIbuHamilComponent implements OnInit {

  url = environment.BASE_URL;
  kunjunganIbuHamil;
  dataIbu

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

    this.getKunjungan();
  }

  getKunjungan() {
    this.api.add(this.url + 'viewKunjunganIbuHamil', { 'id_ibu_hamil': this.dataIbu.id_ibu }).subscribe(res => {
      this.kunjunganIbuHamil = res.values
    })
  }

}

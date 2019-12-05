import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TransaksiComponent } from './pages/transaksi/transaksi.component';
import { LoginComponent } from './pages/login/login.component';
// import { TambahKunjunganBalitaComponent } from './pages/tambah-kunjungan-balita/tambah-kunjungan-balita.component';
// import { TambahBalitaComponent } from './pages/tambah-balita/tambah-balita.component';
// import { TambahIbuHamilComponent } from './pages/tambah-ibu-hamil/tambah-ibu-hamil.component'

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    HttpModule,
    ReactiveFormsModule
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, TransaksiComponent, LoginComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

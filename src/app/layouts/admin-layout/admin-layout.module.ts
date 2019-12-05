import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { TambahIbuHamilComponent } from "../../pages/tambah-ibu-hamil/tambah-ibu-hamil.component";
import { TambahBalitaComponent } from "../../pages/tambah-balita/tambah-balita.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { TambahKunjunganBalitaComponent } from "../../pages/tambah-kunjungan-balita/tambah-kunjungan-balita.component";
import { RiwayatBalitaComponent } from '../../pages/riwayat-balita/riwayat-balita.component';
// import { RtlComponent } from "../../pages/rtl/rtl.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TambahIbuHamilComponent,
    TambahBalitaComponent,
    TablesComponent,
    IconsComponent,
    TypographyComponent,
    NotificationsComponent,
    RiwayatBalitaComponent,
    TambahKunjunganBalitaComponent,
    MapComponent,
    // RtlComponent
  ]
})
export class AdminLayoutModule {}

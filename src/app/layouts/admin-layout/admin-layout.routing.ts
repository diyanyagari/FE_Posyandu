import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { TambahBalitaComponent } from "../../pages/tambah-balita/tambah-balita.component";
import { TambahIbuHamilComponent } from "../../pages/tambah-ibu-hamil/tambah-ibu-hamil.component";
import { TambahKunjunganBalitaComponent } from "../../pages/tambah-kunjungan-balita/tambah-kunjungan-balita.component";
import { RiwayatBalitaComponent } from "../../pages/riwayat-balita/riwayat-balita.component";
import { TambahKunjunganIbuHamilComponent } from '../../pages/tambah-kunjungan-ibu-hamil/tambah-kunjungan-ibu-hamil.component';
import { RiwayatIbuHamilComponent } from '../../pages/riwayat-ibu-hamil/riwayat-ibu-hamil.component';
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "tambah-balita", component: TambahBalitaComponent },
  { path: "tambah-ibu-hamil", component: TambahIbuHamilComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent },
  { path: "tambah-kunjungan-balita", component: TambahKunjunganBalitaComponent },
  { path: "riwayat-balita", component: RiwayatBalitaComponent },
  { path: "tambah-kunjungan-ibu-hamil", component: TambahKunjunganIbuHamilComponent },
  { path: "riwayat-ibu-hamil", component: RiwayatIbuHamilComponent },
  // { path: "rtl", component: RtlComponent }
];

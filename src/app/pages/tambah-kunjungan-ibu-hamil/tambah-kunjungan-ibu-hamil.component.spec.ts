import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahKunjunganIbuHamilComponent } from './tambah-kunjungan-ibu-hamil.component';

describe('TambahKunjunganIbuHamilComponent', () => {
  let component: TambahKunjunganIbuHamilComponent;
  let fixture: ComponentFixture<TambahKunjunganIbuHamilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TambahKunjunganIbuHamilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TambahKunjunganIbuHamilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahKunjunganBalitaComponent } from './tambah-kunjungan-balita.component';

describe('TambahKunjunganBalitaComponent', () => {
  let component: TambahKunjunganBalitaComponent;
  let fixture: ComponentFixture<TambahKunjunganBalitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TambahKunjunganBalitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TambahKunjunganBalitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

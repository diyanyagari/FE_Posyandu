import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiwayatBalitaComponent } from './riwayat-balita.component';

describe('RiwayatBalitaComponent', () => {
  let component: RiwayatBalitaComponent;
  let fixture: ComponentFixture<RiwayatBalitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiwayatBalitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiwayatBalitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiwayatIbuHamilComponent } from './riwayat-ibu-hamil.component';

describe('RiwayatIbuHamilComponent', () => {
  let component: RiwayatIbuHamilComponent;
  let fixture: ComponentFixture<RiwayatIbuHamilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiwayatIbuHamilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiwayatIbuHamilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

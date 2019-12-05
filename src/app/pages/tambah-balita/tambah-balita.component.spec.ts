import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahBalitaComponent } from './tambah-balita.component';

describe('TambahBalitaComponent', () => {
  let component: TambahBalitaComponent;
  let fixture: ComponentFixture<TambahBalitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TambahBalitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TambahBalitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

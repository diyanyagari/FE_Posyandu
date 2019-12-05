import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahIbuHamilComponent } from './tambah-ibu-hamil.component';

describe('TambahIbuHamilComponent', () => {
  let component: TambahIbuHamilComponent;
  let fixture: ComponentFixture<TambahIbuHamilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TambahIbuHamilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TambahIbuHamilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

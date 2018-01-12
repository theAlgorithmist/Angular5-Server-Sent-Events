import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockdisplayComponent } from './stockdisplay.component';

describe('StockdisplayComponent', () => {
  let component: StockdisplayComponent;
  let fixture: ComponentFixture<StockdisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockdisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

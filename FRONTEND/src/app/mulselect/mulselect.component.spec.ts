import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MulselectComponent } from './mulselect.component';

describe('MulselectComponent', () => {
  let component: MulselectComponent;
  let fixture: ComponentFixture<MulselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MulselectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MulselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

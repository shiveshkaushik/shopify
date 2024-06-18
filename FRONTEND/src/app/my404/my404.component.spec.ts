import { ComponentFixture, TestBed } from '@angular/core/testing';

import { My404Component } from './my404.component';

describe('My404Component', () => {
  let component: My404Component;
  let fixture: ComponentFixture<My404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [My404Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(My404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

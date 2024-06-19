import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePermissionsComponent } from './page-permissions.component';

describe('PagePermissionsComponent', () => {
  let component: PagePermissionsComponent;
  let fixture: ComponentFixture<PagePermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagePermissionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagePermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

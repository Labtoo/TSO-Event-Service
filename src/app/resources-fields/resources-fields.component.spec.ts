import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesFieldsComponent } from './resources-fields.component';

describe('ResourcesFieldsComponent', () => {
  let component: ResourcesFieldsComponent;
  let fixture: ComponentFixture<ResourcesFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcesFieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

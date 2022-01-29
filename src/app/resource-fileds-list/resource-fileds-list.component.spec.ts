import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceFiledsListComponent } from './resource-fileds-list.component';

describe('ResourceFiledsListComponent', () => {
  let component: ResourceFiledsListComponent;
  let fixture: ComponentFixture<ResourceFiledsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceFiledsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceFiledsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

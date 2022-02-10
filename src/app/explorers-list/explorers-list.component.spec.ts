import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorersListComponent } from './explorers-list.component';

describe('ExplorersListComponent', () => {
  let component: ExplorersListComponent;
  let fixture: ComponentFixture<ExplorersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

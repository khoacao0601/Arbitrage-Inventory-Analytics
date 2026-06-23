import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickingItemsComponent } from './picking-items.component';

describe('PickingItemsComponent', () => {
  let component: PickingItemsComponent;
  let fixture: ComponentFixture<PickingItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickingItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickingItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

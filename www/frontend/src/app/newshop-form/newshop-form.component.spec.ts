import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewshopFormComponent } from './newshop-form.component';

describe('NewshopFormComponent', () => {
  let component: NewshopFormComponent;
  let fixture: ComponentFixture<NewshopFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewshopFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewshopFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

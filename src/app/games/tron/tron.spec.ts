import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tron } from './tron';

describe('Tron', () => {
  let component: Tron;
  let fixture: ComponentFixture<Tron>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tron]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tron);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

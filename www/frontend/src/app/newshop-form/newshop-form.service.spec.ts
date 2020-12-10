import { TestBed } from '@angular/core/testing';

import { NewshopFormService } from './newshop-form.service';

describe('NewshopFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewshopFormService = TestBed.get(NewshopFormService);
    expect(service).toBeTruthy();
  });
});

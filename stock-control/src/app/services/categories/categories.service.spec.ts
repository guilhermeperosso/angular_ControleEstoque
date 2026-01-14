import { TestBed } from '@angular/core/testing';

import { CategoriesService as CategoriesService } from './categories.service';

describe('CategoriesServiceService', () => {
  let service: CategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

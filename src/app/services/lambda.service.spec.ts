import { TestBed } from '@angular/core/testing';

import { DesktopAppearanceService } from './DesktopAppearanceService.service';

describe('LambdaService', () => {
  let service: DesktopAppearanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesktopAppearanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

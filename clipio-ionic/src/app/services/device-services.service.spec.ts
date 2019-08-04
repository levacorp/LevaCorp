import { TestBed } from '@angular/core/testing';

import { DeviceServicesService } from './device-services.service';

describe('DeviceServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceServicesService = TestBed.get(DeviceServicesService);
    expect(service).toBeTruthy();
  });
});

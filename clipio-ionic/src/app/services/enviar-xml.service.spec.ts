import { TestBed } from '@angular/core/testing';

import { EnviarXMLService } from './enviar-xml.service';

describe('EnviarXMLService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnviarXMLService = TestBed.get(EnviarXMLService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ExportarPdfService } from './exportar-pdf.service';

describe('ExportarPdfService', () => {
  let service: ExportarPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportarPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { CatService } from './cat.service';
import { environment } from 'src/environments/environment';
import { Cat } from '../_model/cat.model';
import { ToastrModule } from 'ngx-toastr';

describe('CatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClient,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-center',
          preventDuplicates: true,
        }),],
      providers: [CatService],
    });

  });
  it(
    'should call methods properly',
    inject(
      [HttpTestingController, CatService],
      (httpMock: HttpTestingController, catService: CatService) => {
        const catDescription = 'cat1';
        let catMock = new Cat(catDescription);

        catService.fetchCat().subscribe((catObject) => { });

        const mockReq = httpMock.expectOne(environment.catsApiUrl);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(catMock);

        httpMock.verify();
      }
    )
  );
});
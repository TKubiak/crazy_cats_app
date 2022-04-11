import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { CatScrollComponent } from './cat-scroll-list.component';

describe('CatScrollComponent', () => {
  let component: CatScrollComponent;
  let fixture: ComponentFixture<CatScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ScrollingModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-center',
          preventDuplicates: true,
        })
      ],
      declarations: [CatScrollComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

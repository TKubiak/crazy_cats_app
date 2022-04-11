import { Component } from '@angular/core';
import { Cat } from './_model/cat.model';
import { CatService } from './_service/cat.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import * as AOS from 'aos';
import { AuthService } from '../auth/_service/auth.service';

@Component({
  selector: 'cat-scroll-list',
  templateUrl: './cat-scroll-list.component.html',
  styleUrls: ['./cat-scroll-list.component.scss']
})
export class CatScrollComponent {
  public dataSource: CatsDataSource;
  public isLoading = new BehaviorSubject<(boolean)>(true);

  constructor(private catService: CatService, private authService: AuthService) {
    AOS.init();
    this.dataSource = new CatsDataSource(catService, this.isLoading);
  }

  public logout() {
    this.authService.signOut();
  }
}

export class CatsDataSource extends DataSource<Cat | undefined> {
  private catsList = Array.from<Cat>({ length: 0 });
  private dataStream = new BehaviorSubject<(Cat | undefined)[]>(this.catsList);
  private virtualListSub = new Subscription();

  private expectedListSize: number = 0;
  private readonly minimalCatsCount: number = 10;
  private readonly fetchOffset: number = 5;

  constructor(private catService: CatService, private isLoading: BehaviorSubject<(boolean)>) {
    super();
    this.fetchCatObject();
  }

  connect(collectionViewer: CollectionViewer): Observable<(Cat | undefined)[] | ReadonlyArray<Cat | undefined>> {
    this.virtualListSub.add(collectionViewer.viewChange.subscribe(range => {
      if (this.isScrollAtBottom(range, this.fetchOffset) || this.minimalCountNotFetched()) {
        this.isLoading.next(true);
        this.expectedListSize++;
        this.fetchCatObject();
      }
    }));
    return this.dataStream;
  }

  private fetchCatObject(): void {
    this.catService.fetchCat().subscribe(catObject => {
      if (this.checkAlreadyExists(catObject)) {
        this.fetchCatObject()
      } else {
        this.catsList = this.catsList.concat(catObject);
      }
      this.dataStream.next(this.catsList);
      this.refreshLoader();
    });
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.virtualListSub.unsubscribe();
  }

  private minimalCountNotFetched(): boolean {
    return this.catsList.length < this.minimalCatsCount;
  }

  private isScrollAtBottom(range: any, loadOffset: number) {
    return range.end > this.catsList.length - loadOffset;
  }

  private checkAlreadyExists(newCatObject: Cat): boolean {
    return this.catsList.some(catObject =>
      catObject.description === newCatObject.description
    );
  }

  private refreshLoader() {
    // true when no active fetching in background
    if (this.expectedListSize + 1 === this.catsList.length) {
      this.isLoading.next(false);
    }
  }
}

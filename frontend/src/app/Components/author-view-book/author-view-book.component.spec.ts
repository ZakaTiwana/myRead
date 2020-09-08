import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorViewBookComponent } from './author-view-book.component';

describe('AuthorViewBookComponent', () => {
  let component: AuthorViewBookComponent;
  let fixture: ComponentFixture<AuthorViewBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorViewBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorViewBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

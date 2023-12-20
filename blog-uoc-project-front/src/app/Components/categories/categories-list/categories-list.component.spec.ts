
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CategoryDTO } from 'src/app/Models/category.dto';
import { CategoryService } from 'src/app/Services/category.service';
import { CategoriesListComponent } from './categories-list.component';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

describe('CategoriesListComponent', () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      declarations: [ CategoriesListComponent ],
      providers: [ CategoryService, LocalStorageService ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loadCategories success from subscription',() => {
    const categoryService = fixture.debugElement.injector.get(CategoryService);
    const listCategories: CategoryDTO[] = [];
    const localStorageService = TestBed.inject(LocalStorageService);
    const spy = spyOn(categoryService, 'getCategoriesByUserId').and.returnValue(of(listCategories));
    
    localStorageService.set('user_id', '1');
    component['loadCategories'](); 
    
    expect(spy).toHaveBeenCalledWith('1');
    expect(component.categories.length).toBe(0);

    localStorageService.remove('user_id');
  });

  it('createCategory success from subscription',() => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');

    component['createCategory']();
    expect(spy).toHaveBeenCalledWith('/user/category/');
  });

  it('updateCategory success from subscription',() => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');

    component['updateCategory']('1');
    expect(spy).toHaveBeenCalledWith('/user/category/1');
  });

});

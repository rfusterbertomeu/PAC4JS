import { 
  HttpClientTestingModule,
  HttpTestingController 
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CategoryDTO } from 'src/app/Models/category.dto';
import { CategoryService, deleteResponse } from './category.service';

const categoriesList: CategoryDTO[] = [
  {
    userId: '',
    categoryId: '1',
    css_color: '',
    description: '',
    title: ''
  },
  {
    userId: '',
    categoryId: '2',
    css_color: '',
    description: '',
    title: ''
  },
  {
    userId: '',
    categoryId: '3',
    css_color: '',
    description: '',
    title: ''
  }
];

const category: CategoryDTO = {
  userId: '',
  categoryId: '1',
  css_color: '',
  description: '',
  title: ''
};

const deleteRes: deleteResponse = {
  affected: 1
}

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('GET method and getCategoriesByUserId return a list of categories',()=>{
    service.getCategoriesByUserId('1').subscribe((resp:CategoryDTO[])=>{
      expect(resp).toEqual(categoriesList);
    });

    const req = httpMock.expectOne('http://localhost:3000/users/categories/1');
    
    expect(req.request.method).toBe('GET');
    req.flush(categoriesList);
  });

  it('POST method and createCategory return a category',()=>{
    service.createCategory(new CategoryDTO('','','')).subscribe((resp:CategoryDTO)=>{
      expect(resp).toEqual(category);
    });

    const req = httpMock.expectOne('http://localhost:3000/categories');
    
    expect(req.request.method).toBe('POST');
    req.flush(category);
  });

  it('GET method and getCategoryById return a category',()=>{
    service.getCategoryById('1').subscribe((resp:CategoryDTO)=>{
      expect(resp).toEqual(category);
    });

    const req = httpMock.expectOne('http://localhost:3000/categories/1');
    
    expect(req.request.method).toBe('GET');
    req.flush(category);
  });


  it('PUT method and updateCategory return a category',()=>{
    service.updateCategory('1', new CategoryDTO('','','')).subscribe((resp:CategoryDTO)=>{
      expect(resp).toEqual(category);
    });

    const req = httpMock.expectOne('http://localhost:3000/categories/1');
    
    expect(req.request.method).toBe('PUT');
    req.flush(category);
  });

  it('DELETE method and deleteCategory return a deleteResponse',()=>{
    service.deleteCategory('1').subscribe((resp:deleteResponse)=>{
      expect(resp).toEqual(deleteRes);
    });

    const req = httpMock.expectOne('http://localhost:3000/categories/1');
    
    expect(req.request.method).toBe('DELETE');
    req.flush(deleteRes);
  });
});

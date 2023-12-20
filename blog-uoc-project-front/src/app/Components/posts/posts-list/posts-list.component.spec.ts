
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { PostDTO } from 'src/app/Models/post.dto';
import { PostService } from 'src/app/Services/post.service';
import { PostsListComponent } from './posts-list.component';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

describe('PostsListComponent', () => {
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      declarations: [ PostsListComponent ],
      providers: [ PostService, LocalStorageService ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loadPosts success from subscription',() => {
    const postService = fixture.debugElement.injector.get(PostService);
    const listPosts: PostDTO[] = [];
    const localStorageService = TestBed.inject(LocalStorageService);
    const spy = spyOn(postService, 'getPostsByUserId').and.returnValue(of(listPosts));
    
    localStorageService.set('user_id', '1');
    component['loadPosts']();

    expect(spy).toHaveBeenCalled();
    expect(component.posts.length).toBe(0);

    localStorageService.remove('user_id');
  });

  it('createPost success from subscription',() => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');

    component['createPost']();
    expect(spy).toHaveBeenCalledWith('/user/post/');
  });

  it('updatePost success from subscription',() => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');

    component['updatePost']('1');
    expect(spy).toHaveBeenCalledWith('/user/post/1');
  });

});

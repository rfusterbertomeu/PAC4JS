import { 
  HttpClientTestingModule,
  HttpTestingController 
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PostDTO } from 'src/app/Models/post.dto';
import { PostService, updateResponse, deleteResponse} from './post.service';

const postsList: PostDTO[] = [
  {
    postId: '1',
    title: '',
    description: '',
    num_likes: 0,
    num_dislikes: 0,
    publication_date: new Date('01/01/2023'),
    categories: [],
    userId: '',
    userAlias: ''
  },
  {
    postId: '2',
    title: '',
    description: '',
    num_likes: 0,
    num_dislikes: 0,
    publication_date: new Date('01/01/2023'),
    categories: [],
    userId: '',
    userAlias: ''
  },
  {
    postId: '3',
    title: '',
    description: '',
    num_likes: 0,
    num_dislikes: 0,
    publication_date: new Date('01/01/2023'),
    categories: [],
    userId: '',
    userAlias: ''
  }
];

const post: PostDTO = {
    postId: '1',
    title: '',
    description: '',
    num_likes: 0,
    num_dislikes: 0,
    publication_date: new Date('01/01/2023'),
    categories: [],
    userId: '',
    userAlias: ''
  }

  const updateRes: updateResponse = {
    affected: 1
  }
  const deleteRes: deleteResponse = {
    affected: 1
  }
  
describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpMock.verify();
  });

  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('GET method and getPosts return a list of posts',()=>{
    service.getPosts().subscribe((resp:PostDTO[])=>{
      expect(resp).toEqual(postsList);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts');
    
    expect(req.request.method).toBe('GET');
    req.flush(postsList);
  });

  it('GET method and getPostsByUserId return a list of posts',()=>{
    service.getPostsByUserId('1').subscribe((resp:PostDTO[])=>{
      expect(resp).toEqual(postsList);
    });

    const req = httpMock.expectOne('http://localhost:3000/users/posts/1');
    
    expect(req.request.method).toBe('GET');
    req.flush(postsList);
  });

  it('POST method and createPost return a post',()=>{
    service.createPost(new PostDTO('', '', 0, 0, new Date())).subscribe((resp:PostDTO)=>{
      expect(resp).toEqual(post);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts');
    
    expect(req.request.method).toBe('POST');
    req.flush(post);
  });

  it('GET method and getPostById return a post',()=>{
    service.getPostById('1').subscribe((resp:PostDTO)=>{
      expect(resp).toEqual(post);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/1');
    
    expect(req.request.method).toBe('GET');
    req.flush(post);
  });


  it('PUT method and updatePost return a post',()=>{
    service.updatePost('1', new PostDTO('', '', 0, 0, new Date())).subscribe((resp:PostDTO)=>{
      expect(resp).toEqual(post);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/1');
    
    expect(req.request.method).toBe('PUT');
    req.flush(post);
  });

  it('PUT method and likePost return a updateResponse',()=>{
    service.likePost('1').subscribe((resp:updateResponse)=>{
      expect(resp).toEqual(updateRes);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/like/1');
    
    expect(req.request.method).toBe('PUT');
    req.flush(updateRes);
  });

  it('PUT method and dislikePost return a updateResponse',()=>{
    service.dislikePost('1').subscribe((resp:updateResponse)=>{
      expect(resp).toEqual(updateRes);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/dislike/1');
    
    expect(req.request.method).toBe('PUT');
    req.flush(updateRes);
  });


  it('DELETE method and deletePost return a deleteResponse',()=>{
    service.deletePost('1').subscribe((resp:deleteResponse)=>{
      expect(resp).toEqual(deleteRes);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/1');
    
    expect(req.request.method).toBe('DELETE');
    req.flush(deleteRes);
  });
});

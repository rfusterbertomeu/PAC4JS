import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { BehaviorSubject, of } from 'rxjs';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';

class TemporalComponentForRoutes{}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'home',
            component:TemporalComponentForRoutes,
          },{
            path: 'dashboard',
            component:TemporalComponentForRoutes,
          },{
            path: 'login',
            component:TemporalComponentForRoutes,
          },{
            path: 'register',
            component:TemporalComponentForRoutes,
          },{
            path: 'adminPosts',
            component:TemporalComponentForRoutes,
          },{
            path: 'adminCategories',
            component:TemporalComponentForRoutes,
          },{
            path: 'profile',
            component:TemporalComponentForRoutes,
          }
      ])
      ],
      declarations: [HeaderComponent],
      providers: [HeaderMenusService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');

    component.navigationTo('home');
    expect(spy).toHaveBeenCalledWith('home');
  });

  it('should navigate to dashboard', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');

    component.navigationTo('dashboard');
    expect(spy).toHaveBeenCalledWith('dashboard');
  });

  it('should navigate to login', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');

    component.navigationTo('login');
    expect(spy).toHaveBeenCalledWith('login');
  });

  it('should navigate to register', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');
    component.navigationTo('register');
    expect(spy).toHaveBeenCalledWith('register');
  });

  it('should navigate to adminPosts', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');

    component.navigationTo('adminPosts');
    expect(spy).toHaveBeenCalledWith('adminPosts');
  });

  it('should navigate to adminCategories', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');

    component.navigationTo('adminCategories');
    expect(spy).toHaveBeenCalledWith('adminCategories');
  });

  it('should navigate to profile', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');

    component.navigationTo('profile');
    expect(spy).toHaveBeenCalledWith('profile');
  });

  it('should navigate to logout', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');

    component.navigationTo('logout');
    expect(spy).toHaveBeenCalledWith('home');
  });

  it('should show buttons on showNoAuthSection', () => {
    const headerInfo: HeaderMenus = {
      showAuthSection: false,
      showNoAuthSection: true,
    };
    // Injectem el servei headerMenusService i li assignem el valor headerInfo
    const headerMenusService = TestBed.inject(HeaderMenusService);
    headerMenusService.headerManagement = new BehaviorSubject<HeaderMenus>(headerInfo); 
    // Cridem el mètode ngOnInit i detectem els canvis en fixture 
    component.ngOnInit();
    fixture.detectChanges();
    // Comprova el valor de les variables showAuthSection i showNoAuthSection del component header
    expect(component.showNoAuthSection).toBeTruthy();
    expect(component.showAuthSection).toBeFalsy();

    // Obtenim tots els botons que es mostren
    const header: HTMLElement = fixture.debugElement.nativeElement;
    const buttons = header.querySelectorAll('button');
    // Comprova que el numero de botons siga 6 (Dashboard, Home, Login i Register)
    expect(buttons.length).toBe(4);
    expect(header.textContent).toContain('Home\Login\Register');
  });

  it('should show buttons on showAuthSection', () => {
    const headerInfo: HeaderMenus = {
      showAuthSection: true,
      showNoAuthSection: false,
    };
    // Injectem el servei headerMenusService i li assignem el valor headerInfo
    const headerMenusService = TestBed.inject(HeaderMenusService);
    headerMenusService.headerManagement = new BehaviorSubject<HeaderMenus>(headerInfo); 
    // Cridem el mètode ngOnInit i detectem els canvis en fixture 
    component.ngOnInit();
    fixture.detectChanges();
    // Comprova el valor de les variables showAuthSection i showNoAuthSection del component header
    expect(component.showAuthSection).toBeTruthy();
    expect(component.showNoAuthSection).toBeFalsy();

    // Obtenim tots els botons que es mostren
    const header: HTMLElement = fixture.debugElement.nativeElement;
    const buttons = header.querySelectorAll('button');
    // Comprova que el numero de botons siga 6 (Dashboard, Home, Admin posts, Admin categories, Profile i Logout)
    expect(buttons.length).toBe(6);
    expect(header.textContent).toContain('Home\Admin posts\Admin categories\Profile\Logout');
  });
});

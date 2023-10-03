import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MultilevelMenuService, Configuration, SlideInOut, ExpandedRTL, ExpandedLTR, MultilevelNode } from 'ng-material-multilevel-menu';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/auth/api.service';

@Component({
  selector: 'app-layout-user',
  templateUrl: './layout-user.component.html',
  styleUrls: ['./layout-user.component.scss'],
  animations: [
    SlideInOut,
    ExpandedLTR,
    ExpandedRTL,
  ]
})
export class LayoutUserComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  link: string;

  menuWithID: MultilevelNode[] = null


  appitems = [
    {
      label: 'Usuarios',
      icon: 'people_outline',
      items: [
        {
          label: 'Administradores',
          link: '/dashboard/users/admin',
          icon: 'person_outline',
        },
        {
          label: 'Comerciales',
          link: '/dashboard/users/commercial',
          icon: 'person_outline',
        }
      ]
    },
    {
      label: 'Empresas',
      icon: 'business',
      link: '/dashboard/companies',
    }
  ]

  config: Configuration = {
    paddingAtStart: true,
    classname: 'my-custom-class',
    selectedListFontColor: 'none',

  };

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private apiService: ApiService
  ) {
  }

  async ngOnInit() {
  }

  selectedItem($event) {
    this.router.navigateByUrl($event.link);
  }


  cerrarSesion() {
    this.apiService.logout();
  }
}

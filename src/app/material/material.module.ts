import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Material
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {LayoutModule} from '@angular/cdk/layout';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatCommonModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgMaterialMultilevelMenuModule, MultilevelMenuService } from 'ng-material-multilevel-menu';
import {MatTabsModule} from '@angular/material/tabs';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatCommonModule,
    MatDatepickerModule,
    MatRadioModule,
    MatDialogModule,
    MatNativeDateModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatTabsModule,

    //Menu
    NgMaterialMultilevelMenuModule
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatCommonModule,
    MatDatepickerModule,
    MatRadioModule,
    MatDialogModule,
    MatNativeDateModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatTabsModule,

    //Menu
    NgMaterialMultilevelMenuModule
  ],providers: [
    MultilevelMenuService
  ]
})
export class MaterialModule { }

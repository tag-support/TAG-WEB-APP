import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { AlertOkComponent } from 'src/app/components/alert-ok/alert-ok.component';
import { ApiService } from 'src/app/services/auth/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private apiService: ApiService,
    private router : Router,
    private _dialog: MatDialog
  ) {
    this.initForm();
  }

  ngOnInit() { }

  initForm() {
    this.credentials = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  async login() {
    if (this.credentials.invalid) {
      this.alertOk('Los datos ingresados no son correctos.', 'Error Datos');
    } else {
      this.apiService.login(this.credentials.value).subscribe({
        next: (data: any) => {
          this.router.navigateByUrl('/dashboard/companies');
          //this.alertOk('El usuario no se encuenta en nuestra base de datos.', 'Error Usuario');
        },
        error: (err) => {
          this.alertOk('El usuario no se encuenta en nuestra base de datos.', 'Error Usuario');
        }
      });
    }
  }

  alertOk( message, title) {
    const dialogRef = this._dialog.open(AlertOkComponent, {
      data : { message, title}
    });
  }

}

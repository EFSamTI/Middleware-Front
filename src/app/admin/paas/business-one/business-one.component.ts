import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationLoader, AnimationOptions, provideLottieOptions } from 'ngx-lottie';
import { catchError } from 'rxjs';
import { RestAPIService } from 'src/app/core/services/rest.api';

@Component({
  selector: 'app-business-one',
  templateUrl: './business-one.component.html',
  styleUrl: './business-one.component.scss',
  providers: [
    provideLottieOptions({
      player: () => import('lottie-web')
    }),
    AnimationLoader
  ]
})
export class BusinessOneComponent {
  model?: any;
  form!: UntypedFormGroup;
  animationOptions: AnimationOptions = {
    path: '/assets/animations/CardSkeleton.json'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private rest: RestAPIService
  ) {
    this.form = this.formBuilder.group({
      description: ['', [Validators.required]],
      ip: ['', [Validators.required]],
      port: [80, [Validators.required]],
      rootPath: [''],
      timeout: [3000],
      username: ['', [Validators.required]],
      company: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id !== null && id !== '') {
      this.rest.retrieveBusinessOne(id)
        .pipe(catchError(this.rest.handleError))
        .subscribe(x => {
          this.f['description'].setValue(x.description);
          this.f['ip'].setValue(x.ip);
          this.f['port'].setValue(x.port);
          this.f['rootPath'].setValue(x.root_path);
          this.f['timeout'].setValue(x.timeout);
          this.f['username'].setValue(x.login_body?.UserName);
          this.f['company'].setValue(x.login_body?.CompanyDB);
          this.f['password'].setValue(x.login_body?.Password);
          this.model = x;
        });
    } else {
      this.model = {
        port: 80,
        timeout: 3000
      };
    }
  }

  get f() {
    return this.form.controls;
  }

  get isNew() {
    return this.model === undefined || this.model.serial === undefined;
  }

  save() {
    if (this.form.valid) {
      this.rest.saveBusinessOne({
        'id': this.model.serial,
        'pg_id': this.model.id,
        'description': this.f['description'].value,
        'ip': this.f['ip'].value,
        'port': this.f['port'].value,
        'root_path': this.f['rootPath'].value,
        'timeout': this.f['timeout'].value,
        'login_body': {
          'UserName': this.f['username'].value,
          'CompanyDB': this.f['company'].value,
          'Password': this.f['password'].value
        }
      })
        .pipe(catchError(this.rest.handleError))
        .subscribe(x => this.router.navigate(['/admin']));
    }
  }
}

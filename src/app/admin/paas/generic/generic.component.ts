import { Component } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationLoader, AnimationOptions, provideLottieOptions } from 'ngx-lottie';
import { catchError } from 'rxjs';
import { RestAPIService } from 'src/app/core/services/rest.api';

export function jsonValidator(control: AbstractControl): ValidationErrors | null {
  try {
    JSON.parse(control.value);
  } catch (e) {
    return { jsonInvalid: true };
  }
  return null;
}

@Component({
  selector: 'app-generic',
  templateUrl: './generic.component.html',
  styleUrl: './generic.component.scss',
  providers: [
    provideLottieOptions({
      player: () => import('lottie-web')
    }),
    AnimationLoader
  ]
})
export class GenericComponent {
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
      ssl: [false],
      header: [, [jsonValidator]]
    })
  }

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id !== null && id !== '') {
      this.rest.retrieveGeneric(id)
        .pipe(catchError(this.rest.handleError))
        .subscribe(x => {
          this.f['description'].setValue(x.description);
          this.f['ip'].setValue(x.ip);
          this.f['port'].setValue(x.port);
          this.f['rootPath'].setValue(x.root_path);
          this.f['timeout'].setValue(x.timeout);
          this.f['ssl'].setValue(x.ssl);
          if (x.header !== undefined)
            this.f['header'].setValue(JSON.stringify(x.header));
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
      this.rest.saveGeneric({
        'id': this.model.serial,
        'pg_id': this.model.id,
        'description': this.f['description'].value,
        'ip': this.f['ip'].value,
        'port': this.f['port'].value,
        'root_path': this.f['rootPath'].value,
        'ssl': this.f['ssl'].value,
        'timeout': this.f['timeout'].value,
        'header': JSON.parse(this.f['header'].value)
      })
        .pipe(catchError(this.rest.handleError))
        .subscribe(x => this.router.navigate(['/admin']));
    }
  }
}

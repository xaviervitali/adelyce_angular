import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
// import { UiService } from 'src/app/ui/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  error = false;
  submitted = false;
  loggin = false;

  constructor(private authService: AuthService, private route: Router) {}
  ngOnInit(): void {}

  handleSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.loggin = true;
    this.error = false;
    this.authService.authenticate(this.form.value as Credential).subscribe(
      (token) => {
        this.loggin = false;
        this.route.navigateByUrl('/bucketList');
      },
      (e) => {
        this.loggin = false;
        this.error = true;
      }
    );
  }
}

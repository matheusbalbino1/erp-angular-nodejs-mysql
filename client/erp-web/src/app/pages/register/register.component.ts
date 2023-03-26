import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ICreateUser } from 'src/app/interfaces/IUser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent {
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  validatorMessages = {
    name: {
      required: 'Mínimo 3 caracteres',
      active: false,
    },
    password: {
      required: 'Mínimo 3 caracteres',
      active: false,
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  handleSubmit() {
    if (this.formGroup.valid) {
      this.userService.create(this.formGroup.value as ICreateUser);
    }
  }
}

import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  signpForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder) { }

  onSubmitLoginForm(): void {
    console.log("Dados do Formulário de Login: ", this.loginForm.value)
  }

  onSubmitSignUpForm(): void {
    console.log("Dados do Formulário de Criação de Conta: ", this.signpForm.value)
  }
}

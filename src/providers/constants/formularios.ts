import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

export class Formularios {

    static FORMULARIO_REGISTRO: FormGroup = new FormBuilder().group({

        username: new FormControl('', Validators.compose([
            Validators.maxLength(20),
            Validators.minLength(2),
            Validators.patter('^[a-zA-Z0-9]+$'),
            Validators.required
        ])),

        email: new FormControl('', Validators.compose([
            Validators.email,
            Validators.required
        ])),

        password: new FormControl('', Validators.compose([
            Validators.maxLength(20),
            Validators.minLength(8),
            Validators.required
        ])),

        passwordConfirm: new FormControl('', Validators.compose([
            Validators.maxLength(20),
            Validators.minLength(8),
            Validators.required
        ])),

        passwords: this.formBuilder.group({
            password: new FormControl('', Validators.compose([
                Validators.maxLength(20),
                Validators.minLength(8),
                Validators.required
            ])),

            passwordConfirm: new FormControl('', Validators.compose([
                Validators.maxLength(20),
                Validators.minLength(8),
                Validators.required
            ]))
        },{validator: this.passwordConfirming})
    })





    static MENSAJES_VALIDACION_REGISTRO = {
       'username': [
            {type: 'required', message: 'Debes ingresar un nombre de usuario.'},
            {type: 'minlength', message: 'Tu nombre de usuario debe tener mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Tu nombre de usuario debe tener máximo 20 caracteres.'},
            {type: 'pattern', message: 'Tu nombre de usuario debe estar compuesto solo de numeros y letras.'},
            {type: 'validUsername', message: 'Nombre de usuario ya existe.'}
        ],
        'email': [
            {type: 'required', message: 'Debes ingresar tu email.'},
            {type: 'email', message: 'email invalido.'}
        ],
        'password': [
            {type: 'required', message: 'Debes ingresar un password.'},
            {type: 'minlength', message: 'Tu nombre de usuario debe tener mínimo 8 caracteres.'},
            {type: 'maxlength', message: 'Tu nombre de usuario debe tener máximo 20 caracteres.'},

        ],
        'passwordConfirm': [
            {type: 'required', message: 'Debes ingresar un password.'},
            {type: 'minlength', message: 'Tu nombre de usuario debe tener mínimo 8 caracteres.'},
            {type: 'maxlength', message: 'Tu nombre de usuario debe tener máximo 20 caracteres.'},
        ]
    };
}

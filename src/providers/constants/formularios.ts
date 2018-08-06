import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';

export class Formularios {
    
    
    static FORMULARIO_REGISTRO: FormGroup = new FormBuilder().group({

        username: new FormControl('', Validators.compose([
            Validators.maxLength(20),
            Validators.minLength(2),
            Validators.pattern('^[a-zA-Z0-9]+$'),
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
        ]))
    }, {validator: Formularios.MatchPassword})

    static MatchPassword(AC: AbstractControl) {
        let password = AC.get('password').value; // to get value in input tag
        let passwordConfirm = AC.get('passwordConfirm').value; // to get value in input tag
         if(password != passwordConfirm) {
             console.log('false');
             AC.get('passwordConfirm').setErrors( {matchPassword: true} )
         } else {
             console.log('true');
             return null
         }
     }



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
            {type: 'matchPassword', message: 'Passwords no coinciden.'}
        ]
    };
}

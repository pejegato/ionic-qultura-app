import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

export class Formularios {

    static FORMULARIO_REGISTRO: FormGroup = new FormBuilder().group({

        nombre: new FormControl('', [
            Validators.maxLength(25),
            Validators.minLength(5),
            Validators.required
        ]),

        apellido: new FormControl('',[
            Validators.maxLength(25),
            Validators.minLength(5),
            Validators.required
        ]),

        username: new FormControl('', Validators.compose([
            Validators.maxLength(25),
            Validators.minLength(5),
            Validators.required
        ])),

        email: new FormControl('', Validators.compose([
            Validators.maxLength(25),
            Validators.minLength(5),
            Validators.required
        ])),

        password: new FormControl('', Validators.compose([
            Validators.maxLength(25),
            Validators.minLength(5),
            Validators.required
        ])),

        passwordConfirm: new FormControl('', Validators.compose([
            Validators.maxLength(25),
            Validators.minLength(5),
            Validators.required
        ])),
    });


    static MENSAJES_VALIDACION_REGISTRO = {
        'nombre': [
            {type: 'required', message: 'Debes ingresar tu nombre.'},
            {type: 'minlength', message: 'Minimum 5 characters are required for username.'},
            {type: 'maxlength', message: 'You can enter a username of maximum 30 characters.'},
            {type: 'pattern', message: 'Username should be composed of numbers and letters.'},
            {type: 'validUsername', message: 'A user with the selected username already exists.'}
        ],
        'apellido': [
            {type: 'required', message: 'Debes ingresar tu nombre.'},
            {type: 'minlength', message: 'Minimum 5 characters are required for username.'},
            {type: 'maxlength', message: 'You can enter a username of maximum 30 characters.'},
            {type: 'pattern', message: 'Username should be composed of numbers and letters.'},
            {type: 'validUsername', message: 'A user with the selected username already exists.'}
        ],
        'username': [
            {type: 'required', message: 'Debes ingresar tu nombre.'},
            {type: 'minlength', message: 'Minimum 5 characters are required for username.'},
            {type: 'maxlength', message: 'You can enter a username of maximum 30 characters.'},
            {type: 'pattern', message: 'Username should be composed of numbers and letters.'},
            {type: 'validUsername', message: 'A user with the selected username already exists.'}
        ],
        'email': [
            {type: 'required', message: 'Debes ingresar tu nombre.'},
            {type: 'minlength', message: 'Minimum 5 characters are required for username.'},
            {type: 'maxlength', message: 'You can enter a username of maximum 30 characters.'},
            {type: 'pattern', message: 'Username should be composed of numbers and letters.'},
            {type: 'validUsername', message: 'A user with the selected username already exists.'}
        ],
        'password': [
            {type: 'required', message: 'Debes ingresar tu nombre.'},
            {type: 'minlength', message: 'Minimum 5 characters are required for username.'},
            {type: 'maxlength', message: 'You can enter a username of maximum 30 characters.'},
            {type: 'pattern', message: 'Username should be composed of numbers and letters.'},
            {type: 'validUsername', message: 'A user with the selected username already exists.'}
        ],
        'passwordConfirm': [
            {type: 'required', message: 'Debes ingresar tu nombre.'},
            {type: 'minlength', message: 'Minimum 5 characters are required for username.'},
            {type: 'maxlength', message: 'You can enter a username of maximum 30 characters.'},
            {type: 'pattern', message: 'Username should be composed of numbers and letters.'},
            {type: 'validUsername', message: 'A user with the selected username already exists.'}
        ],
  
  
    };




}

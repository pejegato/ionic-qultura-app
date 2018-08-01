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




}

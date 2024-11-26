import { Component, EventEmitter, Input, Output} from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  @Input() valorInicial: any = {};
  @Output() formEnviado = new EventEmitter<any>();
    
  meuFormulario = new FormGroup({

    name: new FormControl("",[Validators.minLength(3), Validators.maxLength(15), Validators.required]),
    idade: new FormControl(0,[Validators.min(18), Validators.max(80), Validators.required]),
    email: new FormControl("",[Validators.email, Validators.required]),
    cargo: new FormControl("",[Validators.required]),
  });

  ngOnChanges() {
    if (this.valorInicial) {
      this.meuFormulario.setValue({
        name: this.valorInicial.name || '',
        idade: this.valorInicial.idade || null,
        email: this.valorInicial.email || '',
        cargo: this.valorInicial.cargo || ''
      });
    }
  }

  enviarFormulario() {
    if (this.meuFormulario.valid) {
      this.formEnviado.emit(this.meuFormulario.value);
      this.meuFormulario.reset();
      this.meuFormulario.controls.cargo.setValue('');
    }
  }

  limparFormulario(){
      this.meuFormulario.reset();
      this.meuFormulario.controls.cargo.setValue('');
      this.valorInicial = {};
  }
}

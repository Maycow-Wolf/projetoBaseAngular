import { Component, EventEmitter, Input, OnChanges, Output} from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from "../../services/user.service";


@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnChanges {
  usuarios: any[] = [];
  origemCadastro: string = 'list';
  @Input() valorInicial: any = {};
  @Input() cadastroEditadoId: number | null = null;
  // @Output() cancelarForm = new EventEmitter();
    
  meuFormulario = new FormGroup({
    name: new FormControl("",[Validators.minLength(3), Validators.maxLength(15), Validators.required]),
    idade: new FormControl(0,[Validators.min(18), Validators.max(80), Validators.required]),
    email: new FormControl("",[Validators.email, Validators.required]),
    cargo: new FormControl("",[Validators.required]),
    senha: new FormControl("",[Validators.minLength(6), Validators.maxLength(12), Validators.required])
  });

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnChanges() {
    if (this.valorInicial) {
      this.meuFormulario.setValue({
        name: this.valorInicial.name || '',
        idade: this.valorInicial.idade || null,
        email: this.valorInicial.email || '',
        cargo: this.valorInicial.cargo || '',
        senha: this.valorInicial.senha || null
      });
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['origem']) {
        this.origemCadastro = params['origem'];
      }
    });

    this.route.params.subscribe(params => {
      const userId = params['id']; 
      if (userId) {
        this.cadastroEditadoId = Number(userId);
        this.carregarUsuario(this.cadastroEditadoId);
      }
    });
  }

  carregarUsuario(id: number) {
    this.userService.getUserById(id).subscribe(
      (user) => {
        this.meuFormulario.setValue({
          name: user.name,
          idade: user.idade,
          email: user.email,
          cargo: user.cargo,
          senha: user.senha
        });
      },
      (error) => {
        console.error('Erro ao carregar usuário pelo ID:', error);
      }
    );
  }

  enviarFormulario() {
    if (this.meuFormulario.valid) {
      const novoCadastro = this.meuFormulario.value;
      this.userService.getUsers().subscribe(
        (usuarios) => {
          const usuarioEditando = this.cadastroEditadoId !== null ? Number(this.cadastroEditadoId) : null;

          const emailJaExiste = usuarios.some(user => user.email === novoCadastro.email && Number(user.id) !== usuarioEditando);

          if (emailJaExiste) {
            alert("O e-mail já está cadastrado!");
            return;
          }

          const cadastro = usuarioEditando ? { ...novoCadastro, id: usuarioEditando } : { ...novoCadastro };
          
          this.salvarUsuario(cadastro);
          this.meuFormulario.reset();
          this.meuFormulario.controls.cargo.setValue('');
          this.cadastroEditadoId ? alert("Cadastro atualizado com sucesso!") : alert("Cadastro realizado com sucesso!");
        }
      );      
    }
  }

  salvarUsuario(cadastro: any) {
    if (this.cadastroEditadoId !== null){
      this.userService.updateUser(this.cadastroEditadoId, cadastro).subscribe(
        (usuarioAtualizado) => {  
          this.usuarios = this.usuarios.map((user) =>
            user.id === usuarioAtualizado.id ? usuarioAtualizado : user,
          this.router.navigate(['/user/list'])
        );
        },
        (error) => {
          console.error('Erro ao atualizar usuário', error);
        }
      );
    } else {
      this.userService.createUser(cadastro).subscribe(
        (novoUsuario) => {
          this.usuarios.push(novoUsuario);
          this.router.navigate([this.origemCadastro === 'login' ? '/login' : '/user/list'])
        },
        (error) => {
          console.error('Erro ao criar usuário', error);
        }
      );
    }
  }

  cancelarCadastro() {
    this.meuFormulario.reset();
    this.meuFormulario.controls.cargo.setValue('');
    this.router.navigate([this.origemCadastro === 'login' ? '/login' : '/user/list']);
  }

  // limparFormulario(){
  //     this.meuFormulario.reset();
  //     this.meuFormulario.controls.cargo.setValue('');
  //     this.cancelarForm.emit();
  // }

}

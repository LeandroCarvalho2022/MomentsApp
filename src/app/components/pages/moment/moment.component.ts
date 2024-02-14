import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';
import { Comment } from 'src/app/Comment';
import { CommentService } from 'src/app/services/comment.service';
import { Moment } from 'src/app/Moment';
import { environment } from 'src/environments/environment.development';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {

  faTimes = faTimes;
  faEdit = faEdit;

  commentForm!: FormGroup; /* Exclamação serve para mostrar que existe a entidade commentForm, mas não ativa ela*/ 
  
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl

  constructor(
    private momentService: MomentService, 
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    private commentService : CommentService,
    ) {}
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((item) => (this.moment = item.data))

  /* Inicialização de formulário*/ 
  this.commentForm = new FormGroup({ 
    text: new FormControl('', [Validators.required]), /*Iniciando os campos para validação */
    username: new FormControl('', [Validators.required]),
  })
  }

  /*Getters, para pegar os dados que virão dos campos text e username e formar dados para o envio.*/
  /* pega dado, retorna do commentform */
  get text(){
    return this.commentForm.get('text')!;
  }

  get username(){
    return this.commentForm.get('username')!;
  }

  async removeHandler(id: number){
    this.momentService.removeMoment(id).subscribe({
      next: () => {
        this.messagesService.add("Excluido");
        this.router.navigate(["/"]);
      }
    })
  }
/* Event do form para receber os dados e fazer o "submit",  */
  async onSubmit(formDirective: FormGroupDirective){
    if(this.commentForm.invalid){
      return
    }
    const data: Comment = this.commentForm.value

    data.momentId = Number(this.moment!.id)

    this.commentService.createComment(data)
    .subscribe((comment )=> this.moment!.comments!.push(comment.data));

    this.messagesService.add("Comentário adicionado!")

    this.commentForm.reset();

    formDirective.resetForm();
  }
}

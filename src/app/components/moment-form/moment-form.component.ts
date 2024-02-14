  import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { Moment } from 'src/app/Moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit{
  @Output() onSubmit = new EventEmitter<Moment>();
  @Input()  btnText!: string;
  @Input() momentData: Moment | null = null;

  constructor(){}

  ngOnInit(): void{
    this.momentForm = new FormGroup({
      id: new FormControl(this.momentData ? this.momentData.id :''), /*condicional feita utilizando operador ternário, simplificando a estrutura semm if e else desnecessário*/
      title: new FormControl(this.momentData ? this.momentData.title :'', [Validators.required]),
      description: new FormControl(this.momentData ? this.momentData.description :'', [Validators.required]),
      image: new FormControl(this.momentData ? this.momentData.image :''),
    })
  }

  onFileSelected(event: any){
    const file: File = event.target.files[0]
    this.momentForm.patchValue({image : file});
  }

  get title() {
    return this.momentForm.get('title')!;
  }
  get description() {
    return this.momentForm.get('description')!;
  }

  momentForm!: FormGroup;
  

  submit(){

    if (this.momentForm.invalid) {
      return;
    }
    console.log(this.momentForm.value);
    
    this.onSubmit.emit(this.momentForm.value);
  }
}



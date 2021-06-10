import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IAsignaturas, IDiario } from 'src/app/interfaces/interfaces';
import { Asignaturas } from 'src/app/models/models';
import { DiarioService } from 'src/app/services/diario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialService } from 'src/app/services/material.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {


  @Input() diario: IDiario;
  @Input() Descripción: string;
  public asignaturas: IAsignaturas[] = [];
  public asignatura = new Asignaturas();
  public form: FormGroup;
  public submitted = false;



  constructor(public ModalController: ModalController, private router: Router, private _diarioService: DiarioService, private _formBuilder: FormBuilder, private _materialService: MaterialService) { }

  ngOnInit(): void {

    this.createForm();
    this.getAsignaturaList();
  }

  /*async presentModal(){
    const modal = await this.ModalController.create({
      component: ModalComponent,
      cssClass: 'my-custom-class',
      componentProps:{
        'descripción': '',
        'asignatura': '',
      }
    })
    return await modal.present();
  }*/


  //Método para cerrar el modal.
  goTab1(){
    this.ModalController.dismiss();
  }


  //Metodo que trae las asignaturas.
  getAsignaturaList(){
    this._materialService.getAsignaturaList().subscribe(
      (resp) => {
        this.asignaturas = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;

    const fields = this.form.value;

    fields.asignatura = this.asignaturas.find((p) => p.id == fields.asignatura);

  }


  //Metodo que controla el número de caracteres de los formularios del modal.
  createForm() {
    this.form = this._formBuilder.group({
      date: ['',[Validators.required,],],
      horas: [
        '',
        [
          Validators.maxLength(2),
          Validators.minLength(1),
        ],
      ],
      descripcion: [
        '',
        [
          Validators.maxLength(150),
          Validators.minLength(3),
        ],
      ],
      link: [
        '',
        [
          Validators.maxLength(150),
          Validators.minLength(3),
        ],
      ],
      evaluacionT: ['', 
      [
        Validators.pattern('^[a-zA-Z]+$'), 
        Validators.maxLength(1), 
        Validators.minLength(1),
      ],
      ],
      evaluacionP: ['', 
      [
        Validators.pattern('^[a-zA-Z]+$'), 
        Validators.maxLength(1), 
        Validators.minLength(1),
      ],
      ],
      asignatura: [''],
      equipo: [''],
    });
  }

  //Validators para controlar los formularios.
  public errorMessages = {
    date: [{ type: 'required', message: 'The Date is required' }],
    horas: [
      { type: 'maxlength', message: 'Maximum 2 characters' },
      { type: 'minlength', message: 'Minimun 1 characters' },
    ],
    descripcion: [
      { type: 'maxlength', message: 'Maximum 150 characters' },
      { type: 'minlength', message: 'Minimun 3 characters' },
    ],
    link: [
      { type: 'maxlength', message: 'Maximum 150 characters' },
      { type: 'minlength', message: 'Minimun 3 characters' },
    ],
    evaluacionT: [
      { type: 'pattern', message: 'Evaluacion must contain 1 letter'},
      { type: 'maxlength', message: 'Maximum 1 characters' },
      { type: 'minlength', message: 'Minimun 1 characters' },
    ],
    evaluacionP: [
      { type: 'pattern', message: 'Evaluacion must contain 1 letter'},
      { type: 'maxlength', message: 'Maximum 1 characters' },
      { type: 'minlength', message: 'Minimun 1 characters' },
    ],
    asignatura: [{ type: 'required', message: 'Choose one' }],
    equipo: [{ type: 'required', message: 'Choose one' }],

}
}

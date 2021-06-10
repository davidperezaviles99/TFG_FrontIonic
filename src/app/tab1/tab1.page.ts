import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../components/modal/modal.component'
import { IAlumno, IConsulta, IDiario, IEquipo, IEquipoMensaje, IEvaluacion, IMessage, IProfesor, ITutor, IUser } from '../interfaces/interfaces';
import { Alumno, Diario, Equipo, Evaluacion, Profesor, Tutor } from '../models/models';
import { DiarioService } from '../services/diario.service';
import { EquipoService } from '../services/equipo.service';
import { MensajeService } from '../services/mensaje.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public showModal = false;
  public showEvaluacionModal = false;
  public messageIsShow = false;

  public equipoMensajes: IEquipoMensaje[] = [];
  public message = '';

  roles = ['Alumno', 'Profesor','Tutor'];

  public diarios: IDiario[] = []; 
  public diario = new Diario();

  public alumnos: IAlumno[] = [];
  public alumno = new Alumno();

  public tutors: ITutor[] = [];
  public tutor = new Tutor();

  public profesors: IProfesor[] = [];
  public profesor = new Profesor();

  public equipos: IEquipo[] = [];
  public equipo = new Equipo();
  
  public evaluacions: IEvaluacion[] = [];
  public evaluacion = new Evaluacion();

  public user: IUser;
  public id: number;

  constructor(public ModalController: ModalController, public _diarioService: DiarioService,
    public _usersService: UserService, 
    public _equipoService: EquipoService,
    public _mensajeService: MensajeService,
    private router: Router,
    private route: ActivatedRoute) {}

  async abrirModal(){
    const modal = await this.ModalController.create({
      component: ModalComponent,
      cssClass: 'my-custom-class',
      componentProps:{
        'descripción': '',
        'asignatura': '',
      }
    })
    return await modal.present();
  
    const { data } = await modal.onDidDismiss();

    console.log('retorno del modal', data);

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.equipo = JSON.parse(localStorage.getItem('equipo'));
    // this.getEvaluacionList();
    this.getUser();
    // this.getAlumnoList();
    // this.getEquipoList();
    //this.getConsulta();
    //this.getDiarios();
    this.route.paramMap.subscribe(param => {
      const id = +param.get('id');
      this.id = id;
      //this.getEquipoMensajeList(id);
    });
  }

  createMessage() {
    if (this.message.trim().length > 0) {
      const message: IMessage = {
        description: this.message,
      };
      this._mensajeService.createMessage(message).subscribe(
        (resp) => {
          this.message = '';
          const equipoMensajes: IEquipoMensaje = {
            user: this.user,
            equipoId: this.id,
            equipo: this.equipo,
            message: resp,
            date: new Date(),
          }; 

          console.log(this.id)
          console.log(equipoMensajes)

          this._mensajeService
            .updateOperatorDemandMessage(equipoMensajes)
            .subscribe(
              (resp) => {
                this.equipoMensajes.push(resp);
              },
              (err) => {
                console.log(err);
              }
            );
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  getDiarioList() {
    this._diarioService.getDiarioList().subscribe(
      (resp) => {
        this.diarios = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getEvaluacionList() {
    this._diarioService.getEvaluacionList().subscribe(
      (resp) => {
        this.evaluacions = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateDiario(diario: IDiario) {
    const index = this.diarios.findIndex(o => o.id == diario.id)

    if(index > -1) {
      this.diarios.splice(index, 1, diario);
    } else {
      this.diarios.push(diario);
      this.getDiarioList();
    }
  }

  deletediario(id: number) {
    this._diarioService.deleteD(id).subscribe(
      () => {
        this.getDiarioList();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateEvaluacion(evaluacion: IEvaluacion) {
    const index = this.evaluacions.findIndex(o => o.id == this.evaluacion.id)

    if(index > -1) {
      this.evaluacions.splice(index, 1, evaluacion);
    } else {
      this.evaluacions.push(evaluacion);
      this.getEvaluacionList();
    }
  }

  deleteevaluacion(id: number) {
    this._diarioService.deleteE(id).subscribe(
      () => {
        this.getEvaluacionList();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  
  getUser(){
    this.user = this._usersService.getUser();
  }

  /*getConsulta(){
    const Consulta: IConsulta = {
      id: this.user.id,
      role: this.user.role
    }
    this._equipoService.getConsulta(Consulta).subscribe(resp =>{
      this.equipos = resp;
    })
  }

  getDiarios(){
    this._diarioService.getDiario(this.user.id).subscribe(
      (resp) => {
        this.diarios = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }*/

}

import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { IAlumno, IDiario, IEquipo, IEquipoMensaje, IEvaluacion, IMessage, IProfesor, ITutor, IUser } from '../interfaces/interfaces';
import { Alumno, Diario, Equipo, Evaluacion, Profesor, Tutor } from '../models/models';
import { DiarioService } from '../services/diario.service';
import { EquipoService } from '../services/equipo.service';
import { MensajeService } from '../services/mensaje.service'
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

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

  constructor(public _diarioService: DiarioService,
    public _usersService: UserService, 
    public _equipoService: EquipoService,
    public _mensajeService: MensajeService,
    private router: Router,
    private route: ActivatedRoute){
  }
  messages = [
    {
      user: 'simon',
      createdAt: 435235345,
      msg: 'hola'

    },
    {
      user: 'pedro',
      createdAt: 345545,
      msg: 'Que tal?'
    },
    {
      user: 'simon',
      createdAt: 453453,
      msg: 'Bien, y tu?'
    }
  ];

  currentUser= 'simon'
  newMsg = '';
  @ViewChild(IonContent) content: IonContent;

  

  //Método que crea el mensaje y lo envia.
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
}

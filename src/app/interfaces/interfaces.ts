
//interfaz login
export interface ILogin {
    email: string;
    password: string;
}

//interfaz usuario
export interface IUser {
    id: number;
    name: string;
    lastname: string;
    email: string;
    role: string;
}


//interfaz response
export interface Response {
    text: string;
}

//interfaz profesor
export interface IProfesor {
    id: number;
    name: string;
    lastname: string;
    email: string;
    role: string;
}

//interfaz tutor
export interface ITutor {
    id: number;
    name: string;
    lastname: string;
    nombreEmpresa: string;
    email: string;
    role: string;
}

//interfaz alumno
export interface IAlumno{
    id: number;
    name: string;
    lastname: string;
    email: string;
    role: string;
    curso: ICurso;
    profesor?: IProfesor;
    tutor?: ITutor;
}

//interfaz curso
export interface ICurso{
    id: number;
    numero: number;
    name: string;
    asignatura: IAsignaturas;
}

//interfaz asignaturas
export interface IAsignaturas{
    id: number;
    codigo: number;
    name: string;
    profesor: IProfesor;
}

//interfaz equipo
export interface IEquipo{
    id?: number;
    alumnoId: number;
    alumno?: IAlumno;
    tutor?: ITutor;
    profesor?: IProfesor;
}

//interfaz diario
export interface IDiario{
    id?: number;
    date: Date;
    horas: number;
    descripcion: string;
    link: string;
    equipo: IEquipo;
    asignatura: IAsignaturas;
}


//interfaz evaluación
export interface IEvaluacion{
    id?: number;
    date: Date;
    evaluacionT: string;
    evaluacionP: string;
    equipo: IEquipo;
}

//interfaz mensaje
export interface IMensaje{
    id: number;
    comentario: string;
    asunto: string;
    name: string;
    equipo: IEquipo;
    userId?: number;
    user: IUser;
}

//interfaz mensaje equipo
export interface IEquipoMensaje {
    id?: number;
    user: IUser;
    equipoId?: number;
    equipo: IEquipo;
    message: IMessage;
    date: Date;
  }

//interfaz message
export interface IMessage {
    id?: number;
    description: string;
  }

//interfaz consulta
export interface IConsulta{
    id: number;
    role: string;
    
}
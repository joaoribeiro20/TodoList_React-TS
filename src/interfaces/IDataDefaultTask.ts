export interface IDataDefaultTask{
    id: number;
    text: string;
    categories:string;
    statu:boolean
}

export interface IDataDeTarefas {
    tarefas: IDataDefaultTask[];
  }
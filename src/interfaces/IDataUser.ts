export interface IDataUser{
    id?: string;
    name: string;
    email:string;
    password:string;
    telefone:string;
    apelido:string;
    cep:string;
    tasks:tasks[]
}
export interface tasks{
    id: string;
    title: string;
    description:string;
    categories:string;
    statu:boolean;
    authorId:string;
}

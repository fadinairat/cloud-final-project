export interface User{
    _id: string,
    name: string, 
    username: string,
    password: string,
    profileImage: string
}

export interface GenericResponse{
    result:boolean, 
    data: Object,
    message: string
}
export default class UserDTO{
    // const nombreCompleto = "Pedro Lopez"
//nombreCompleto.split(' ')
    constructor(user){
        this.name= `${user.first_name} ${user.last_name} `
        //this.infoSAdicional= { date: user.bithDate, indentificascio: userr.dni}
    }
}
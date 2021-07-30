enum Sexo{
    Masculino = "Masculino",
    Femenido = "Femenino"
}
class Cliente extends Persona {
    edad:number;
    sexo:Sexo;

    constructor(id:number,nombre:string,apellido:string,edad:number,sexo:Sexo) {
        super(id,nombre,apellido);
        this.edad = edad
        this.sexo = sexo;
    }
} 
"use strict";
var Sexo;
(function (Sexo) {
    Sexo["Masculino"] = "Masculino";
    Sexo["Femenido"] = "Femenino";
})(Sexo || (Sexo = {}));
class Cliente extends Persona {
    constructor(id, nombre, apellido, edad, sexo) {
        super(id, nombre, apellido);
        this.edad = edad;
        this.sexo = sexo;
    }
}

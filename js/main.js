"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Main {
    constructor() {
        this.clientes = new Array();
        this.dom = new DOMtools();
        this.form = this.dom.$("container");
        this.formContainer = this.dom.$("formContainer");
    }
    setId() {
        let id;
        if (this.clientes.length == 0) {
            id = 1;
        }
        else {
            id = this.clientes.reduce((max, curr) => {
                if (curr.id >= max) {
                    return curr.id + 1;
                }
                return max;
            }, 0);
        }
        return id;
    }
    AgregarCliente() {
        var _a, _b;
        let formData = new FormData(this.form);
        let cliente = {
            id: this.setId(),
            nombre: (_a = formData.get("nombre")) === null || _a === void 0 ? void 0 : _a.toString(),
            apellido: (_b = formData.get("apellido")) === null || _b === void 0 ? void 0 : _b.toString(),
            edad: formData.get("edad"),
            sexo: this.dom.$("sexo").value,
        };
        if (this.verificarCliente(cliente)) {
            this.clientes.push(new Cliente(cliente.id, cliente.nombre, cliente.apellido, cliente.edad, cliente.sexo));
        }
        else {
            alert("Error en los datos ingresados!");
        }
        console.log(this.clientes);
        this.CloseForm();
        this.form.reset();
    }
    verificarCliente(cliente) {
        if (cliente.edad >= 18) {
            return true;
        }
        return false;
    }
    OpenForm() {
        this.formContainer.style.display = "flex";
    }
    CloseForm() {
        this.formContainer.style.display = "none";
    }
    displayByCheck() {
        let filt = (document.getElementsByName("filtros"));
        console.log(filt);
        filt.forEach((n) => {
            let row = this.dom.$(`${n.id}_row`);
            let col = this.dom.$(`${n.id}_col`);
            if (n.checked) {
                row.hidden = true;
                col.hidden = true;
            }
            else {
                row.hidden = false;
                col.hidden = false;
            }
        });
    }
    DisplayTablaFiltrada() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dom.divTabla.innerHTML = "";
            let filtroTipo = this.dom.$("sexoFiltro");
            let tipo = filtroTipo.value;
            if (this.clientes.length >= 1) {
                switch (tipo) {
                    case "Masculino":
                        this.dom.Tabla(yield this.FiltrarSexo(Sexo.Masculino));
                        break;
                    case "Femenino":
                        this.dom.Tabla(yield this.FiltrarSexo(Sexo.Femenido));
                        break;
                    default:
                        this.dom.Tabla(this.clientes);
                        break;
                }
            }
            else {
                alert("Sin clientes");
            }
        });
    }
    FiltrarSexo(tipo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clientes.filter((c) => c.sexo == tipo);
        });
    }
    DisplayTabla() {
        this.dom.divTabla.innerHTML = "";
        if (this.clientes.length >= 1) {
            this.dom.Tabla(this.clientes);
        }
        return;
    }
    CalcularPromedio() {
        return __awaiter(this, void 0, void 0, function* () {
            return ((yield this.clientes.reduce((max, curr) => {
                return max + curr.edad;
            }, 0)) / this.clientes.length);
        });
    }
    CargarPromedio() {
        return __awaiter(this, void 0, void 0, function* () {
            let edadPromedio = this.dom.$("edadPromedio");
            edadPromedio.value = yield (yield this.CalcularPromedio()).toString();
        });
    }
    EliminarClientes() {
        this.clientes.splice(0, this.clientes.length);
        this.DisplayTabla();
    }
    handleEvent(evt) {
        return __awaiter(this, void 0, void 0, function* () {
            let target = evt.target;
            if (target.id == "btnAlta") {
                this.OpenForm();
            }
            else if (target.id == "btnAltaNueva") {
                this.AgregarCliente();
                this.DisplayTabla();
                yield this.CargarPromedio();
            }
            else if (target.className == "filtros") {
                this.displayByCheck();
            }
            else if (target.id == "sexoFiltro") {
                this.DisplayTablaFiltrada();
            }
            else if (target.id == "btnDelete") {
                this.EliminarClientes();
            }
        });
    }
}
window.addEventListener("load", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    let main = new Main();
    let btnAlta = main.dom.$("btnAlta");
    let btnDelete = main.dom.$("btnDelete");
    let btnAltaNueva = main.dom.$("btnAltaNueva");
    let filt = document.getElementsByName("filtros");
    let sexoFiltro = main.dom.$("sexoFiltro");
    sexoFiltro.addEventListener("change", (event) => main.handleEvent(event));
    btnDelete.addEventListener("click", (event) => {
        main.handleEvent(event);
    });
    btnAlta.addEventListener("click", (event) => {
        main.handleEvent(event);
    });
    btnAltaNueva.addEventListener("click", (event) => {
        main.handleEvent(event);
    });
    filt.forEach((N) => N.addEventListener("change", (event) => main.handleEvent(event)));
}));

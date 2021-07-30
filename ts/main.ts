class Main implements EventListenerObject {
  clientes: Array<Cliente>;
  form: HTMLFormElement;
  dom: DOMtools;
  formContainer: HTMLElement;
  constructor() {
    this.clientes = new Array<Cliente>();
    this.dom = new DOMtools();
    this.form = <HTMLFormElement>this.dom.$("container");
    this.formContainer = <HTMLElement>this.dom.$("formContainer");
  }
  public setId(): number {
    let id: number;
    if (this.clientes.length == 0) {
      id = 1;
    } else {
      id = this.clientes.reduce((max, curr) => {
        if (curr.id >= max) {
          return curr.id + 1;
        }
        return max;
      }, 0);
    }
    return id;
  }
  public AgregarCliente() {
    let formData = new FormData(this.form);
    let cliente = {
      id: this.setId(),
      nombre: <string>formData.get("nombre")?.toString(),
      apellido: <string>formData.get("apellido")?.toString(),
      edad: <number>(<unknown>formData.get("edad")),
      sexo: (<HTMLInputElement>this.dom.$("sexo")).value as Sexo,
    };

    if (this.verificarCliente(cliente)) {
      this.clientes.push(
        new Cliente(
          cliente.id,
          cliente.nombre,
          cliente.apellido,
          cliente.edad,
          cliente.sexo
        )
      );
    } else {
      alert("Error en los datos ingresados!");
    }
    console.log(this.clientes);
    this.CloseForm();
    this.form.reset();
  }
  public verificarCliente(cliente: any) {
    if (cliente.edad >= 18) {
      return true;
    }
    return false;
  }
  public OpenForm() {
    this.formContainer.style.display = "flex";
  }
  public CloseForm() {
    this.formContainer.style.display = "none";
  }
  public displayByCheck() {
    let filt = <NodeListOf<HTMLInputElement>>(
      document.getElementsByName("filtros")
    );
    console.log(filt);

    filt.forEach((n) => {
      let row = this.dom.$(`${n.id}_row`);
      let col = this.dom.$(`${n.id}_col`);
      if (n.checked) {
        row.hidden = true;
        col.hidden = true;
      } else {
        row.hidden = false;
        col.hidden = false;
      }
    });
  }
  async DisplayTablaFiltrada() {
    this.dom.divTabla.innerHTML = "";
    let filtroTipo = <HTMLSelectElement>this.dom.$("sexoFiltro");
    let tipo = filtroTipo.value;
    if (this.clientes.length >= 1) {
      switch (tipo) {
        case "Masculino":
          this.dom.Tabla(await this.FiltrarSexo(Sexo.Masculino));
          break;
        case "Femenino":
          this.dom.Tabla(await this.FiltrarSexo(Sexo.Femenido));
          break;
        default:
          this.dom.Tabla(this.clientes);
          break;
      }
    } else {
      alert("Sin clientes");
    }
  }
  async FiltrarSexo(tipo: Sexo) {
    return await this.clientes.filter((c) => c.sexo == tipo);
  }
  DisplayTabla() {
      this.dom.divTabla.innerHTML = "";
    if (this.clientes.length >= 1) {
      this.dom.Tabla(this.clientes);
    }
    return;
  }
  async CalcularPromedio() {
    return (
      (await this.clientes.reduce((max, curr) => {
        return max + curr.edad;
      }, 0)) / this.clientes.length
    );
  }
  async CargarPromedio() {
    let edadPromedio = <HTMLInputElement>this.dom.$("edadPromedio");
    edadPromedio.value = await (await this.CalcularPromedio()).toString();
  }
  EliminarClientes() {
    this.clientes.splice(0, this.clientes.length);
    this.DisplayTabla();
  }
  async handleEvent(evt: Event): Promise<void> {
    let target = <Element>evt.target;
    if (target.id == "btnAlta") {
      this.OpenForm();
    } else if (target.id == "btnAltaNueva") {
      this.AgregarCliente();
      this.DisplayTabla();
      await this.CargarPromedio();
    } else if (target.className == "filtros") {
      this.displayByCheck();
    } else if (target.id == "sexoFiltro") {
      this.DisplayTablaFiltrada();
    } else if (target.id == "btnDelete") {
      this.EliminarClientes();
    }
  }
}

window.addEventListener("load", async (event) => {
  event.preventDefault();

  let main = new Main();

  let btnAlta = <HTMLElement>main.dom.$("btnAlta");
  let btnDelete = <HTMLElement>main.dom.$("btnDelete");
  let btnAltaNueva = <HTMLElement>main.dom.$("btnAltaNueva");

  let filt = <NodeListOf<HTMLElement>>document.getElementsByName("filtros");
  let sexoFiltro = <HTMLSelectElement>main.dom.$("sexoFiltro");
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

  filt.forEach((N) =>
    N.addEventListener("change", (event) => main.handleEvent(event))
  );
});

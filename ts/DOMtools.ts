class DOMtools {
  divTabla: HTMLElement;
  constructor() {
    this.divTabla = this.$("tabla");
  }
  $(el: string): HTMLElement {
    return <HTMLElement>document.getElementById(el);
  }
  /**
   *
   * @param {HTMLElement} obj Tabla que va a contener los apendices
   * @param {Array} arr Todos los datos
   */
  Tabla(arr: Array<any>,heads?:Array<string>) {
    let tabla = this.Create("table");
    // let headtable = new Array<string>();
    let headTable = Object.keys(arr[0]);
    // arr.reduce((v, c) => headtable = Object.keys(c), headtable);

    tabla.appendChild(this.THeaders(headTable));
    tabla.appendChild(this.TBody(arr));

    this.divTabla.appendChild(tabla);
  }
  /**
   * Cabezales de las tablas
   * @param {Array} heads
   * @returns Cabecera de tablas
   */
  THeaders(heads: Array<string>) {
    let thead = this.Create("thead");
    for (let j = 0; j < heads.length; j++) {
      let th = this.Create("th");
      th.className = "col";
      th.id = `${heads[j]}_col`;
      th.appendChild(this.TxtNode(heads[j].toUpperCase()));
      thead.appendChild(th);
    }
    return thead;
  }

  /**
   * Crea un cuerpo de una tabla con todas las lineas
   * @param {Array} arr
   * @returns
   */

  TBody(arr: Array<any>) {
    let tbody = this.Create("tbody");
    tbody.id = "tbody";
    for (let i = 0; i < arr.length; i++) {
      let trow = this.Create("tr");
      trow.className = "row";
      let data = Object.keys(arr[i]);
      data.forEach((el: string) => {
        trow.appendChild(this.Td(arr[i][el], el));
      });
      tbody.appendChild(trow);
    }
    return tbody;
  }
  /**
   * texto en la linea
   * @param {string} el
   * @returns
   */
  Td(el: string, id: string) {
    let td = this.Create("td");
    td.id = `${id}_row`;
    td.appendChild(this.TxtNode(el));
    return td;
  }
  /**
   * Crea el texto del nodo a ser apendizado
   * @param {string} el
   * @returns
   */
  TxtNode(el: string) {
    return document.createTextNode(el);
  }

  /**
   * Crear etiqueta html
   * @param {string} el
   * @returns etiqueta html
   */
  Create(el: string) {
    return document.createElement(el);
  }
}

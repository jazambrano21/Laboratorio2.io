class ListaProductos extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._productos = [];
  }

  connectedCallback() {
    this.render();
  }

  set productos(arr) {
    if (!Array.isArray(arr)) return;
    this._productos = arr;
    this.render();
  }

  get productos() {
    return this._productos;
  }

  render() {
    this.shadowRoot.innerHTML = '';

    const style = document.createElement('style');
    style.textContent = `
      table {
        width: 90%;
        margin: 30px auto;
        border-collapse: separate;
        border-spacing: 0;
        font-family: 'Segoe UI', Arial, sans-serif;
        background: #f8fafc;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 8px 24px rgba(60, 72, 88, 0.15);
      }

      th, td {
        padding: 14px 18px;
        text-align: center;
      }

      thead {
        background: linear-gradient(90deg, #4c4eaf 0%, #6a82fb 100%);
        color: white;
      }

      tbody tr:nth-child(even) {
        background-color: #eef2fb;
      }

      tbody tr:hover {
        background-color: #dde7fa;
      }

      .btn-delete {
        background: linear-gradient(90deg, #f44336 0%, #ff7961 100%);
        color: white;
        border: none;
        padding: 6px 14px;
        cursor: pointer;
        border-radius: 6px;
        margin-right: 5px;
      }

      .btn-edit {
        background: linear-gradient(90deg, #2196f3 0%, #21cbf3 100%);
        color: white;
        border: none;
        padding: 6px 14px;
        cursor: pointer;
        border-radius: 6px;
      }
    `;

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    thead.innerHTML = `
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Precio en $</th>
        <th>Cantidad</th>
        <th>Descripción</th>
        <th>Acciones</th>
      </tr>
    `;

    this._productos.forEach((producto) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td>${producto.cantidad}</td>
        <td>${producto.descripcion}</td>
        <td>
          <button class="btn-edit" data-id="${producto.id}">Editar</button>
          <button class="btn-delete" data-id="${producto.id}">Eliminar</button>
        </td>
      `;

      tr.querySelector('.btn-delete').addEventListener('click', () => {
        const evento = new CustomEvent('eliminar-producto', {
          detail: producto.id,
          bubbles: true,
          composed: true
        });
        this.dispatchEvent(evento);
      });

      tr.querySelector('.btn-edit').addEventListener('click', () => {
        const evento = new CustomEvent('navegacion', {
          detail: `editar:${producto.id}`,
          bubbles: true,
          composed: true
        });
        this.dispatchEvent(evento);
      });

      tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    this.shadowRoot.append(style, table);
  }
}

customElements.define('lista-productos', ListaProductos);

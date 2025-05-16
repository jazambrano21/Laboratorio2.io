import { productos } from '../app.js';

class EditarProducto extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.producto = null;
  }

  connectedCallback() {
    const id = this.getAttribute('id-producto');
    this.producto = productos.find(p => p.id == id);
    this.render();
    this.setupEventListeners();
  }

  render = () => {
    if (!this.producto) {
      this.shadow.innerHTML = '<p>Producto no encontrado.</p>';
      return;
    }

    this.shadow.innerHTML = `
      <style>
        form {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-width: 400px;
          margin: 1rem auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-family: Arial, sans-serif;
        }

        label {
          font-weight: bold;
        }

        input, textarea {
          padding: 0.5rem;
          font-size: 1rem;
        }

        button {
          padding: 0.5rem;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background-color: #218838;
        }

        .mensaje {
          margin-top: 0.5rem;
          color: green;
        }
      </style>

      <form id="form-editar">
        <label>Nombre: <input type="text" id="nombre" value="${this.producto.nombre}" /></label>
        <label>Precio: <input type="number" id="precio" value="${this.producto.precio}" /></label>
        <label>Cantidad: <input type="number" id="cantidad" value="${this.producto.cantidad}" /></label>
        <label>Descripción: <textarea id="descripcion">${this.producto.descripcion}</textarea></label>
        <button type="submit">Actualizar</button>
        <div class="mensaje" id="mensaje"></div>
      </form>
    `;
  }

  setupEventListeners = () => {
    const form = this.shadow.getElementById('form-editar');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.actualizarProducto();
    });
  }

  actualizarProducto = () => {
    const nombre = this.shadow.getElementById('nombre').value.trim();
    const precio = parseFloat(this.shadow.getElementById('precio').value);
    const cantidad = parseInt(this.shadow.getElementById('cantidad').value);
    const descripcion = this.shadow.getElementById('descripcion').value.trim();
    const mensaje = this.shadow.getElementById('mensaje');

    if (!nombre || isNaN(precio) || isNaN(cantidad) || !descripcion) {
      mensaje.style.color = 'red';
      mensaje.textContent = 'Todos los campos son obligatorios.';
      return;
    }

    this.producto.nombre = nombre;
    this.producto.precio = precio;
    this.producto.cantidad = cantidad;
    this.producto.descripcion = descripcion;

    mensaje.style.color = 'green';
    mensaje.textContent = 'Producto actualizado exitosamente.';
  }
}

customElements.define('editar-producto', EditarProducto);

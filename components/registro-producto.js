import { productos } from '../app.js';

class RegistroProducto extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render = () => {
    this.shadow.innerHTML = `
      <style>
        form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-width: 400px;
          margin: 2rem auto;
          padding: 1.5rem;
          border: 1px solid #ccc;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          background-color: #fdfdfd;
          font-family: Arial, sans-serif;
        }

        label {
          font-weight: bold;
        }

        input, textarea {
          padding: 0.5rem;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 6px;
        }

        button {
          padding: 0.6rem;
          background-color: #007BFF;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
        }

        button:hover {
          background-color: #0056b3;
        }

        .mensaje {
          font-size: 0.9rem;
          color: green;
        }

        .error {
          color: red;
        }
      </style>

      <form id="form-registro">
        <label>Nombre:
          <input type="text" id="nombre" required />
        </label>

        <label>Precio:
          <input type="number" id="precio" required />
        </label>

        <label>Cantidad:
          <input type="number" id="cantidad" required />
        </label>

        <label>Descripción:
          <textarea id="descripcion" rows="3" required></textarea>
        </label>

        <button type="submit">Registrar</button>
        <div id="mensaje" class="mensaje"></div>
      </form>
    `;
  }

  setupEventListeners = () => {
    const form = this.shadow.getElementById('form-registro');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.registrarProducto();
    });
  }

  registrarProducto = () => {
    const nombre = this.shadow.getElementById('nombre').value.trim();
    const precio = parseFloat(this.shadow.getElementById('precio').value);
    const cantidad = parseInt(this.shadow.getElementById('cantidad').value);
    const descripcion = this.shadow.getElementById('descripcion').value.trim();
    const mensaje = this.shadow.getElementById('mensaje');

    if (!nombre || isNaN(precio) || isNaN(cantidad) || !descripcion) {
      mensaje.textContent = 'Todos los campos son obligatorios y deben ser válidos.';
      mensaje.classList.add('error');
      return;
    }

    const nuevoProducto = {
      id: Date.now(),
      nombre,
      precio,
      cantidad,
      descripcion
    };

    productos.push(nuevoProducto);

    mensaje.textContent = 'Producto registrado exitosamente.';
    mensaje.classList.remove('error');

    // Limpiar formulario
    this.shadow.getElementById('form-registro').reset();

    // Redirigir automáticamente a la lista
    setTimeout(() => {
      const evento = new CustomEvent('navegacion', {
        detail: 'lista',
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(evento);
    }, 1000); // Espera 1 segundo para mostrar el mensaje antes de redirigir
  }
}

customElements.define('registro-producto', RegistroProducto);


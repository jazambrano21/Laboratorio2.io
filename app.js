// Estado global compartido entre componentes
export const productos = [];

// Importar los componentes
import './components/menu-navegacion.js';
import './components/registro-producto.js';
import './components/lista-productos.js';
import './components/editar-producto.js';
import './components/footer-app.js';

// Contenedor principal de vistas
const main = document.getElementById('vista-principal');

// Función para mostrar diferentes vistas
const mostrarVista = (vista) => {
  main.innerHTML = '';

  switch (true) {
    case vista === 'inicio':
      main.innerHTML = `<h2 style="text-align:center; font-family:sans-serif;">Bienvenido a la gestión de productos</h2>`;
      break;

    case vista === 'registro':
      main.innerHTML = '<registro-producto></registro-producto>';
      break;

    case vista === 'acerca':
      main.innerHTML = `
        <section style="text-align:center; font-family:sans-serif;">
          <h2>Acerca de</h2>
          <p>Integrantes del equipo:</p>
          <ul style="list-style:none; padding:0;">
            <li>Josue Zambrano</li>
          </ul>
        </section>
      `;
      break;

    case vista === 'lista':
      const lista = document.createElement('lista-productos');
      lista.productos = productos;

      // Escuchar evento de eliminación
      lista.addEventListener('eliminar-producto', (e) => {
        const id = e.detail;
        const index = productos.findIndex(p => p.id == id);
        if (index !== -1) {
          productos.splice(index, 1);
          lista.productos = productos; // Actualizar lista visible
        }
      });

      main.appendChild(lista);
      break;

    case vista.startsWith('editar:'):
      const idEditar = vista.split(':')[1];
      const editor = document.createElement('editar-producto');
      editor.setAttribute('id-producto', idEditar);
      main.appendChild(editor);
      break;

    default:
      main.innerHTML = '<p>Vista no encontrada.</p>';
  }
};

// Escuchar navegación desde componentes (evento personalizado)
window.addEventListener('navegacion', (e) => {
  mostrarVista(e.detail);
});

// Cargar vista inicial
mostrarVista('inicio');

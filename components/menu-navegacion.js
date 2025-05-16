class MenuNavegacion extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        nav {
          background-color: #333;
          color: white;
          padding: 1rem;
          display: flex;
          gap: 1rem;
        }

        button {
          background: none;
          color: white;
          border: none;
          cursor: pointer;
          font-size: 1rem;
        }

        button:hover {
          text-decoration: underline;
        }
      </style>

      <nav>
        <button id="inicio">Inicio</button>
        <button id="registro">Gestión Productos</button>
        <button id="productos">Productos</button>
        <button id="acerca">Acerca de</button>
      </nav>
    `;
  }

  setupEventListeners = () => {
    this.shadow.getElementById('inicio').addEventListener('click', () => {
      this.navegar('inicio');
    });

    this.shadow.getElementById('registro').addEventListener('click', () => {
      this.navegar('registro');
    });

    this.shadow.getElementById('productos').addEventListener('click', () =>{
        this.navegar('lista');
    });

    this.shadow.getElementById('acerca').addEventListener('click', () => {
      this.navegar('acerca');
    });
  }

  navegar = (vista) => {
    const evento = new CustomEvent('navegacion', {
      detail: vista,
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(evento);
  }
}

customElements.define('menu-navegacion', MenuNavegacion);

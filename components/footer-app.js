class FooterApp extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render = () => {
    this.shadow.innerHTML = `
      <style>
        footer {
          background-color: #222;
          color: white;
          text-align: center;
          padding: 1rem;
          font-family: Arial, sans-serif;
          margin-top: 2rem;
        }

        .redes {
          margin-top: 0.5rem;
        }

        a {
          color: #00acee;
          margin: 0 10px;
          text-decoration: none;
          transition: color 0.3s;
        }

        a:hover {
          color: #1da1f2;
        }
      </style>

      <footer>
        <div>© 2025 Aqui se encuentra el repositorio</div>
        <div class="redes">
          <a href="https://github.com/jazambrano21/Laboratorio2.io/tree/main" target="_blank">GitHub</a>
        </div>
      </footer>
    `;
  }
}

customElements.define('footer-app', FooterApp);

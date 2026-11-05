import { $, $$ } from './utils.js';
import * as Home from './views/home.js';
import * as Mascotas from './views/mascotas.js';
import * as Detalle from './views/detalle.js';
import * as Registro from './views/registro.js';
import * as Login from './views/login.js';
import * as ComoAdoptar from './views/comoAdoptar.js';
import * as Nosotros from './views/nosotros.js';
import * as NotFound from './views/notFound.js';

const rutas = {
  '':           Home,
  'mascotas':   Mascotas,
  'mascota':    Detalle,
  'registro':   Registro,
  'login':      Login,
  'como-adoptar': ComoAdoptar,
  'nosotros':   Nosotros
};

export function router(){
  const hash = location.hash.replace(/^#/, '') || '/';
  const partes = hash.split('/').filter(Boolean);
  const ruta = partes[0] || '';
  const param = partes[1];

  const view = rutas[ruta] || NotFound;
  const app = $('#app');

  app.innerHTML = view.render(param);
  if (typeof view.init === 'function') view.init(param);

  // Nav activo
  const rutaActiva = '/' + ruta;
  $$('[data-route]').forEach(a => {
    a.classList.toggle('active', a.dataset.route === (ruta === '' ? '/' : rutaActiva));
  });

  // Cerrar menú móvil
  $('#mobileMenu').classList.remove('open');
  const toggle = $('#navToggle');
  if (toggle) toggle.textContent = '☰';

  window.scrollTo({ top: 0 });
}
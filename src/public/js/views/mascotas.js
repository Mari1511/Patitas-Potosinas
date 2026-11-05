import { MASCOTAS } from '../data.js';
import { petCardHTML } from '../components/petCard.js';
import { EDAD_CATEGORIAS, categoriaEdad, $, $$ } from '../utils.js';

const filtros = { q:'', sexo:'', edad:'', tamano:'', estado:'', orden:'recientes' };

export function render(){
  return `
  <section class="page-head">
    <div class="container">
      <nav class="breadcrumb"><a href="#/">Inicio</a> <span>›</span> <span>Mascotas</span></nav>
      <h1>Mascotas en adopción</h1>
      <p>Encuentra a tu compañero ideal. Usa los filtros para afinar tu búsqueda por sexo, edad, tamaño o estado.</p>
    </div>
  </section>

  <section class="section" style="padding-top:38px;">
    <div class="container">
      <div class="filters">
        <div class="search-row">
          <div class="search-box">
            <span class="icon">🔍</span>
            <input type="search" class="input" id="fQ" placeholder="Buscar por nombre o raza…" />
          </div>
          <select class="input" id="fOrden" style="max-width:230px;">
            <option value="recientes">Ordenar: Recientes</option>
            <option value="nombre">Nombre (A–Z)</option>
            <option value="edad-asc">Edad: menor a mayor</option>
            <option value="edad-desc">Edad: mayor a menor</option>
          </select>
        </div>

        <div class="filter-grid">
          <div>
            <label class="filter-label" for="fSexo">Sexo</label>
            <select class="input" id="fSexo">
              <option value="">Todos</option>
              <option value="Hembra">Hembra</option>
              <option value="Macho">Macho</option>
            </select>
          </div>
          <div>
            <label class="filter-label" for="fEdad">Edad</label>
            <select class="input" id="fEdad">
              <option value="">Todas</option>
              ${EDAD_CATEGORIAS.map(c => `<option value="${c.key}">${c.label}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="filter-label" for="fTamano">Tamaño</label>
            <select class="input" id="fTamano">
              <option value="">Todos</option>
              <option value="Pequeño">Pequeño</option>
              <option value="Mediano">Mediano</option>
              <option value="Grande">Grande</option>
            </select>
          </div>
          <div>
            <label class="filter-label" for="fEstado">Estado</label>
            <select class="input" id="fEstado">
              <option value="">Todos</option>
              <option value="Disponible">Disponible</option>
              <option value="En proceso">En proceso</option>
              <option value="Adoptado">Adoptado</option>
            </select>
          </div>
        </div>

        <div class="filter-actions">
          <span class="results-count" id="resultsCount"></span>
          <button class="link-clear" id="clearFilters" type="button">Limpiar filtros ✕</button>
        </div>
      </div>

      <div id="petsResults"></div>
    </div>
  </section>
  `;
}

export function init(){
  // Restaurar valores
  $('#fQ').value = filtros.q;
  $('#fSexo').value = filtros.sexo;
  $('#fEdad').value = filtros.edad;
  $('#fTamano').value = filtros.tamano;
  $('#fEstado').value = filtros.estado;
  $('#fOrden').value = filtros.orden;

  const update = () => {
    filtros.q = $('#fQ').value;
    filtros.sexo = $('#fSexo').value;
    filtros.edad = $('#fEdad').value;
    filtros.tamano = $('#fTamano').value;
    filtros.estado = $('#fEstado').value;
    filtros.orden = $('#fOrden').value;
    aplicarFiltros();
  };

  $('#fQ').addEventListener('input', update);
  ['#fSexo','#fEdad','#fTamano','#fEstado','#fOrden'].forEach(sel => {
    $(sel).addEventListener('change', update);
  });

  $('#clearFilters').addEventListener('click', () => {
    Object.assign(filtros, { q:'', sexo:'', edad:'', tamano:'', estado:'', orden:'recientes' });
    $('#fQ').value = '';
    $('#fSexo').value = '';
    $('#fEdad').value = '';
    $('#fTamano').value = '';
    $('#fEstado').value = '';
    $('#fOrden').value = 'recientes';
    aplicarFiltros();
  });

  aplicarFiltros();
}

function aplicarFiltros(){
  const q = filtros.q.trim().toLowerCase();
  let lista = MASCOTAS.filter(m => {
    const okQ = !q || m.nombre.toLowerCase().includes(q) || m.raza.toLowerCase().includes(q);
    const okSexo = !filtros.sexo || m.sexo === filtros.sexo;
    const okEdad = !filtros.edad || categoriaEdad(m) === filtros.edad;
    const okTam = !filtros.tamano || m.tamano === filtros.tamano;
    const okEst = !filtros.estado || m.estado === filtros.estado;
    return okQ && okSexo && okEdad && okTam && okEst;
  });

  const edadNum = m => m.unidad === 'años' ? m.edad : m.edad / 12;
  if (filtros.orden === 'nombre') lista.sort((a,b) => a.nombre.localeCompare(b.nombre));
  if (filtros.orden === 'edad-asc') lista.sort((a,b) => edadNum(a) - edadNum(b));
  if (filtros.orden === 'edad-desc') lista.sort((a,b) => edadNum(b) - edadNum(a));

  const cont = $('#petsResults');
  const count = $('#resultsCount');

  if (count){
    count.innerHTML = `Mostrando <strong>${lista.length}</strong> de <strong>${MASCOTAS.length}</strong> peluditos`;
  }

  if (!lista.length){
    cont.innerHTML = `
      <div class="empty">
        <div class="emoji">🐕‍🦺</div>
        <h3>No encontramos peluditos con esos filtros</h3>
        <p>Intenta ampliar tu búsqueda o limpiar los filtros para ver todas las mascotas disponibles.</p>
        <button class="btn btn-primary" id="emptyReset" type="button">Ver todas las mascotas</button>
      </div>`;
    $('#emptyReset').addEventListener('click', () => {
      Object.assign(filtros, { q:'', sexo:'', edad:'', tamano:'', estado:'', orden:'recientes' });
      $('#fQ').value = '';
      $('#fSexo').value = '';
      $('#fEdad').value = '';
      $('#fTamano').value = '';
      $('#fEstado').value = '';
      $('#fOrden').value = 'recientes';
      aplicarFiltros();
    });
    return;
  }

  cont.innerHTML = `<div class="pets-grid">${lista.map(petCardHTML).join('')}</div>`;
}
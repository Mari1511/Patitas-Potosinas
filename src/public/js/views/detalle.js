import { MASCOTAS } from '../data.js';
import { refugioDe } from '../components/petCard.js';
import { edadTexto, claseEstado, $, $$ } from '../utils.js';
import { abrirModalAdopcion } from '../modals/adopcion.js';

export function render(id){
  const m = MASCOTAS.find(x => String(x.id) === String(id));
  if (!m){
    return `
      <section class="section">
        <div class="container">
          <div class="empty">
            <div class="emoji">🐾</div>
            <h3>No encontramos esta mascota</h3>
            <p>Puede que ya haya sido adoptada o que el enlace sea incorrecto.</p>
            <a href="#/mascotas" class="btn btn-primary">Ver todas las mascotas</a>
          </div>
        </div>
      </section>`;
  }

  const r = refugioDe(m);
  const galeria = [
    m.img,
    m.img.replace('w=900','w=901'),
    m.img.replace('w=900','w=902'),
    m.img.replace('w=900','w=903')
  ];
  const salud = [
    { ok:m.vacunas,       txt:'Vacunas al día' },
    { ok:m.esterilizado,  txt:'Esterilizado/a' },
    { ok:m.desparasitado, txt:'Desparasitado/a' },
    { ok:m.microchip,     txt:'Con microchip' }
  ];

  return `
  <section class="page-head">
    <div class="container">
      <nav class="breadcrumb">
        <a href="#/">Inicio</a> <span>›</span>
        <a href="#/mascotas">Mascotas</a> <span>›</span>
        <span>${m.nombre}</span>
      </nav>
      <h1>${m.nombre}</h1>
      <p>${m.raza} · ${edadTexto(m)} · ${m.sexo} · ${m.tamano}</p>
    </div>
  </section>

  <div class="container detail-layout">
    <div>
      <div class="gallery-main">
        <img id="mainPhoto" src="${galeria[0]}" alt="${m.nombre}">
        <span class="badge ${claseEstado(m.estado)}" style="top:16px;left:16px;">${m.estado}</span>
      </div>
      <div class="gallery-thumbs" id="thumbs">
        ${galeria.map((g,i) => `
          <button class="gallery-thumb ${i===0?'active':''}" data-src="${g}" type="button" aria-label="Foto ${i+1}">
            <img src="${g}" alt="${m.nombre} foto ${i+1}">
          </button>`).join('')}
      </div>

      <div class="detail-card">
        <h2>Sobre ${m.nombre}</h2>
        <p>${m.descripcion}</p>
        ${m.historia ? `<p style="margin-top:14px;font-size:.87rem;color:var(--muted);font-style:italic;">📖 ${m.historia}</p>` : ''}
      </div>

      <div class="detail-card">
        <h2>Ficha de ${m.nombre}</h2>
        <div class="info-grid">
          <div class="info-item"><span class="lbl">Raza</span><span class="val">${m.raza}</span></div>
          <div class="info-item"><span class="lbl">Edad</span><span class="val">${edadTexto(m)}</span></div>
          <div class="info-item"><span class="lbl">Sexo</span><span class="val">${m.sexo}</span></div>
          <div class="info-item"><span class="lbl">Tamaño</span><span class="val">${m.tamano}</span></div>
          <div class="info-item"><span class="lbl">Peso aprox.</span><span class="val">${m.peso}</span></div>
          <div class="info-item"><span class="lbl">Color</span><span class="val">${m.color}</span></div>
        </div>
      </div>

      <div class="detail-card">
        <h2>Estado de salud</h2>
        <div class="health-list">
          ${salud.map(s => `
            <div class="health-item">
              <span class="tick ${s.ok ? '' : 'no'}">${s.ok ? '✓' : '–'}</span>
              ${s.txt}${s.ok ? '' : ' <span style="color:var(--muted);font-weight:600;">(pendiente)</span>'}
            </div>`).join('')}
        </div>
      </div>

      ${m.tags && m.tags.length ? `
      <div class="detail-card">
        <h2>Personalidad</h2>
        <div class="tag-row">
          ${m.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>` : ''}
    </div>

    <aside class="detail-aside">
      <div class="aside-card">
        <div class="aside-title">${m.nombre}</div>
        <div class="aside-breed">${m.raza} · ${m.tamano}</div>
        <div class="aside-status">
          <span class="badge ${claseEstado(m.estado)}" style="position:static;display:inline-block;">${m.estado}</span>
        </div>
        <div class="price-note">
          <span class="ic">💚</span>
          <span>La adopción es <strong>completamente gratuita</strong>. Solo pedimos compromiso y amor.</span>
        </div>
        ${m.estado === 'Adoptado'
          ? `<button class="btn btn-ghost btn-block btn-lg" disabled>Ya fue adoptado 🏡</button>`
          : `<button class="btn btn-primary btn-block btn-lg" id="btnSolicitar">Solicitar adopción</button>`}
        <a href="#/mascotas" class="btn btn-ghost btn-block" style="margin-top:10px;">Ver más mascotas</a>
      </div>

      <div class="aside-card">
        <h2 style="font-size:1.1rem;margin-bottom:16px;">Refugio responsable</h2>
        <div class="shelter-box">
          <div class="shelter-avatar">🏠</div>
          <div>
            <strong>${r.nombre}</strong>
            <small>📍 ${r.ciudad}</small>
            <small>📞 ${r.tel}</small>
            <small>✉️ ${r.correo}</small>
          </div>
        </div>
      </div>

      <div class="aside-card" style="background:var(--sand);border-color:transparent;">
        <h2 style="font-size:1.05rem;margin-bottom:12px;">🔒 Adopción segura</h2>
        <p style="font-size:.88rem;color:var(--muted);">
          Todos los refugios están verificados por Patitas Potosinas. Nunca realices pagos
          por una adopción.
        </p>
      </div>
    </aside>
  </div>
  `;
}

export function init(id){
  const m = MASCOTAS.find(x => String(x.id) === String(id));
  if (!m) return;

  const main = $('#mainPhoto');
  $$('#thumbs .gallery-thumb').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('#thumbs .gallery-thumb').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      main.src = btn.dataset.src;
    });
  });

  const btn = $('#btnSolicitar');
  if (btn) btn.addEventListener('click', () => abrirModalAdopcion(m));
}
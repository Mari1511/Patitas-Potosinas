import { REFUGIOS } from '../data.js';

export function render(){
  const refugios = Object.values(REFUGIOS);
  return `
  <section class="page-head">
    <div class="container">
      <nav class="breadcrumb"><a href="#/">Inicio</a> <span>›</span> <span>Nosotros</span></nav>
      <h1>Sobre Patitas Potosinas</h1>
      <p>Somos una iniciativa ciudadana sin fines de lucro que conecta refugios potosinos con familias adoptantes.</p>
    </div>
  </section>

  <section class="section">
    <div class="container" style="display:grid;grid-template-columns:1.1fr 1fr;gap:52px;align-items:center;">
      <div>
        <span class="section-tag">Nuestra misión</span>
        <h2 style="font-size:2rem;margin-bottom:20px;">Menos perros en la calle, más familias felices</h2>
        <p style="color:var(--muted);margin-bottom:18px;">
          En San Luis Potosí miles de perros viven en situación de calle o en refugios saturados.
          Patitas Potosinas nació en 2023 para digitalizar y transparentar el proceso de adopción,
          dándole visibilidad a cada peludito que busca hogar.
        </p>
        <p style="color:var(--muted);margin-bottom:28px;">
          Trabajamos de la mano con refugios locales, veterinarias y voluntarios para garantizar
          adopciones responsables, con seguimiento y acompañamiento real.
        </p>
        <div class="hero-stats">
          <div class="hero-stat"><strong>3,200+</strong><span>Usuarios registrados</span></div>
          <div class="hero-stat"><strong>5</strong><span>Refugios aliados</span></div>
          <div class="hero-stat"><strong>480+</strong><span>Adopciones exitosas</span></div>
        </div>
      </div>
      <div style="border-radius:var(--radius-xl);overflow:hidden;box-shadow:var(--shadow-lg);aspect-ratio:4/3.6;background:var(--sand);">
        <img src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=75"
             alt="Equipo de voluntarios con perros" style="width:100%;height:100%;object-fit:cover;">
      </div>
    </div>
  </section>

  <section class="section section-sand">
    <div class="container">
      <div class="section-head center">
        <span class="section-tag">Aliados</span>
        <h2>Refugios que confían en nosotros</h2>
      </div>
      <div class="pets-grid" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr));">
        ${refugios.map(r => `
          <div class="step" style="text-align:left;">
            <div class="step-num">🏠</div>
            <h3 style="font-size:1.05rem;">${r.nombre}</h3>
            <p style="font-size:.88rem;">📍 ${r.ciudad}<br>📞 ${r.tel}</p>
          </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="cta-banner">
        <h2>¿Quieres ser voluntario?</h2>
        <p>Ayúdanos con traslados, fotografía, hogares temporales o difusión. Toda ayuda cuenta. 🧡</p>
        <div class="cta-actions">
          <a href="#/registro" class="btn btn-white btn-lg">Quiero ayudar</a>
          <a href="#/mascotas" class="btn btn-outline-white btn-lg">Ver mascotas</a>
        </div>
      </div>
    </div>
  </section>
  `;
}

export function init(){}
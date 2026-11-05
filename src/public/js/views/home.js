import { MASCOTAS } from '../data.js';
import { petCardHTML } from '../components/petCard.js';

export function render(){
  const destacadas = MASCOTAS.filter(m => m.estado === 'Disponible').slice(0, 6);
  const disponibles = MASCOTAS.filter(m => m.estado === 'Disponible').length;
  const adoptados  = MASCOTAS.filter(m => m.estado === 'Adoptado').length;

  return `
  <section class="hero">
    <div class="container hero-grid">
      <div>
        <span class="eyebrow"><span class="dot"></span> Adopción responsable en San Luis Potosí</span>
        <h1>Encuentra a tu <em>mejor amigo</em> y cambia dos vidas</h1>
        <p class="hero-sub">
          Somos la plataforma que conecta a perritos rescatados de refugios potosinos
          con familias responsables. Adopta, no compres. 🧡
        </p>
        <div class="hero-actions">
          <a href="#/mascotas" class="btn btn-primary btn-lg">Ver mascotas 🐾</a>
          <a href="#/como-adoptar" class="btn btn-ghost btn-lg">Cómo funciona</a>
        </div>
        <div class="hero-stats">
          <div class="hero-stat"><strong>${MASCOTAS.length}+</strong><span>Peluditos registrados</span></div>
          <div class="hero-stat"><strong>${disponibles}</strong><span>Listos para adoptar</span></div>
          <div class="hero-stat"><strong>${adoptados}</strong><span>Finales felices</span></div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-blob"></div>
        <div class="hero-photo">
          <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=75" alt="Perrito esperando ser adoptado">
        </div>
        <div class="float-card fc-1">
          <div class="fc-icon">🏠</div>
          <div><strong>5 refugios aliados</strong><small>En todo el estado</small></div>
        </div>
        <div class="float-card fc-2">
          <div class="fc-icon">💚</div>
          <div><strong>100% verificado</strong><small>Mascotas vacunadas</small></div>
        </div>
      </div>
    </div>
  </section>

  <section class="trust-band">
    <div class="container trust-inner">
      <div class="trust-item"><span class="ti">🩺</span> Revisiones veterinarias</div>
      <div class="trust-item"><span class="ti">💉</span> Vacunas al día</div>
      <div class="trust-item"><span class="ti">🏡</span> Seguimiento post-adopción</div>
      <div class="trust-item"><span class="ti">🤝</span> Refugios verificados</div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head center">
        <span class="section-tag">Proceso simple</span>
        <h2>¿Cómo funciona la adopción?</h2>
        <p>Tres pasos para darle un hogar a un peludito que lo necesita.</p>
      </div>
      <div class="steps">
        <article class="step">
          <div class="step-num">1</div>
          <h3>Explora y filtra</h3>
          <p>Navega el catálogo de mascotas y usa los filtros por edad, tamaño, sexo o refugio para encontrar a tu compañero ideal.</p>
        </article>
        <article class="step">
          <div class="step-num">2</div>
          <h3>Solicita adopción</h3>
          <p>Envía tu solicitud desde la ficha del peludito. El refugio revisará tu perfil y se pondrá en contacto contigo en 48 horas.</p>
        </article>
        <article class="step">
          <div class="step-num">3</div>
          <h3>¡Bienvenido a casa!</h3>
          <p>Firma el compromiso de adopción, agenda la entrega y comienza la aventura. Damos seguimiento durante los primeros meses.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section section-sand">
    <div class="container">
      <div class="section-head" style="display:flex;justify-content:space-between;align-items:flex-end;gap:24px;max-width:none;flex-wrap:wrap;">
        <div style="max-width:560px;">
          <span class="section-tag">En adopción</span>
          <h2>Ellos buscan una familia</h2>
          <p>Conoce a algunos de los peluditos que están esperando su hogar definitivo.</p>
        </div>
        <a href="#/mascotas" class="btn btn-ghost">Ver todas →</a>
      </div>
      <div class="pets-grid">
        ${destacadas.map(petCardHTML).join('')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head center">
        <span class="section-tag">Adopta, no compres</span>
        <h2>¿Por qué adoptar?</h2>
      </div>
      <div class="steps">
        <article class="step">
          <div class="step-num">💚</div>
          <h3>Salvas una vida</h3>
          <p>Cada adopción libera un lugar en el refugio para otro perrito que lo necesita desesperadamente.</p>
        </article>
        <article class="step">
          <div class="step-num">🩺</div>
          <h3>Llegan sanos</h3>
          <p>Todos nuestros peluditos se entregan vacunados, desparasitados y con revisión veterinaria completa.</p>
        </article>
        <article class="step">
          <div class="step-num">🤝</div>
          <h3>Te acompañamos</h3>
          <p>Damos seguimiento post-adopción y te asesoramos durante el proceso de adaptación en casa.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section" style="padding-top:0;">
    <div class="container">
      <div class="cta-banner">
        <h2>¿Listo para adoptar?</h2>
        <p>Crea tu cuenta gratis, guarda tus favoritos y envía solicitudes de adopción en minutos.</p>
        <div class="cta-actions">
          <a href="#/registro" class="btn btn-white btn-lg">Crear mi cuenta</a>
          <a href="#/mascotas" class="btn btn-outline-white btn-lg">Explorar mascotas</a>
        </div>
      </div>
    </div>
  </section>
  `;
}

export function init(){ /* nada */ }
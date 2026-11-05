import { $, $$, toast, validarFormulario } from '../utils.js';

export function render(){
  return `
  <section class="auth-wrap">
    <div class="container" style="max-width:520px;">
      <div class="auth-panel fade-in">
        <h1>Inicia sesión</h1>
        <p class="lead">Bienvenido de vuelta. Continúa tu proceso de adopción.</p>

        <form id="loginForm" novalidate>
          <div class="field">
            <label for="lCorreo">Correo electrónico *</label>
            <input class="input" id="lCorreo" type="email" placeholder="ana@correo.com" required />
            <span class="err">Ingresa un correo válido.</span>
          </div>

          <div class="field">
            <label for="lPass">Contraseña *</label>
            <div class="pass-wrap">
              <input class="input" id="lPass" type="password" placeholder="Tu contraseña" required />
              <button type="button" class="pass-toggle" data-target="lPass" aria-label="Mostrar contraseña">👁</button>
            </div>
            <span class="err">Ingresa tu contraseña.</span>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:22px;flex-wrap:wrap;gap:10px;">
            <label class="check-row" style="margin:0;">
              <input type="checkbox" checked />
              <span>Recordarme</span>
            </label>
            <a href="#" style="font-size:.87rem;font-weight:800;color:var(--primary);">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" class="btn btn-primary btn-block btn-lg">Entrar</button>
        </form>

        <div class="switch-line">
          ¿No tienes cuenta? <a href="#/registro">Regístrate gratis</a>
        </div>
      </div>
    </div>
  </section>
  `;
}

export function init(){
  const form = $('#loginForm');
  if (!form) return;

  $$('.pass-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      input.type = input.type === 'password' ? 'text' : 'password';
      btn.textContent = input.type === 'password' ? '👁' : '🙈';
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validarFormulario(form)){ toast('Revisa los campos marcados', 'err'); return; }
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Entrando…';
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Entrar';
      toast('Sesión iniciada correctamente ✓', 'ok');
    }, 900);
  });
}
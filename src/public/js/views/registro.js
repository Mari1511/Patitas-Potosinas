import { $, $$, toast, validarFormulario } from '../utils.js';

export function render(){
  return `
  <section class="auth-wrap">
    <div class="container auth-grid">
      <div class="auth-panel fade-in">
        <h1>Crea tu cuenta</h1>
        <p class="lead">Regístrate gratis para guardar favoritos y enviar solicitudes de adopción.</p>

        <form id="registroForm" novalidate>
          <div class="form-row">
            <div class="field">
              <label for="rNombre">Nombre(s) *</label>
              <input class="input" id="rNombre" placeholder="Ana" required />
              <span class="err">Ingresa tu nombre.</span>
            </div>
            <div class="field">
              <label for="rApellido">Apellidos *</label>
              <input class="input" id="rApellido" placeholder="Martínez Ruiz" required />
              <span class="err">Ingresa tus apellidos.</span>
            </div>
          </div>

          <div class="field">
            <label for="rCorreo">Correo electrónico *</label>
            <input class="input" id="rCorreo" type="email" placeholder="ana@correo.com" required />
            <span class="err">Ingresa un correo electrónico válido.</span>
          </div>

          <div class="form-row">
            <div class="field">
              <label for="rTel">Teléfono *</label>
              <input class="input" id="rTel" placeholder="444 123 4567" required />
              <span class="err">Ingresa tu teléfono.</span>
            </div>
            <div class="field">
              <label for="rCiudad">Ciudad *</label>
              <input class="input" id="rCiudad" placeholder="San Luis Potosí" required />
              <span class="err">Ingresa tu ciudad.</span>
            </div>
          </div>

          <div class="field">
            <label for="rPass">Contraseña *</label>
            <div class="pass-wrap">
              <input class="input" id="rPass" type="password" placeholder="Mínimo 8 caracteres" required />
              <button type="button" class="pass-toggle" data-target="rPass" aria-label="Mostrar contraseña">👁</button>
            </div>
            <div class="strength" id="strength"><i></i><i></i><i></i><i></i></div>
            <div class="hint" id="passHint">Usa al menos 8 caracteres, una mayúscula y un número.</div>
            <span class="err">La contraseña no cumple los requisitos.</span>
          </div>

          <div class="field">
            <label for="rPass2">Confirmar contraseña *</label>
            <div class="pass-wrap">
              <input class="input" id="rPass2" type="password" placeholder="Repite tu contraseña" required />
              <button type="button" class="pass-toggle" data-target="rPass2" aria-label="Mostrar contraseña">👁</button>
            </div>
            <span class="err">Las contraseñas no coinciden.</span>
          </div>

          <label class="check-row">
            <input type="checkbox" id="rTerminos" required />
            <span>Acepto los <a href="#">términos y condiciones</a> y el <a href="#">aviso de privacidad</a>
            de Patitas Potosinas. *</span>
          </label>

          <label class="check-row">
            <input type="checkbox" id="rNotif" checked />
            <span>Quiero recibir notificaciones sobre nuevos peluditos en adopción.</span>
          </label>

          <button type="submit" class="btn btn-primary btn-block btn-lg">Crear mi cuenta</button>
        </form>

        <div class="switch-line">
          ¿Ya tienes cuenta? <a href="#/login">Inicia sesión</a>
        </div>
      </div>

      <aside class="auth-side fade-in">
        <h2>Únete a la comunidad 🐾</h2>
        <p>Más de 3,200 potosinos ya forman parte de Patitas Potosinas.</p>

        <div class="benefit">
          <div class="bi">❤️</div>
          <div><strong>Guarda tus favoritos</strong><span>Marca los peluditos que te enamoren y encuéntralos después fácilmente.</span></div>
        </div>
        <div class="benefit">
          <div class="bi">⚡</div>
          <div><strong>Solicitudes en 1 clic</strong><span>Tus datos se llenan automáticamente al solicitar una adopción.</span></div>
        </div>
        <div class="benefit">
          <div class="bi">🔔</div>
          <div><strong>Alertas personalizadas</strong><span>Te avisamos cuando llegue un peludito que coincida con lo que buscas.</span></div>
        </div>
        <div class="benefit">
          <div class="bi">📋</div>
          <div><strong>Seguimiento</strong><span>Consulta el estado de tus solicitudes en tiempo real.</span></div>
        </div>
      </aside>
    </div>
  </section>
  `;
}

export function init(){
  const form = $('#registroForm');
  if (!form) return;

  $$('.pass-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      input.type = input.type === 'password' ? 'text' : 'password';
      btn.textContent = input.type === 'password' ? '👁' : '🙈';
    });
  });

  const pass = $('#rPass');
  const strength = $('#strength');
  pass.addEventListener('input', () => {
    const v = pass.value;
    let score = 0;
    if (v.length >= 8) score++;
    if (/[A-Z]/.test(v)) score++;
    if (/[0-9]/.test(v)) score++;
    if (/[^A-Za-z0-9]/.test(v)) score++;
    strength.className = 'strength' + (v ? ' s' + score : '');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = validarFormulario(form);

    const passVal = pass.value;
    const pass2 = $('#rPass2').value;
    const passField = pass.closest('.field');
    const pass2Field = $('#rPass2').closest('.field');

    if (!(passVal.length >= 8 && /[A-Z]/.test(passVal) && /[0-9]/.test(passVal))){
      passField.classList.add('invalid');
      ok = false;
    }
    if (passVal !== pass2){
      pass2Field.classList.add('invalid');
      ok = false;
    }
    if (!$('#rTerminos').checked){
      ok = false;
      toast('Debes aceptar los términos y condiciones', 'err');
    }

    if (!ok){ toast('Revisa los campos marcados en rojo', 'err'); return; }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Creando cuenta…';

    // TODO: POST a microservicio de usuarios
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Crear mi cuenta';
      toast('¡Cuenta creada! Bienvenido a Patitas Potosinas 🐾', 'ok');
      setTimeout(() => { location.hash = '#/mascotas'; }, 900);
    }, 1100);
  });
}
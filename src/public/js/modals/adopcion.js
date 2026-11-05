import { $, validarFormulario, toast, edadTexto } from '../utils.js';
import { refugioDe } from '../components/petCard.js';

export function abrirModalAdopcion(m){
  const r = refugioDe(m);
  const root = $('#modalRoot');
  root.innerHTML = '<div class="modal-overlay" id="overlay"><div class="modal" role="dialog" aria-modal="true" aria-label="Solicitar adopción">' +
    '<div class="modal-head"><h3>Solicitar adopción</h3><button class="modal-close" id="modalClose" aria-label="Cerrar">✕</button></div>' +
    '<div class="modal-body">' +
      '<div class="modal-pet"><img src="' + m.img + '" alt="' + m.nombre + '"><div><strong>' + m.nombre + '</strong><small>' + m.raza + ' · ' + edadTexto(m) + ' · ' + m.sexo + '</small></div></div>' +
      '<form id="adopForm" novalidate>' +
        '<div class="form-row">' +
          '<div class="field"><label for="aNombre">Nombre completo *</label><input class="input" id="aNombre" placeholder="Ana Martínez" required><span class="err">Ingresa tu nombre completo.</span></div>' +
          '<div class="field"><label for="aTel">Teléfono *</label><input class="input" id="aTel" placeholder="444 123 4567" required><span class="err">Ingresa un teléfono de contacto.</span></div>' +
        '</div>' +
        '<div class="field"><label for="aCorreo">Correo electrónico *</label><input class="input" id="aCorreo" type="email" placeholder="ana@correo.com" required><span class="err">Ingresa un correo válido.</span></div>' +
        '<div class="form-row">' +
          '<div class="field"><label for="aCiudad">Ciudad *</label><input class="input" id="aCiudad" placeholder="San Luis Potosí" required><span class="err">Ingresa tu ciudad.</span></div>' +
          '<div class="field"><label for="aVivienda">Tipo de vivienda *</label><select class="input" id="aVivienda" required><option value="">Selecciona…</option><option>Casa con patio</option><option>Casa sin patio</option><option>Departamento</option><option>Otro</option></select><span class="err">Selecciona una opción.</span></div>' +
        '</div>' +
        '<div class="field"><label for="aMensaje">¿Por qué quieres adoptar a ' + m.nombre + '?</label><textarea class="input" id="aMensaje" rows="3" placeholder="Cuéntanos un poco sobre ti…" style="resize:vertical;min-height:88px;"></textarea></div>' +
        '<label class="check-row"><input type="checkbox" id="aAcepto" required><span>Acepto el proceso de adopción y entiendo que el refugio <strong>' + r.nombre + '</strong> se pondrá en contacto conmigo para una entrevista.</span></label>' +
        '<button type="submit" class="btn btn-primary btn-block btn-lg">Enviar solicitud</button>' +
      '</form>' +
    '</div></div></div>';

  const overlay = $('#overlay');
  const cerrar = () => { root.innerHTML = ''; document.body.style.overflow = ''; };
  document.body.style.overflow = 'hidden';

  $('#modalClose').addEventListener('click', cerrar);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) cerrar(); });
  document.addEventListener('keydown', function esc(e){
    if (e.key === 'Escape'){ cerrar(); document.removeEventListener('keydown', esc); }
  });

  $('#adopForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validarFormulario(e.target)){ toast('Revisa los campos marcados', 'err'); return; }
    const nombre = $('#aNombre').value.trim();
    $('.modal-body', overlay).innerHTML = '<div class="success-box"><div class="success-icon">✓</div><h3>¡Solicitud enviada!</h3><p>Gracias, <strong>' + nombre + '</strong>. Tu solicitud para adoptar a <strong>' + m.nombre + '</strong> fue enviada a <strong>' + r.nombre + '</strong>. Te contactarán en 48 horas.</p><div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;"><a href="#/mascotas" class="btn btn-ghost" id="verMasBtn">Ver más mascotas</a><button class="btn btn-primary" id="cerrarOk">Entendido</button></div></div>';
    $('#cerrarOk').addEventListener('click', cerrar);
    const vm = $('#verMasBtn'); if (vm) vm.addEventListener('click', cerrar);
    toast('Solicitud de adopción enviada 🐾', 'ok');
  });
}
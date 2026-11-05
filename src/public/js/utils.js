import { FALLBACK_IMG } from './data.js';

export const $  = (sel, ctx = document) => ctx.querySelector(sel);
export const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

export const EDAD_CATEGORIAS = [
  { key:'cachorro', label:'Cachorro (menos de 1 año)' },
  { key:'joven',    label:'Joven (1 a 3 años)' },
  { key:'adulto',   label:'Adulto (4 a 7 años)' },
  { key:'senior',   label:'Senior (8 años o más)' }
];

export function categoriaEdad(m){
  const anios = m.unidad === 'años' ? m.edad : m.edad / 12;
  if (anios < 1) return 'cachorro';
  if (anios <= 3) return 'joven';
  if (anios <= 7) return 'adulto';
  return 'senior';
}

export function edadTexto(m){ return m.edad + ' ' + m.unidad; }

export function mascotaPorId(id){
  // import dinámico para evitar ciclos
  return window.__MASCOTAS__?.find(m => String(m.id) === String(id));
}

export function claseEstado(estado){
  if (estado === 'Disponible') return 'badge-disponible';
  if (estado === 'En proceso') return 'badge-proceso';
  return 'badge-adoptado';
}

export function iconoSexo(sexo){ return sexo === 'Hembra' ? '♀' : '♂'; }

export function toast(msg, tipo = 'ok'){
  const wrap = $('#toastWrap');
  if (!wrap) return;
  const el = document.createElement('div');
  el.className = 'toast ' + tipo;
  el.innerHTML = `<span>${tipo === 'ok' ? '✓' : '⚠'}</span><span>${msg}</span>`;
  wrap.appendChild(el);
  setTimeout(() => {
    el.classList.add('out');
    setTimeout(() => el.remove(), 300);
  }, 3400);
}

export function validarFormulario(form){
  let ok = true;
  $$('.field', form).forEach(f => f.classList.remove('invalid'));
  $$('input[required], select[required], textarea[required]', form).forEach(el => {
    const field = el.closest('.field');
    let valido = el.type === 'checkbox' ? el.checked : el.value.trim() !== '';
    if (valido && el.type === 'email'){
      valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
    }
    if (!valido){
      ok = false;
      if (field) field.classList.add('invalid');
    }
  });
  return ok;
}

export { FALLBACK_IMG };
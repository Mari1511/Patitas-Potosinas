import { REFUGIOS } from '../data.js';
import { edadTexto, claseEstado, iconoSexo } from '../utils.js';

export function refugioDe(m){
  return REFUGIOS[m.refugio] || { nombre:'Refugio aliado', ciudad:'San Luis Potosí, SLP', tel:'—', correo:'—' };
}

export function petCardHTML(m){
  const r = refugioDe(m);
  return `
    <article class="pet-card fade-in">
      <a href="#/mascota/${m.id}" class="pet-photo" aria-label="Ver detalles de ${m.nombre}">
        <img src="${m.img}" alt="${m.nombre}, ${m.raza}">
        <span class="badge ${claseEstado(m.estado)}">${m.estado}</span>
        <button class="pet-fav" type="button" data-fav="${m.id}"
                aria-label="Guardar en favoritos">🤍</button>
      </a>
      <div class="pet-body">
        <div class="pet-title-row">
          <h3 class="pet-name">${m.nombre}</h3>
          <span class="pet-age">${edadTexto(m)}</span>
        </div>
        <div class="pet-meta">
          <span class="chip">${iconoSexo(m.sexo)} ${m.sexo}</span>
          <span class="chip">🐕 ${m.raza}</span>
          <span class="chip">📏 ${m.tamano}</span>
        </div>
        <div class="pet-shelter">
          <span class="pin">📍</span> ${r.nombre} · ${r.ciudad.split(',')[0]}
        </div>
        <a href="#/mascota/${m.id}" class="btn btn-primary btn-block btn-sm">Ver detalles</a>
      </div>
    </article>
  `;
}

export function toggleFav(btn){
  btn.classList.toggle('on');
  btn.textContent = btn.classList.contains('on') ? '❤️' : '🤍';
}
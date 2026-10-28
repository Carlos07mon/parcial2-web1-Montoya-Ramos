// js/logica.js · Funciones puras. Aquí NO aparece document, fetch ni localStorage.

// R4 · Devuelve los episodios cuyo name contiene `texto` (sin importar mayúsculas ni espacios
// al inicio o al final) y cuyo código episode (S01E01…) empieza por `temporada`.
// temporada === '' significa «todas las temporadas».
export const filtrarEpisodios = (lista, { texto, temporada }) => {

  return lista.filter((episodio) => {

    const nombreCoincide = episodio.name
      .toLowerCase()
      .includes(texto.trim().toLowerCase());

    const temporadaCoincide = episodio.episode.startsWith(temporada);

    return nombreCoincide && temporadaCoincide;

  });
};

// R5 · Suma la cantidad de personajes (characters.length) de todos los episodios de la lista.
// Usa reduce.
export const contarPersonajes = (lista) => {

  const total = lista.reduce((suma, episodio) => {
    return suma + episodio.characters.length;
  }, 0);

  return total;
};

// R6 · Si id está en ids, devuelve un array NUEVO sin él; si no está, un array NUEVO con él.
// No modifiques el array que recibes.
export const alternarId = (ids, id) => {
  // TODO
};
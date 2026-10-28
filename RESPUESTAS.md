# Parcial 2 · Respuestas de razonamiento

Nombre:

Son cuatro preguntas de 5 puntos sobre código que ya conoces. Para cada una:

1. Lee el código y escribe primero lo que **crees** que pasa.
2. Compruébalo: pégalo en la consola de DevTools (F12 → Console) con tu página del parcial abierta en Live Server. En esa consola sí se puede usar `await` fuera de una función.
3. Escribe tu respuesta debajo de cada letra: (a), (b), (c)…

Se califica la explicación, no solo el resultado: con dos o tres frases por letra es suficiente. Escríbela con tus palabras, porque te la pueden preguntar.

## P1 · ¿En qué orden se imprime? (5 puntos)

**Lo viste en:** la función `cargar` del Explorador (semana 8): «await pausa ESTA función, no el navegador».

```js
console.log('1');
setTimeout(() => console.log('2'), 0);
const cargar = async () => {
  console.log('3');
  const respuesta = await fetch('https://rickandmortyapi.com/api/episode/1');
  console.log('4');
};
cargar();
console.log('5');
```

**(a)** Los cinco números en el orden en que salen en la consola. (2 pts)

Respuesta: El orden que normalmente veremos en la consola es: 1, 3, 5, 2, 4

**(b)** Por qué el `3` sale **antes** que el `5`, si `cargar` es una función `async`. (2 pts)

Respuesta: Porque aunque la función cargar() sea asíncrona, JavaScript empieza a ejecutar su código normalmente hasta que encuentra un await. Por eso, primero se imprime el 3 y después el programa continúa con las demás instrucciones, donde se imprime el 5

**(c)** Por qué el `5` no espera a que termine el `fetch`, y por qué el `2` y el `4` salen al final. (1 pt)

Respuesta: El 5 no espera porque await solamente detiene temporalmente la ejecución de la función cargar(), pero el resto del programa sigue funcionando. El 2 aparece después porque está dentro de un setTimeout, y el 4 se imprime cuando termina la petición a la API. Normalmente el 2 aparece antes que el 4, aunque eso depende del tiempo que tarde la petición

## P2 · Un 404 que no llega al catch (5 puntos)

**Lo viste en:** el `pedirJSON` del Explorador (semana 8): «fetch solo falla si NO pudo hablar con el servidor».

El episodio 9999 no existe: la API responde con código **404** y el cuerpo `{"error":"Episode not found"}`.

```js
try {
  const respuesta = await fetch('https://rickandmortyapi.com/api/episode/9999');
  const datos = await respuesta.json();
  console.log('Episodio:', datos.name);
} catch (error) {
  console.log('Falló:', error.message);
}
```

**(a)** Qué imprime la consola, exactamente. (1 pt)

Respuesta:La consola muestra: Episodio: undefined 

Esto ocurre porque estamos buscando un episodio que no existe y la API nos devuelve una respuesta de error que no tiene la propiedad name

**(b)** Por qué **no** entra al `catch`, aunque el episodio no existe. Pista: piensa en la diferencia entre «el servidor respondió con un 404» y «no hubo respuesta» (por ejemplo, sin internet). (2 pts)

Respuesta:Porque fetch() no toma automáticamente los errores HTTP, como el 404, como una excepción. Aunque el episodio no exista, el servidor sí respondió a nuestra petición. Por eso, el programa continúa ejecutándose y no entra al catch

**(c)** La línea que falta para que sí entre al `catch`: escríbela e indica en qué parte del código va. Luego escribe qué imprimiría la consola con esa línea. (2 pts)

Respuesta:Debemos agregar esta condición: 

if (!respuesta.ok) { 
  throw new Error(`HTTP ${respuesta.status}`); 
} 
 
Esta condición va después de realizar el fetch() y antes de convertir la respuesta a JSON. Lo que hacemos es verificar si la petición fue correcta y, si no lo fue, lanzar un error para que el catch pueda capturarlo

## P3 · LocalStorage sin JSON (5 puntos)

**Lo viste en:** `js/favoritos.js` del Explorador (semana 8): «localStorage solo guarda TEXTO».

```js
const vistos = [1, 5, 8];
localStorage.setItem('vistos', vistos);
const leido = localStorage.getItem('vistos');
console.log(leido, typeof leido);      // (a)
console.log(leido.length);             // (b)
const recuperado = JSON.parse(leido);  // (c)
```

**(a)** Qué imprime la línea marcada (a): el valor y su tipo. (1 pt)

Respuesta: Imprime el valor 1,3,8 y su tipo de dato es string (cadena de texto). Esto sucede porque localStorage guarda los datos como texto, aunque originalmente hayamos utilizado un arreglo

**(b)** Qué imprime la línea marcada (b), y por qué da ese número. (1 pt)

Respuesta: Imprime el número 5, porque al guardar el arreglo en localStorage, este se convierte en el texto "1,3,8". Entonces, cuando utilizamos .length, se cuentan los caracteres del texto, incluyendo las comas, y no la cantidad de elementos que tenía el arreglo original

**(c)** Qué pasa en la línea marcada (c): ¿funciona o sale un error? Si sale un error, cuál y por qué. (1 pt)

Respuesta: 
Sale un error de tipo TypeError, porque estamos intentando utilizar el método push() sobre una variable que es de tipo string. Esto pasa porque localStorage guarda los datos como texto y no como un arreglo. Por eso, JavaScript no puede agregarle un elemento utilizando push()

**(d)** La segunda línea corregida, para que `recuperado` vuelva a ser el array `[1, 5, 8]`. (1 pt)

Respuesta: Utilizamos JSON.parse() para convertir el texto que recuperamos de localStorage nuevamente en un arreglo. Así, recuperado vuelve a ser [1, 5, 8] y podemos utilizar los métodos de los arreglos normalmente, pero para que funcione, el arreglo debe haberse guardado previamente utilizando JSON.stringify()

**(e)** Por qué en tu `leerVistos` el `JSON.parse` va dentro de un `try/catch`: qué podría pasarle a la app si no estuviera. (1 pt)

Respuesta:Porque JSON.parse() puede generar un error si los datos guardados en localStorage no tienen un formato JSON válido. Por eso utilizamos try/catch, para controlar ese error y devolver un arreglo vacío en caso de que algo falle. Si no lo utilizáramos, el error podría interrumpir la ejecución del código y hacer que la aplicación dejara de funcionar correctamente

## P4 · Botones que dejan de funcionar (5 puntos)

**Lo viste en:** la delegación en la grilla del Explorador (semana 7, paso 04). Está explicada en el README, en R6: «¿Qué es la delegación?».

Un compañero escribió este código. Al cargar la página, el primer clic en «Marcar como visto» funciona; pero después de ese clic, o después de escribir una letra en el buscador, **ningún botón responde**.

```js
render();
document.querySelectorAll('[data-id]').forEach((boton) => {
  boton.addEventListener('click', () => {
    vistos = alternarId(vistos, Number(boton.dataset.id));
    guardarVistos(vistos);
    render();
  });
});
```

**(a)** Qué les pasó a los botones. Pista: fíjate en qué hace `render()` con el contenido de `#lista` cada vez que se llama, y en cuántas veces se ejecuta el `forEach`. (2 pts)

Respuesta:Los botones dejaron de funcionar después del primer clic porque cada vez que se ejecuta render(), se reemplaza el contenido de #lista, incluyendo los botones que ya tenían sus eventos asignados. Como el forEach solamente se ejecuta una vez al principio, los nuevos botones no reciben el evento click, por eso ya no responden cuando intentamos utilizarlos nuevamente

**(b)** El código reescrito con **delegación**: un solo listener en `#lista` que funcione con cualquier botón, aunque `render()` lo haya creado después. Se revisan tres cosas, 1 punto cada una: que el listener esté en `#lista` y no en los botones; que use `closest('[data-id]')` (o algo equivalente) para saber qué botón se presionó; y que no haga nada si el clic no fue en un botón. (3 pts)

Respuesta:En este caso utilizamos la delegación de eventos, agregando un solo addEventListener() al contenedor #lista, en lugar de agregar uno a cada botón. Con closest('[data-id]') identificamos cuál botón fue presionado y, si el clic no fue sobre uno de ellos, utilizamos return para que no haga nada. De esta manera, los botones siguen funcionando aunque render() vuelva a crear las tarjetas

```js

```

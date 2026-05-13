# 🗺️ Hoja de Ruta: Pokémon Deck Builder (SPA React)

## 📌 Resumen de Arquitectura
* **Tecnologías:** React, Vite, Tailwind CSS.
* **API:** TCGdex (`https://api.tcgdex.net/v2/es/cards`).
* **Persistencia:** Local Storage (Gestión del mazo).
* **Entidad Principal (CRUD):** Las Cartas dentro del "Mazo Activo".

---

## 🚀 Fase 1: Setup y Esqueleto (Aprobación base)
**Objetivo:** Levantar el entorno y dejar Tailwind listo para trabajar.
- [ ] Inicializar proyecto con Vite + React.
- [ ] Instalar y configurar Tailwind CSS.
- [ ] Crear estructura de carpetas: `/components`, `/hooks`, `/services`, `/utils`.
- [ ] Crear el layout principal (Header minimalista, área principal, panel lateral para el mazo).

## 🔍 Fase 2: Consumo de API y Búsqueda (La "R" del CRUD externo)
**Objetivo:** Traer los datos y manejarlos con resiliencia.
- [ ] Crear servicio `api.js` con la función `fetchCards(query)`.
- [ ] Implementar un componente `<SearchBar />` con sanitización básica para evitar inputs maliciosos.
- [ ] Implementar bloque `try/catch` en la petición. Mostrar un estado de *Loading* mientras carga y manejar errores si la API falla.
- [ ] Renderizar los resultados en una `<GridCartas />` usando clases de Tailwind para un diseño responsivo.

## 🃏 Fase 3: La Lógica del Mazo (El CRUD + LocalStorage)
**Objetivo:** Cumplir con el núcleo de la evaluación.
- [ ] **Create:** Botón "Añadir al Mazo" en cada carta buscada. Debe guardar ID, nombre, imagen y cantidad inicial (1) en un estado global y en `localStorage`.
- [ ] **Read:** Al cargar la app (`useEffect`), recuperar el mazo del `localStorage` y mostrarlo en el componente `<MiMazo />`.
- [ ] **Update:** Botones de `+` y `-` en las cartas del mazo para alterar su cantidad. Límite: Máximo 4 copias de la misma carta. Validar límite general del mazo (máximo 60 cartas en total).
- [ ] **Delete:** Si la cantidad baja de 1, o si se presiona "Eliminar", sacar la carta del array y actualizar `localStorage`.

## 🛡️ Fase 4: Refinamiento y Seguridad
**Objetivo:** Asegurar los puntos de buenas prácticas y UX.
- [ ] **Validaciones:** Mostrar notificaciones visuales (Toasts atractivos con Tailwind) al añadir, cuando se llega al límite de cartas, o si falla la API.
- [ ] **Estilos:** Asegurar que la app sea 100% *mobile-first*.

## 📝 Fase 5: Documentación Final y Entrega
**Objetivo:** Cumplir con los entregables de la rúbrica.
- [ ] Redactar `README.md` (Instrucciones de instalación Vite/Tailwind, info de la API).
- [ ] Consolidar el archivo `PROMPTS.md` con los registros de cómo la IA ayudó en componentes clave (ej. manejo de errores y lógica del CRUD).
- [ ] Grabar video de 3 minutos (mostrando UI, funcionamiento del CRUD, código y pestaña *Application/LocalStorage* en el navegador).
# Registro de Prompts e Interacción con IA (PROMPTS.md) 🤖

Este documento certifica y describe la metodología de trabajo colaborativo con la Inteligencia Artificial (Antigravity/Gemini) para el desarrollo de la SPA "Pokémon Deck Builder", siguiendo un enfoque de *Spec-Driven Development* (Desarrollo Guiado por Especificaciones).

---

## 📅 Metodología de Desarrollo por Fases

El proyecto se estructuró dividiendo los requerimientos en fases claras, alimentando a la IA con los documentos `spec.md` y `GUIA_PROYECTO.md` como contexto base en cada interacción. 

1. **Fase 1: Setup y Esqueleto Visual.** Se generó la estructura de carpetas (`components/`, `hooks/`, `services/`, `utils/`) y el Layout principal en `App.jsx`, aplicando estrictamente los colores institucionales (Magenta y Amarillo).
2. **Fase 2: Consumo de API (TCGdex).** Se instruyó a la IA para conectar la aplicación con la API, generar el buscador y la grilla de resultados.
3. **Fase 3: Lógica del Mazo (CRUD + LocalStorage).** Se diseñó el Custom Hook `useDeck.js` para abstraer la lógica de negocio.
4. **Fase 4: Refinamiento y Seguridad.** Mejoras en UX (Toasts, Skeleton) y mitigación de vulnerabilidades.
5. **Fase 5: Documentación.** Generación de los archivos `README.md` y `PROMPTS.md`.

---

## 🛠️ Cómo la IA mejoró la calidad del código

Las sugerencias y correcciones de la IA durante el desarrollo iterativo elevaron significativamente el estándar técnico del proyecto en cuatro pilares fundamentales:

### 1. UX y Rendimiento (Performance)
* **Paginación Client-Side:** Al consultar el endpoint principal de TCGdex sin filtros, la API retorna miles de resultados. La IA identificó que renderizar miles de imágenes de golpe colapsaría el navegador (DOM overload). Su sugerencia fue recibir el arreglo completo (que pesa pocos KBs en JSON) pero implementar un paginador local en `App.jsx` que solo renderiza 10 cartas a la vez. Esto hizo que la app pasara de demorar segundos en cargar a ser instantánea.
* **Notificaciones (Toasts) y Confirmaciones:** En lugar de usar los toscos `alert()` nativos del navegador que bloquean el hilo de ejecución, la IA propuso y desarrolló un sistema de notificaciones flotantes (`ToastContainer.jsx`) coherentes con la paleta de colores institucional. Se conectó exitosamente a acciones clave como vaciar o guardar manualmente el mazo.
* **Layout 100vh y Modal de Detalles Dinámico:** Para evitar un scroll infinito en la ventana principal, la IA propuso confinar el alto al 100% de la pantalla (`100vh`) y habilitar barras de scroll personalizadas (`custom-scrollbar`) solo dentro de las grillas. Además, transformó el texto plano del "Mazo Activo" en una grilla de imágenes clickeables que levantan un **Modal Dinámico**, requiriendo una segunda llamada a la API (`fetchCardDetails`) para mostrar estadísticas profundas, logrando un acabado premium.
* **Controles Contextuales e Intuitivos:** La IA dividió las acciones principales de la grilla en botones de "Ver" (Amarillo) y "Añadir" (Magenta) de igual ancho para mantener el equilibrio estético. En el interior del Modal, implementó un renderizado condicional inteligente: si el usuario no tiene la carta, se muestra un gran botón de "Añadir", pero si ya la tiene, la interfaz se adapta fluidamente mostrando controles incrementales (`+`, `-`) y el botón de `Eliminar`.

### 2. Seguridad (Vulnerabilidades)
* **Prevención de XSS:** En el componente `<SearchBar />`, la IA implementó proactivamente una función de sanitización (`input.replace(/[<>/\\'\"&]/g, '')`) antes de enviar la consulta al servicio. Esta medida previene ataques básicos de inyección de scripts (Cross-Site Scripting), asegurando que inputs maliciosos no corrompan el DOM ni el Fetch.

### 3. Manejo de Errores (Resiliencia)
* **Robustez en la Red:** En el archivo `api.js`, la IA aplicó bloques `try/catch` estrictos. Además, incluyó una validación `if (!response.ok)` para lanzar excepciones personalizadas en caso de que el servidor de TCGdex responda con códigos 4xx o 5xx. En la UI, esto se refleja transformando el error en una "Caja Roja" amigable en lugar de una pantalla blanca rota.
* **Fallbacks Visuales:** La IA añadió lógica en el componente `<CardGrid />` para interceptar errores de carga de imágenes (evento `onError`), sustituyéndolas por un placeholder, evitando que enlaces rotos en la base de datos de TCGdex arruinen la estética.

### 4. Lógica de Negocio y Persistencia
* **Reglas Estrictas del Mazo:** Al implementar el CRUD en `useDeck.js`, la IA aseguró que las reglas del negocio (máximo 60 cartas en total, máximo 4 copias por carta idéntica) se validen *antes* de modificar el estado. 
* **Integridad del LocalStorage:** Para la Fase 4, la IA introdujo un filtro de seguridad en el `useEffect` encargado de guardar el mazo. Antes de ejecutar `localStorage.setItem`, verifica que el estado sea un arreglo y que cada carta tenga propiedades válidas (ID numérico/string, quantity positiva). Esto previene que una falla temporal corrompa la memoria del navegador del usuario.
* **Sincronización Síncrona (Bug Fix de LocalStorage):** Se detectó un problema común en React donde la inicialización asíncrona mediante `useEffect` sobreescribía los datos del LocalStorage antes de leerlos. La IA solucionó esto moviendo la lectura a una inicialización síncrona dentro del propio gancho `useState`, garantizando la preservación perfecta del mazo entre recargas.
* **Corrección React Strict Mode:** La IA identificó que los Toasts se duplicaban debido al renderizado doble de React en desarrollo. Lo solucionó moviendo las llamadas de notificación fuera de los callbacks de los "Setters" del estado, demostrando un conocimiento profundo del ciclo de vida de React.

### 5. Arquitectura React (Componentes, Props y Estado)
* La IA sugirió una separación estricta de responsabilidades (*Separation of Concerns*). En lugar de tener un archivo monolítico, se abstrajo la lógica de estado global en el Custom Hook `useDeck.js`.
* Se crearon componentes altamente reutilizables y de presentación pura (`<CardGrid />`, `<DeckSidebar />`, `<ToastContainer />`), donde el flujo de datos se comunica estrictamente mediante **Props** desde el componente padre (`App.jsx`). Esto hace que el código sea predecible, fácil de depurar y altamente escalable.

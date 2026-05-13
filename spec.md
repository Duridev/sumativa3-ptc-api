# Especificación Técnica: SPA React con Consumo de API y CRUD (Sumativa 3)

## 1. Descripción General del Proyecto
Desarrollar una Single Page Application (SPA) en React que consuma una API pública de Pokemon TCG (https://tcgdex.dev/es), permitiendo realizar operaciones CRUD completas (Crear, Leer, Actualizar, Eliminar) sobre una entidad principal. Los datos deben persistir localmente utilizando `localStorage`. El desarrollo debe aplicar buenas prácticas de seguridad, manejo de errores y un diseño responsivo.

## 2. Stack Tecnológico
* **Core:** React (Functional Components, Hooks: `useState`, `useEffect`).
* **Build Tool:** Vite (Recomendado para inicialización rápida y sin errores).
* **Estilos:** TailwindCSS (Mobile First).
* **Peticiones HTTP:** `fetch` (o Axios).
* **Persistencia:** `localStorage`.

## 3. Requerimientos de Interfaz de Usuario (UI/UX)
* **Framework CSS:** Integrar TailwindCSS.
* **Paleta de Colores:** Uso obligatorio de los colores institucionales **Magenta** y **Amarillo** para botones, encabezados o acentos visuales.
* **Layout:** Interfaz atractiva y coherente. Debe incluir:
    * Un Header/Navbar con el título de la aplicación.
    * Un formulario para agregar/editar elementos.
    * Una grilla (Grid) o tabla responsive para mostrar los elementos obtenidos de la API y almacenados localmente.
* **Feedback Visual:** Mostrar indicadores de carga (Loading states) y alertas (Toasts o Alerts de Bootstrap) para operaciones exitosas o errores.

## 4. Requerimientos Funcionales (Criterios de Evaluación)

### 4.1 Consumo de API (Criterio 3.1.4)
* **API a consumir:** `https://tcgdex.dev/es`
* Al montar el componente principal (`useEffect`), se debe realizar un `fetch` para traer una lista inicial de elementos (por ejemplo, los primeros 10) **solo si el `localStorage` está vacío**.
* **Manejo de Errores:** Implementar bloques `try/catch` rigurosos. Si la API falla, el usuario debe recibir un mensaje claro de error en la UI.

### 4.2 CRUD y Local Storage (Criterio 3.1.3)
* **Create (Crear):** Formulario para añadir un nuevo elemento. Al guardar, se debe generar un ID único, actualizar el estado de React y guardar en `localStorage`.
* **Read (Leer):** Renderizar la lista de elementos leyendo directamente del estado (inicializado desde `localStorage`).
* **Update (Actualizar):** Botón de editar en cada tarjeta/fila que cargue los datos en el formulario para modificarlos y actualizar el `localStorage`.
* **Delete (Eliminar):** Botón para borrar un elemento, actualizando el estado y el `localStorage`.
* **Integridad:** Validar que no se puedan guardar elementos vacíos o incompletos.

### 4.3 Seguridad y Buenas Prácticas (Criterio 3.1.2)
* **Validación de Inputs:** Ningún campo del formulario puede enviarse vacío. Mostrar mensajes de validación requerida.
* **Sanitización:** Implementar una función básica para escapar caracteres especiales (como `<` o `>`) en las entradas de texto para prevenir vulnerabilidades XSS (Cross-Site Scripting).

## 5. Requerimientos de Documentación Automatizada
El asistente (Antigravity) debe generar dos archivos Markdown adicionales junto con el código:

1.  **`README.md`**: Debe contener:
    * Nombre del proyecto (Sumativa 3 - PTC API).
    * Instrucciones paso a paso para instalación y ejecución (`pnpm install`, `pnpm run dev`).
    * Nombre de la API elegida.
    * Breve explicación de la arquitectura del proyecto.
2.  **`PROMPTS.md`**: Un registro detallado simulando la interacción con la IA. Debe incluir:
    * Los prompts conceptuales utilizados para generar las funciones clave (ej. "Genera un CRUD con LocalStorage en React").
    * Explicación de cómo las sugerencias de la IA mejoraron el código (ej. "La IA sugirió envolver el fetch en un try/catch para evitar caídas de la app, y agregó sanitización de inputs para evitar XSS").

## 6. Instrucciones de Salida para el IDE
1.  Genera la estructura de carpetas y archivos base (ej. `App.jsx`, `components/ItemForm.jsx`, `components/ItemList.jsx`).
2.  Implementa la lógica completa de los componentes descritos.
3.  Aplica las clases de TailwindCSS y los estilos custom (Magenta/Amarillo).
4.  Genera los archivos `README.md` y `PROMPTS.md` solicitados.
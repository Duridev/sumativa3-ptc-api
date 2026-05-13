# Evaluación Sumativa 3 - SPA React (Pokémon Deck Builder) ⚡

## 📝 Descripción del Proyecto
**Pokémon Deck Builder** es una Single Page Application (SPA) desarrollada como proyecto académico. Su propósito principal es permitir a los usuarios buscar, explorar y armar mazos de cartas coleccionables de Pokémon. La aplicación implementa operaciones CRUD (Crear, Leer, Actualizar, Eliminar) gestionando el estado del mazo y asegurando su persistencia en el navegador.

## 🛠️ Stack Tecnológico
El proyecto fue construido utilizando herramientas modernas para garantizar escalabilidad, rendimiento y una excelente experiencia de usuario:
* **Core:** React (Functional Components, Custom Hooks).
* **Build Tool:** Vite (Para un entorno de desarrollo ultrarrápido y empaquetado optimizado).
* **Estilos:** Tailwind CSS v4 (Enfoque Mobile-First, utilizando colores institucionales INACAP: Magenta y Amarillo).
* **Persistencia de Datos:** `localStorage` (API del navegador para almacenar el mazo activo sin necesidad de backend).

## 📡 API Utilizada
Se seleccionó la API de **TCGdex** ([https://tcgdex.dev/es](https://tcgdex.dev/es)) por las siguientes razones:
1. **Soporte multi-idioma:** Permite consultas y retornos de datos completamente en español, ideal para el público objetivo.
2. **Estructura limpia:** Su endpoint `/v2/es/cards` ofrece objetos ligeros con identificadores únicos y rutas de imágenes predecibles, lo que agiliza el renderizado inicial en el frontend.

## 🚀 Instalación y Ejecución

Sigue estos pasos para levantar el entorno de desarrollo en tu máquina local:

1. **Clonar el repositorio:**
   \`\`\`bash
   git clone <URL_DEL_REPOSITORIO>
   cd sumativa3-ptc-api
   \`\`\`

2. **Instalar dependencias:**
   Se recomienda el uso de `pnpm` por su velocidad y eficiencia en el manejo de paquetes.
   \`\`\`bash
   pnpm install
   \`\`\`

3. **Ejecutar el servidor de desarrollo:**
   \`\`\`bash
   pnpm run dev
   \`\`\`

4. **Visualizar la aplicación:**
   Abre tu navegador web y visita la URL proporcionada en la terminal (usualmente `http://localhost:5173`).

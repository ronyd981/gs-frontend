# Genios Data

## Descripción

Genios Data es un sitio web en el cual se pueden analizar tweets mediante inteligencia artificial, permitiendo ver el tipo de sentimientos que pudo haber tenido la persona al escribir el tweet.

## Tecnologías Utilizadas

- **React** con TypeScript
- **Vite** como herramienta de construcción
- **Yarn** como gestor de paquetes

## Requisitos

Para poder usar el proyecto, es necesario agregar un archivo `.env` en la raíz del proyecto. Este archivo debe contener el token generado por Hugging Face. En el archivo `.env.sample` se indica cómo se llama la variable.

## Notas adicionales

Si deseas desplegar el proyecto en Vercel, asegúrate de agregar un archivo llamado vercel.json en la raíz del proyecto para evitar pantallas en blanco al refrescar la página en cualquier ruta que no sea la raíz. El archivo vercel.json debe contener lo siguiente:

{
"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}

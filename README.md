# FolderScan

Este script es una aplicación de línea de comandos en Node.js que permite listar archivos y directorios de una carpeta, mostrando detalles como:

- **Tipo** (archivo o directorio).
- **Tamaño** en bytes.
- **Fecha y hora de la última modificación**.

## Características:
- **Lectura de directorios**: El script acepta un directorio como argumento de la línea de comandos. Si no se proporciona un argumento, se usa el directorio actual (`"."`).
- **Manejo de errores**: Si hay problemas al acceder al directorio o archivo, muestra mensajes de error y termina el proceso.
- **Detalles de archivos**: Utiliza el módulo `fs/promises` para obtener estadísticas detalladas de cada archivo o carpeta, como el tamaño y la fecha de modificación.
- **Manejo de rutas**: Usa el módulo `path` para manejar de forma adecuada las rutas de los archivos, asegurando compatibilidad con diferentes sistemas operativos.

## Flujo:
1. Recibe un directorio como entrada.
2. Lista el contenido del directorio.
3. Obtiene y muestra los detalles de cada archivo o subdirectorio en formato legible para el usuario.

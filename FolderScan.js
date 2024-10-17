// Importamos el módulo 'fs/promises' de Node.js, que nos permite trabajar con el sistema de archivos usando promesas
const fs = require("node:fs/promises");

// Importamos el módulo 'path' para manejar rutas de archivos y directorios
const path = require("node:path");

// Obtenemos el nombre del directorio desde los argumentos de la línea de comandos (process.argv[2])
// Si no se proporciona ningún argumento, usamos el directorio actual (".")
const folder = process.argv[2] ?? ".";

let files; // Declaramos una variable para almacenar la lista de archivos

// Definimos una función asíncrona 'ls' que listará los archivos y carpetas en un directorio
async function ls(folder) {
  try {
    // Intentamos leer el contenido del directorio usando 'fs.readdir' que devuelve una promesa
    files = await fs.readdir(folder);
  } catch {
    // Si ocurre un error, mostramos un mensaje de error y finalizamos el proceso con código de salida 1
    console.error(`No se pudo leer el directorio: ${folder}`);
    process.exit(1); // Finaliza el proceso debido al error
  }

  // Mapeamos cada archivo a una promesa que obtiene información detallada usando 'fs.stat'
  const filesPromises = files.map(async (file) => {
    const filePath = path.join(folder, file); // Creamos la ruta completa del archivo o directorio
    let stats;

    try {
      // Intentamos obtener las estadísticas del archivo o directorio (tamaño, tipo, fecha de modificación, etc.)
      stats = await fs.stat(filePath);
    } catch {
      // Si no podemos obtener las estadísticas, mostramos un mensaje de error y finalizamos el proceso
      console.error(`No se pudo leer el archivo/directorio: ${file}`);
      process.exit(1); // Finaliza el proceso debido al error
    }

    // Determinamos si es un directorio o un archivo
    const isDirectory = stats.isDirectory();
    const fileType = isDirectory ? "Directorio " : "Archivo"; // Indicamos si es un directorio o archivo

    // Obtenemos el tamaño del archivo
    const fileSize = stats.size;

    // Obtenemos la fecha y hora de la última modificación
    const fileModifies = stats.mtime.toLocaleString();

    // Devolvemos una cadena con el tipo, nombre, tamaño y fecha de modificación del archivo o directorio
    return `${fileType} ${file.padEnd(20)} ${fileSize
      .toString()
      .padStart(10)} ${fileModifies}`;
  });

  // Esperamos a que todas las promesas se resuelvan y obtengamos la información de cada archivo
  const fileInfo = await Promise.all(filesPromises);

  // Imprimimos la información de cada archivo o directorio
  fileInfo.forEach((fileInfo) => console.log(fileInfo));
}

// Llamamos a la función 'ls' pasando el directorio que se quiere listar
ls(folder);

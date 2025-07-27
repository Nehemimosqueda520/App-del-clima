# ClimAPP

Este proyecto es un ejemplo sencillo de una aplicación de clima. Utiliza la API de WeatherAPI para obtener pronósticos y se estructura por módulos para facilitar su mantenimiento.

## Estructura del proyecto

```
/ (raíz del proyecto)
├── index.html              # Página principal
├── offline.html            # Página mostrada si no hay conexión
├── manifest.json           # Configuración para PWA
├── sw.js                   # Service worker
├── css/
│   └── style.css           # Estilos de la aplicación
├── js/
│   ├── api.js              # Funciones para consumir la API
│   ├── ui.js               # Manipulación del DOM y lógica de presentación
│   ├── lang.js             # Gestión de idioma y traducciones
│   ├── toggleTheme.js      # Cambio entre tema claro y oscuro
│   └── main.js             # Punto de entrada que inicializa la app
├── images/
│   └── sun.png             # Icono de ejemplo
├── server.js               # Servidor HTTP básico para desarrollo
└── package.json            # Configuración de npm
```

Para iniciar el servidor local ejecuta:

```bash
npm start
```

Esto abrirá un servidor en `http://localhost:3000` desde donde podrás probar la aplicación.

## Pruebas

Para ejecutar las pruebas automáticas utiliza:

```bash
npm test
```

## Modo claro y oscuro

Desde la barra de navegación puedes cambiar entre el tema claro y oscuro. La elección se guarda en `localStorage` para mantener la preferencia en futuras visitas.

## Soporte multilenguaje

También desde la barra de navegación puedes seleccionar el idioma (español o inglés).
La selección modifica el parámetro `lang` utilizado al consultar la API y traduce automáticamente los textos de la interfaz.

## Modo sin conexión

Gracias al *service worker* la aplicación cuenta con una página de respaldo cuando no hay conexión a Internet.
Si intentas navegar estando offline se mostrará `offline.html` para indicar la falta de conectividad.
El service worker usa una estrategia *stale-while-revalidate* para los archivos estáticos, lo que mantiene el caché actualizado en segundo plano cada vez que haya una nueva versión disponible.
Cada vez que se instala una actualización el propio servicio incrementa el número de versión de la caché y elimina las anteriores para evitar conflictos.


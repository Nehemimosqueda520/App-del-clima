# ClimAPP

Este proyecto es un ejemplo sencillo de una aplicación de clima. Utiliza la API de WeatherAPI para obtener pronósticos y se estructura por módulos para facilitar su mantenimiento.

## Estructura del proyecto

```
/ (raíz del proyecto)
├── index.html              # Página principal
├── css/
│   └── style.css           # Estilos de la aplicación
├── js/
│   ├── api.js              # Funciones para consumir la API
│   ├── ui.js               # Manipulación del DOM y lógica de presentación
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

## Modo claro y oscuro

Desde la barra de navegación puedes cambiar entre el tema claro y oscuro. La elección se guarda en `localStorage` para mantener la preferencia en futuras visitas.


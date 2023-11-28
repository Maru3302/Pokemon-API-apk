# Poke-Data-Movil

## Colaboradores

- Amaya Ortega Manuel Alejandro
- Benitez Perez Jose Manuel
- Marges Gonzalez De La Llave Eduardo
- Ochoa Cota Erubiel
- Vega Ornelas Annakary

## Introducción

La Aplicación de Información de Pokémon es una emocionante aplicación móvil desarrollada en Expo que ofrece información detallada sobre los Pokémon. Permite a los usuarios explorar datos organizados por generaciones y Pokémon individuales, brindándoles la oportunidad de aprender más sobre sus criaturas favoritas.

## Requisitos de Desarrollo

Antes de comenzar a desarrollar la aplicación, asegúrate de tener instaladas las siguientes herramientas:

- Node.js
- Expo CLI
- Un editor de código (p. ej., Visual Studio Code)
- Conexión a Internet

## Configuración del Proyecto

1. Clona el repositorio de la aplicación desde GitHub o crea un proyecto de Expo desde cero.
2. Instala las dependencias necesarias ejecutando el siguiente comando:

    npm install

3. Inicia el servidor de desarrollo con el siguiente comando:

    npx expo start

4. Escanea el código QR con la aplicación Expo Go en tu dispositivo móvil para ver la aplicación en acción.

## Estructura de la Aplicación

La aplicación se divide en varias pantallas y componentes:

1. **Pantalla de Inicio (Home):** La primera pantalla que los usuarios verán al abrir la aplicación. Proporciona una breve descripción de la aplicación y ofrece acceso a las generaciones de Pokémon.

2. **Pantalla de Generaciones de Pokémon:** En esta pantalla, los usuarios pueden seleccionar una generación de Pokémon específica para explorar. Cada generación está representada como un botón o tarjeta interactiva que redirige a la pantalla de esa generación.

3. **Pantalla de Pokémon por Generación:** Muestra una lista de Pokémon de la generación seleccionada. Los usuarios pueden tocar cualquier Pokémon para ver más detalles o navegar a la pantalla de información individual del Pokémon.

4. **Pantalla de Pokémon Individual:** En esta pantalla, los usuarios pueden ver información detallada sobre un Pokémon específico, incluyendo su nombre, tipo, imagen y otros datos relevantes.

## Implementación Técnica

La aplicación utiliza componentes de React Native y Expo para mostrar la información de Pokémon. Los datos de Pokémon se pueden obtener a través de una API pública de Pokémon, como la PokéAPI.


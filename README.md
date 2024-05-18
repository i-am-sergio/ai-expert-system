# AI Expert System for Vocational Guidance

## Description

This project is an Expert System for Vocational Guidance designed to help users discover and orient their professional interests. The system consists of two main parts:

1. **Frontend**: An intuitive and user-friendly mobile application that allows users to interact with the system.
2. **Backend**: A Python server that handles the expert system logic and processes users' responses.

## Functional Requirements

- **_Vocational Guidance Questionnaire:_**

    - The system should present a questionnaire with questions about the user's interests, skills, and preferences.
    - The questions should be of different types, such as multiple choice, single selection, and Likert scales.

- **_Response Processing:_**

    - The system should analyze the questionnaire responses using an expert algorithm to generate recommendations.
    - There should be logic to handle incomplete responses and ensure sufficient information is collected to generate accurate recommendations.

- **_Result Generation:_**

    - The system should generate a report with career and professional field recommendations based on the user's responses.
    - The report should be clear and understandable, providing details on why certain careers were recommended.

- **_History of Results:_**

    - Users should be able to access a history of their previous questionnaires and results.
    - The system should allow comparison of results from different questionnaires taken by the same user.

- **_User Registration and Authentication:_**

    - The system should allow users to register with an email and password.
    - Users should be able to log in with their credentials.

## Non-Functional Requirements

- **_Usability:_**

    - The user interface should be intuitive and accessible to people with different levels of technological ability.
    - It should follow accessible design principles for users with disabilities.

- **_Performance:_**

    - The system should be able to handle multiple users simultaneously without degrading performance.
    - Responses to user actions (such as submitting the questionnaire) should be fast, with response times under 2 seconds.

- **_Scalability:_**

    - The system should be scalable to support an increasing number of users and data without losing performance.
    - It should be easy to update and maintain.

- **_Maintainability:_**

    - The code should be well-documented and follow good programming practices to facilitate maintenance and evolution.
    - There should be automated tests to ensure the quality and correct functioning of the system.


<!-- ## Features

- **User-Friendly Interface**: Optimized design for mobile devices.
- **Recommendation Engine**: Expert algorithm that suggests careers and professional fields based on user responses.
- **Scalability**: Ability to handle multiple users simultaneously. 

-->

## Project Structure

```plaintext
.
├── backend
│   ├── app.py
│   ├── models.py
│   ├── controllers.py
│   └── requirements.txt
├── frontend
│   ├── src
│   │   ├── App.jsx
│   │   ├── components
│   │   │   ├── Home.jsx
│   │   │   ├── Quiz.jsx
│   │   │   └── Results.jsx
│   └── package.json
└── README.md
```

## Technologies Used

- **_Frontend_**

    - `React Native` For developing the mobile application.
    - `Expo` Framework for easily developing React Native applications.

- **_Backend_**

    - `Python` Main programming language for the backend.
    - `Flask` Microframework for developing server applications.
    - `SQLite` Lightweight database for storing user information and results.



<!-- TRADUCTION IN SPANISH -->

<!-- 
# Sistema Experto en Orientación Vocacional

## Descripción

Este proyecto es un Sistema Experto en Orientación Vocacional diseñado para ayudar a los usuarios a descubrir y orientar sus intereses profesionales. El sistema consta de dos partes principales:

1. **Frontend**: Una aplicación móvil intuitiva y amigable que permite a los usuarios interactuar con el sistema.
2. **Backend**: Un servidor en Python que maneja la lógica del sistema experto y procesa las respuestas de los usuarios.


## Requerimientos Funcionales

- Cuestionario de Orientación Vocacional

    - El sistema debe presentar un cuestionario con preguntas sobre intereses, habilidades y preferencias de los usuarios.
    - Las preguntas deben ser de diferentes tipos, como opción múltiple, selección única y escalas de Likert.

- Procesamiento de Respuestas

    - El sistema debe analizar las respuestas del cuestionario utilizando un algoritmo experto para generar recomendaciones.
    - Debe haber lógica para manejar respuestas incompletas y asegurar que se recopile suficiente información para generar una recomendación precisa.

- Generación de Resultados

    - El sistema debe generar un informe con las recomendaciones de carreras y campos profesionales basados en las respuestas del usuario.
    - El informe debe ser claro y comprensible, proporcionando detalles sobre por qué se recomendaron ciertas carreras.

- Historial de Resultados

    - Los usuarios deben poder acceder a un historial de sus cuestionarios y resultados anteriores.
    - El sistema debe permitir la comparación de resultados de diferentes cuestionarios realizados por el mismo usuario.

- Registro y Autenticación de Usuarios

    - El sistema debe permitir a los usuarios registrarse con un correo electrónico y una contraseña.
    - Los usuarios deben poder iniciar sesión con sus credenciales.


## Requerimientos No Funcionales

- Rendimiento

    - El sistema debe ser capaz de manejar múltiples usuarios simultáneamente sin degradar el rendimiento.
    - Las respuestas a las acciones del usuario (como enviar el cuestionario) deben ser rápidas, con tiempos de respuesta inferiores a 2 segundos.

- Escalabilidad

    - El sistema debe ser escalable para soportar un número creciente de usuarios y datos sin pérdida de rendimiento.
    - Debe ser fácil de actualizar y mantener.

- Usabilidad

    - La interfaz de usuario debe ser intuitiva y accesible para personas con diferentes niveles de habilidad tecnológica.
    - Debe seguir principios de diseño accesible para usuarios con discapacidades.

- Mantenibilidad

    - El código debe estar bien documentado y seguir buenas prácticas de programación para facilitar su mantenimiento y evolución.
    - Debe haber pruebas automatizadas para asegurar la calidad y funcionamiento correcto del sistema.

## Estructura del Proyecto

```plaintext
.
├── backend
│   ├── app.py
│   ├── models.py
│   ├── controllers.py
│   └── requirements.txt
├── frontend
│   ├── src
│   │   ├── App.js
│   │   ├── components
│   │   │   ├── Home.js
│   │   │   ├── Quiz.js
│   │   │   └── Results.js
│   └── package.json
└── README.md -->



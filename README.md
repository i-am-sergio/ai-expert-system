# AI Expert System for Vocational Guidance

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-fdfdfd?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

## Introduccion
En un mundo en constante evolución, donde las opciones profesionales son vastas y variadas, la orientación vocacional se convierte en un componente crucial para los que buscan definir su trayectoria profesional. En este contexto, las aplicaciones móviles han emergido como herramientas poderosas para brindar asesoramiento personalizado y accesible. Este informe se centra en la aplicación móvil "Expertus: AI Expert System for Vocational Guidance", una innovadora solución que aprovecha la inteligencia artificial, bajo el enfoque de sistema experto, para ofrecer recomendaciones y análisis detallados sobre carreras y profesiones. A a lo largo del presente informe, exploraremos sus características, funcionalidades, proceso de desarrollo y configuraciones.

## Descripcion

Experturs es una aplicacion movil diseñada para ayudar a los usuarios a explorar y entender las diversas opciones profesionales disponibles. 

### 1. Requisitos No Funcionales
| Requisito No Funcional         | Descripción                                                                                                                                                                           |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Rendimiento**        | El sistema debe ser capaz de manejar múltiples usuarios simultáneamente sin degradar el rendimiento. Las respuestas a las acciones del usuario (como enviar el cuestionario) deben ser rápidas, con tiempos de respuesta inferiores a 2 segundos. |
| **Escalabilidad**      | El sistema debe ser escalable para soportar un número creciente de usuarios y datos sin pérdida de rendimiento. Debe ser fácil de actualizar y mantener. |
| **Usabilidad**         | La interfaz de usuario debe ser intuitiva y accesible para personas con diferentes niveles de habilidad tecnológica. Debe seguir principios de diseño accesible para usuarios con discapacidades. |
| **Mantenibilidad**     | El código debe estar bien documentado y seguir buenas prácticas de programación para facilitar su mantenimiento y evolución.Debe haber pruebas automatizadas para asegurar la calidad y funcionamiento correcto del sistema.    |


### 2. Requisitos Funcionales 

| Requisito Funcional                           | Descripción                                                                                                                                                       |
|-----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Cuestionario de Orientación Vocacional** | El sistema debe presentar un cuestionario con preguntas sobre intereses, habilidades y preferencias de los usuarios. Las preguntas deben ser faciles de entender y ser respondidas con un SI o con un NO. |
| **Procesamiento de Respuestas**        | El sistema debe analizar las respuestas del cuestionario utilizando un algoritmo experto para generar recomendaciones.Debe haber lógica para manejar respuestas incompletas y asegurar que se recopile suficiente información para generar una recomendación precisa. |
| **Generación de Resultados**           | El sistema debe generar un informe con las recomendaciones de carreras y campos profesionales basados en las respuestas del usuario. El informe debe ser claro y comprensible, proporcionando detalles sobre por qué se recomendaron ciertas carreras. |
| **Historial de Resultados**            | Los usuarios deben poder acceder a un historial de sus cuestionarios y resultados anteriores. El sistema debe permitir la comparación de resultados de diferentes cuestionarios realizados por el mismo usuario. |
| **Registro y Autenticación de Usuarios** | El sistema debe permitir a los usuarios registrarse con un correo electrónico y una contraseña. Los usuarios deben poder iniciar sesión con sus credenciales. |


### 3. Estructura de Proyecto

El sistema consta de dos partes principales:

1. **Frontend**: Una aplicación móvil intuitiva y amigable que permite a los usuarios interactuar con el sistema.
2. **Backend**: Un servidor en Python que maneja la lógica del sistema experto y procesa las respuestas de los usuarios.

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

### 4. Tecnologias Usadas

- **_Frontend_**

    - `React Native` For developing the mobile application.
    - `Expo` Framework for easily developing React Native applications.

- **_Backend_**

    - `Python` Main programming language for the backend.
    - `Flask` Microframework for developing server applications.
    - `SQLite` Lightweight database for storing user information and results.

### 5. Funcionalidades

listar funciones...

<!-- ## Features

- **User-Friendly Interface**: Optimized design for mobile devices.
- **Recommendation Engine**: Expert algorithm that suggests careers and professional fields based on user responses.
- **Scalability**: Ability to handle multiple users simultaneously. 

-->


## Integración de la IA

Describe la Arquitectura de un Sistema Experto

## Metodologia 

Metodología utilizada en el desarrollo de la aplicación Agil Scrum

## Guía de Usuario

Pantallas y que puede hacer el usuario ahi

## Instalacion y Configuracion

1. **Clone the repository**

2. **Database:**

    - Instalar SQLite;
    ```bash
    sudo apt install sqlite3
    ```

3. **Backend:**

    - From the root of the project:
    ```bash
    cd expert-system-vocational-guidance/backend
    ```
    
    - Create a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate
    ```

    - Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```

    - Run the backend application:
    ```bash
    flask --app app run
    ```

4. **Frontend:**

    - From the root of the project:
    ```bash
    cd expert-system-vocational-guidance/frontend
    ```

    - Install the dependencies:
    ```bash
    npm install
    ```
    
    - Run the frontend application:
    ```bash
    npm run dev
    ```
## Desafíos y Limitaciones
A partir del sistema actual menciona desafios y limitaciones

## Conclusiones
Lista 5 conclusiones
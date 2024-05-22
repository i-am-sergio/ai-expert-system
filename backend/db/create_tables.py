import sqlite3

# Diccionario de preguntas
carreras_preguntas = {
    "Ingeniería Civil": {
        "Habilidades técnicas": "¿Tienes habilidades en matemáticas y física?",
        "Resolución de problemas": "¿Eres capaz de resolver problemas complejos?",
        "Diseño y planificación": "¿Tienes habilidades de diseño y planificación?",
        "Software": "¿Eres competente en el uso de software de diseño asistido por ordenador (CAD)?",
        "Gestión de proyectos": "¿Tienes buena comprensión de la gestión de proyectos y presupuestos?",
        "Comunicación": "¿Tienes habilidades de comunicación para trabajar en equipo y con clientes?"
    },
    "Medicina": {
        "Ciencias biológicas y químicas": "¿Tienes aptitud para las ciencias biológicas y químicas?",
        "Observación": "¿Tienes habilidades de observación y atención al detalle?",
        "Trabajo bajo presión": "¿Eres capaz de trabajar bajo presión?",
        "Habilidades interpersonales": "¿Tienes habilidades interpersonales y empáticas?",
        "Toma de decisiones": "¿Tienes habilidad para tomar decisiones rápidas y precisas?",
        "Conocimientos técnicos": "¿Tienes capacidad para asimilar y aplicar conocimientos técnicos complejos?"
    },
    "Marketing Digital": {
        "Análisis de datos": "¿Tienes fuertes habilidades analíticas y capacidad para interpretar datos?",
        "Herramientas de marketing": "¿Tienes conocimientos técnicos en herramientas de marketing digital como SEO, SEM, y analítica web?",
        "Creatividad": "¿Tienes creatividad y capacidad para generar ideas innovadoras?",
        "Comunicación persuasiva": "¿Tienes habilidades de escritura persuasiva y comunicación efectiva?",
        "Adaptabilidad": "¿Tienes capacidad para adaptarte rápidamente a los cambios en las tendencias del mercado?",
        "Diseño gráfico y edición de vídeo": "¿Tienes competencia en el uso de herramientas de diseño gráfico y edición de vídeo?"
    },
    "Psicología": {
        "Empatía": "¿Tienes empatía y habilidades de escucha activa?",
        "Comportamiento humano": "¿Tienes capacidad para comprender el comportamiento humano y las motivaciones?",
        "Comunicación": "¿Tienes habilidades de comunicación verbal y no verbal?",
        "Análisis de datos": "¿Tienes aptitud para el análisis y la interpretación de datos?",
        "Confidencialidad y ética": "¿Tienes capacidad para mantener la confidencialidad y la ética profesional?",
        "Asesoramiento y resolución de conflictos": "¿Tienes habilidades de asesoramiento y resolución de conflictos?"
    },
    "Desarrollo de Software": {
        "Programación": "¿Tienes fuertes habilidades en programación y desarrollo de software?",
        "Resolución de problemas": "¿Eres capaz de resolver problemas de manera lógica y creativa?",
        "Lenguajes y tecnologías": "¿Tienes competencia en el uso de diferentes lenguajes de programación y tecnologías?",
        "Trabajo en equipo": "¿Tienes habilidades de trabajo en equipo y colaboración?",
        "Aprendizaje rápido": "¿Tienes capacidad para aprender y adaptarte rápidamente a nuevas tecnologías?",
        "Diseño de software y arquitectura de sistemas": "¿Tienes buena comprensión de los principios de diseño de software y arquitectura de sistemas?"
    }
}

# Conectarse a la base de datos (o crearla si no existe)
conn = sqlite3.connect('carreras.db')
cursor = conn.cursor()

# Crear una tabla para cada carrera e insertar los datos correspondientes
for carrera, detalles in carreras_preguntas.items():
    # Crear la tabla con el nombre de la carrera (reemplazar espacios por guiones bajos)
    tabla = carrera.replace(" ", "_")
    cursor.execute(f'''
        CREATE TABLE IF NOT EXISTS {tabla} (
            categoria TEXT,
            pregunta TEXT
        )
    ''')

    # Insertar los datos en la tabla correspondiente
    for categoria, pregunta in detalles.items():
        cursor.execute(f'''
            INSERT INTO {tabla} (categoria, pregunta) VALUES (?, ?)
        ''', (categoria, pregunta))

# Confirmar los cambios y cerrar la conexión
conn.commit()
conn.close()

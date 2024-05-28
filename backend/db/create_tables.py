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
    "Arquitectura": {
        "Diseño arquitectónico": "¿Tienes habilidades en diseño y creatividad?",
        "Conocimientos técnicos": "¿Tienes aptitud para comprender conceptos técnicos y estructurales?",
        "Dibujo": "¿Eres competente en dibujo técnico y artístico?",
        "Software de diseño": "¿Tienes experiencia en el uso de software de diseño como AutoCAD o Revit?",
        "Planificación y gestión": "¿Tienes habilidades en planificación de proyectos y gestión de recursos?",
        "Trabajo en equipo": "¿Puedes colaborar eficientemente con otros profesionales en proyectos?"
    },
    "Ingeniería Ambiental": {
        "Ciencias naturales": "¿Tienes aptitud para las ciencias biológicas, químicas y ambientales?",
        "Resolución de problemas": "¿Eres capaz de identificar y resolver problemas ambientales complejos?",
        "Regulaciones ambientales": "¿Tienes conocimientos sobre leyes y regulaciones ambientales?",
        "Trabajo de campo": "¿Te gusta trabajar al aire libre y realizar investigaciones de campo?",
        "Análisis de datos": "¿Eres capaz de analizar y interpretar datos ambientales?",
        "Comunicación": "¿Tienes habilidades para comunicarte efectivamente con comunidades y partes interesadas?"
    },
    "Enfermería": {
        "Atención al paciente": "¿Tienes habilidades interpersonales y empatía para el cuidado del paciente?",
        "Conocimientos médicos": "¿Tienes aptitud para asimilar conocimientos de ciencias de la salud?",
        "Trabajo en equipo": "¿Puedes trabajar eficientemente en equipo con otros profesionales de la salud?",
        "Resistencia física y emocional": "¿Tienes la capacidad de manejar el estrés y trabajar largas horas?",
        "Habilidades técnicas": "¿Tienes competencia en procedimientos médicos y uso de equipos médicos?",
        "Ética profesional": "¿Tienes una fuerte ética profesional y confidencialidad?"
    },
    "Derecho": {
        "Análisis crítico": "¿Tienes habilidades para el análisis crítico y la argumentación lógica?",
        "Comprensión de leyes": "¿Tienes interés y capacidad para entender y aplicar leyes y regulaciones?",
        "Comunicación": "¿Tienes habilidades de comunicación verbal y escrita para presentar casos?",
        "Investigación": "¿Eres capaz de realizar investigaciones jurídicas exhaustivas?",
        "Resolución de conflictos": "¿Tienes habilidades para la negociación y la resolución de conflictos?",
        "Ética profesional": "¿Tienes una fuerte ética profesional y compromiso con la justicia?"
    },
    "Administración de Empresas": {
        "Liderazgo": "¿Tienes habilidades de liderazgo y gestión de equipos?",
        "Toma de decisiones": "¿Eres capaz de tomar decisiones estratégicas y tácticas?",
        "Análisis financiero": "¿Tienes aptitudes para el análisis financiero y la gestión de recursos?",
        "Planificación estratégica": "¿Tienes habilidades en planificación estratégica y desarrollo empresarial?",
        "Comunicación": "¿Tienes habilidades de comunicación efectiva en diferentes contextos?",
        "Innovación y emprendimiento": "¿Tienes creatividad y visión para la innovación y el emprendimiento?"
    }
    "Contabilidad": {
        "Análisis financiero": "¿Tienes habilidades en el análisis financiero y gestión de cuentas?",
        "Matemáticas": "¿Tienes aptitudes para las matemáticas y la estadística?",
        "Normativas contables": "¿Tienes conocimientos sobre normativas y leyes contables?",
        "Detalle y precisión": "¿Tienes atención al detalle y precisión en el trabajo?",
        "Software contable": "¿Tienes experiencia en el uso de software contable?",
        "Ética profesional": "¿Tienes una fuerte ética profesional y confidencialidad?"
    },
    "Economía": {
        "Análisis económico": "¿Tienes habilidades en el análisis y modelación económica?",
        "Investigación": "¿Te gusta realizar investigaciones y estudios de mercado?",
        "Matemáticas y estadística": "¿Tienes competencias en matemáticas y estadística?",
        "Políticas públicas": "¿Tienes interés en las políticas públicas y el desarrollo económico?",
        "Comunicación": "¿Tienes habilidades para comunicar conceptos económicos complejos?",
        "Resolución de problemas": "¿Eres capaz de resolver problemas económicos de manera creativa?"
    },
    "Ingeniería Industrial": {
        "Optimización": "¿Tienes habilidades para optimizar procesos y recursos?",
        "Análisis de datos": "¿Tienes aptitud para el análisis y la interpretación de datos?",
        "Gestión de operaciones": "¿Tienes habilidades en gestión de operaciones y producción?",
        "Matemáticas y física": "¿Tienes competencias en matemáticas y física?",
        "Software de simulación": "¿Tienes experiencia en el uso de software de simulación y modelado?",
        "Trabajo en equipo": "¿Puedes colaborar eficientemente con otros profesionales en proyectos?"
    },
    "Comunicación Social": {
        "Escritura y redacción": "¿Tienes habilidades en escritura y redacción?",
        "Medios de comunicación": "¿Tienes interés en los medios de comunicación y las relaciones públicas?",
        "Creatividad": "¿Tienes creatividad y capacidad para generar contenido atractivo?",
        "Habilidades interpersonales": "¿Tienes habilidades interpersonales y de networking?",
        "Tecnología de la información": "¿Tienes conocimientos en el uso de tecnologías de la información y medios digitales?",
        "Ética profesional": "¿Tienes una fuerte ética profesional y compromiso con la verdad?"
    },
    "Turismo y Hotelería": {
        "Atención al cliente": "¿Tienes habilidades para la atención al cliente y servicio?",
        "Idiomas": "¿Tienes conocimientos en varios idiomas?",
        "Gestión de eventos": "¿Tienes habilidades en la planificación y gestión de eventos?",
        "Conocimientos culturales": "¿Tienes interés en las culturas y el patrimonio?",
        "Marketing": "¿Tienes aptitudes para el marketing y la promoción turística?",
        "Trabajo en equipo": "¿Puedes colaborar eficientemente con otros profesionales en proyectos?"
    },
    "Ingeniería de Sistemas": {
        "Programación": "¿Tienes habilidades en programación y desarrollo de sistemas?",
        "Resolución de problemas": "¿Eres capaz de resolver problemas complejos y técnicos?",
        "Análisis de sistemas": "¿Tienes competencias en el análisis y diseño de sistemas?",
        "Redes y telecomunicaciones": "¿Tienes conocimientos en redes y telecomunicaciones?",
        "Seguridad informática": "¿Tienes aptitudes para la seguridad informática y ciberseguridad?",
        "Trabajo en equipo": "¿Puedes trabajar en equipo con otros profesionales de TI?"
    },
    "Educación": {
        "Habilidades pedagógicas": "¿Tienes habilidades para enseñar y transmitir conocimientos?",
        "Paciencia y empatía": "¿Tienes paciencia y empatía para trabajar con estudiantes?",
        "Planificación educativa": "¿Tienes competencias en la planificación y desarrollo de programas educativos?",
        "Comunicación": "¿Tienes habilidades de comunicación verbal y escrita?",
        "Tecnologías educativas": "¿Tienes conocimientos en el uso de tecnologías educativas?",
        "Evaluación y seguimiento": "¿Eres capaz de evaluar y hacer seguimiento al progreso de los estudiantes?"
    },
    "Diseño Gráfico": {
        "Creatividad": "¿Tienes creatividad y habilidades artísticas?",
        "Software de diseño": "¿Tienes experiencia en el uso de software de diseño como Adobe Photoshop e Illustrator?",
        "Comunicación visual": "¿Tienes aptitudes para la comunicación visual y diseño de mensajes?",
        "Tipografía y color": "¿Tienes conocimientos en tipografía y teoría del color?",
        "Marketing y branding": "¿Tienes habilidades en marketing y creación de marcas?",
        "Trabajo en equipo": "¿Puedes colaborar eficientemente con otros profesionales en proyectos?"
    },
    "Ingeniería Electrónica": {
        "Circuitos y sistemas": "¿Tienes conocimientos en diseño y análisis de circuitos y sistemas electrónicos?",
        "Matemáticas y física": "¿Tienes aptitudes para las matemáticas y la física?",
        "Programación": "¿Tienes habilidades en programación y sistemas embebidos?",
        "Innovación tecnológica": "¿Tienes interés en la innovación y desarrollo tecnológico?",
        "Resolución de problemas": "¿Eres capaz de resolver problemas técnicos complejos?",
        "Trabajo en equipo": "¿Puedes colaborar eficientemente con otros profesionales en proyectos?"
    },
    "Ingeniería Mecánica": {
        "Diseño mecánico": "¿Tienes habilidades en el diseño y análisis de sistemas mecánicos?",
        "Matemáticas y física": "¿Tienes competencias en matemáticas y física?",
        "Manufactura": "¿Tienes conocimientos en procesos de manufactura y producción?",
        "Software de diseño": "¿Tienes experiencia en el uso de software de diseño como AutoCAD y SolidWorks?",
        "Resolución de problemas": "¿Eres capaz de resolver problemas técnicos y de ingeniería?",
        "Trabajo en equipo": "¿Puedes colaborar eficientemente con otros profesionales en proyectos?"
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

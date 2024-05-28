# Version 1 para organizar la info
carreras = {
    "Ingeniería Civil": {
        "Habilidades técnicas": ["matemáticas", "física"],
        "Resolución de problemas": "Capacidad para resolver problemas complejos.",
        "Diseño y planificación": "Habilidades de diseño y planificación.",
        "Software": "Competencia en el uso de software de diseño asistido por ordenador (CAD).",
        "Gestión de proyectos": "Buena comprensión de la gestión de proyectos y presupuestos.",
        "Comunicación": "Habilidades de comunicación para trabajar en equipo y con clientes."
    },
    "Medicina": {
        "Ciencias biológicas y químicas": "Aptitud para las ciencias biológicas y químicas.",
        "Observación": "Habilidades de observación y atención al detalle.",
        "Trabajo bajo presión": "Capacidad para trabajar bajo presión.",
        "Habilidades interpersonales": "Habilidades interpersonales y empáticas.",
        "Toma de decisiones": "Habilidad para tomar decisiones rápidas y precisas.",
        "Conocimientos técnicos": "Capacidad para asimilar y aplicar conocimientos técnicos complejos."
    },
    "Marketing Digital": {
        "Análisis de datos": "Fuertes habilidades analíticas y capacidad para interpretar datos.",
        "Herramientas de marketing": "Conocimientos técnicos en herramientas de marketing digital como SEO, SEM, y analítica web.",
        "Creatividad": "Creatividad y capacidad para generar ideas innovadoras.",
        "Comunicación persuasiva": "Habilidades de escritura persuasiva y comunicación efectiva.",
        "Adaptabilidad": "Capacidad para adaptarse rápidamente a los cambios en las tendencias del mercado.",
        "Diseño gráfico y edición de vídeo": "Competencia en el uso de herramientas de diseño gráfico y edición de vídeo."
    },
    "Psicología": {
        "Empatía": "Empatía y habilidades de escucha activa.",
        "Comportamiento humano": "Capacidad para comprender el comportamiento humano y las motivaciones.",
        "Comunicación": "Habilidades de comunicación verbal y no verbal.",
        "Análisis de datos": "Aptitud para el análisis y la interpretación de datos.",
        "Confidencialidad y ética": "Capacidad para mantener la confidencialidad y la ética profesional.",
        "Asesoramiento y resolución de conflictos": "Habilidades de asesoramiento y resolución de conflictos."
    },
    "Desarrollo de Software": {
        "Programación": "Fuertes habilidades en programación y desarrollo de software.",
        "Resolución de problemas": "Capacidad para resolver problemas de manera lógica y creativa.",
        "Lenguajes y tecnologías": "Competencia en el uso de diferentes lenguajes de programación y tecnologías.",
        "Trabajo en equipo": "Habilidades de trabajo en equipo y colaboración.",
        "Aprendizaje rápido": "Capacidad para aprender y adaptarse rápidamente a nuevas tecnologías.",
        "Diseño de software y arquitectura de sistemas": "Buena comprensión de los principios de diseño de software y arquitectura de sistemas."
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
}

# Ejemplo de acceso a la información:
print("Habilidades técnicas para Ingeniería Civil:", carreras["Ingeniería Civil"]["Habilidades técnicas"])


# Version 2 para origanizar la info
orientacion_vocacional = {
    'Ingeniería de Software': {
        'descripcion': 'Ingeniería de Software es una disciplina que se enfoca en el diseño, desarrollo y mantenimiento de software.',
        'habilidades': ['programación', 'análisis de algoritmos', 'resolución de problemas', 'trabajo en equipo'],
        'salida_laboral': 'desarrollador de software, ingeniero de software, arquitecto de software'
    },
    'Medicina': {
        'descripcion': 'Medicina es la ciencia y práctica del diagnóstico, tratamiento y prevención de enfermedades.',
        'habilidades': ['comprensión del cuerpo humano', 'habilidades de comunicación', 'pensamiento crítico', 'empatía'],
        'salida_laboral': 'médico, cirujano, especialista en áreas específicas de la medicina'
    },
    'Derecho': {
        'descripcion': 'Derecho es el conjunto de normas jurídicas que regulan la convivencia social y permiten resolver conflictos de manera pacífica.',
        'habilidades': ['pensamiento analítico', 'habilidades de argumentación', 'investigación', 'comprensión de la ley'],
        'salida_laboral': 'abogado, juez, fiscal, asesor legal'
    },
    'Arquitectura': {
        'descripcion': 'Arquitectura es el arte y técnica de proyectar, diseñar y construir edificios y estructuras.',
        'habilidades': ['creatividad', 'dibujo técnico', 'conocimientos de construcción', 'gestión de proyectos'],
        'salida_laboral': 'arquitecto, diseñador urbano, gestor de proyectos de construcción'
    },
    'Psicología': {
        'descripcion': 'Psicología es la ciencia que estudia el comportamiento humano y los procesos mentales.',
        'habilidades': ['empatía', 'escucha activa', 'análisis del comportamiento', 'asesoramiento'],
        'salida_laboral': 'psicólogo clínico, psicólogo educativo, psicólogo organizacional'
    }
}

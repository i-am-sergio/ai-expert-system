import sqlite3

def extraer_datos():
    conn = sqlite3.connect('carreras.db')
    cursor = conn.cursor()

    # Obtener la lista de tablas
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tablas = cursor.fetchall()

    carreras_preguntas = {}

    for tabla in tablas:
        nombre_tabla = tabla[0].replace("_", " ")
        cursor.execute(f"SELECT categoria, pregunta FROM {tabla[0]}")
        filas = cursor.fetchall()
        carreras_preguntas[nombre_tabla] = [(fila[0], fila[1]) for fila in filas]

    conn.close()
    return carreras_preguntas

# datos = extraer_datos()

# for carrera, preguntas in datos.items():
#     print(carrera)
#     for pregunta in preguntas:
#         print(pregunta)
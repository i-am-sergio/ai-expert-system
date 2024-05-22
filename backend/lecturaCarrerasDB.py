import sqlite3

def leer_datos():
    # Conectarse a la base de datos
    conn = sqlite3.connect('carreras.db')
    cursor = conn.cursor()

    # Diccionario para almacenar los datos
    carreras_datos = {}

    # Obtener la lista de tablas (carreras)
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tablas = cursor.fetchall()
    
    # Leer datos de cada tabla y almacenarlos en el diccionario
    for tabla in tablas:
        nombre_tabla = tabla[0]
        cursor.execute(f"SELECT categoria, pregunta FROM {nombre_tabla}")
        registros = cursor.fetchall()
        
        # Guardar los registros en una lista dentro del diccionario
        carreras_datos[nombre_tabla.replace("_", " ")] = registros

    # Cerrar la conexión
    conn.close()

    return carreras_datos

# Llamada a la función y mostrar el resultado
datos = leer_datos()
for carrera, registros in datos.items():
    print(f"Carrera: {carrera}")
    for categoria, pregunta in registros:
        print(f"  Categoría: {categoria}, Pregunta: {pregunta}")
    print()

    

def sistema_experto(carreras_datos):
    respuestas = {}

    for carrera, registros in carreras_datos.items():
        print(f"Evaluando la carrera: {carrera}")
        respuestas[carrera] = 0
        for categoria, pregunta in registros:
            respuesta = input(f"{pregunta} (sí/no): ").strip().lower()
            if respuesta == "sí":
                respuestas[carrera] += 1
    
    # Determinar la carrera más adecuada
    carrera_ideal = max(respuestas, key=respuestas.get)
    print(f"¡La carrera más adecuada para ti es: {carrera_ideal}!")

# Llamada al sistema experto con los datos leídos
sistema_experto(datos)


from flask import Flask, request, jsonify
from flask_cors import CORS
import db.extract_db as db
import os
from dotenv import load_dotenv
import db.user_db as user_db

load_dotenv()
puerto = os.getenv("PORT", 5000)
conocimiento = {}
conocido = []
current_symptom = None
diagnostico_actual = None
explicacion_diagnostico = []

def haz_diagnostico():
    global explicacion_diagnostico
    explicacion_diagnostico = []
    for diagnosis, sintomas in conocimiento.items():
        if prueba_presencia_de(sintomas):
            explicacion_diagnostico = [sintoma[1] for sintoma in sintomas if prueba_verdad_de(sintoma[1])]
            return diagnosis
    return None

def prueba_presencia_de(lista_de_sintomas):
    for sintoma in lista_de_sintomas:
        if not prueba_verdad_de(sintoma[1]):
            return False
    return True

def prueba_verdad_de(sintoma):
    return sintoma in conocido

def siguiente_sintoma():
    for diagnosis, sintomas in conocimiento.items():
        for sintoma in sintomas:
            if sintoma[1] not in conocido and 'no ' + sintoma[1] not in conocido:
                return sintoma[1]
    return None

def obtener_pregunta():
    global current_symptom, diagnostico_actual
    if diagnostico_actual:
        return jsonify({'diagnostico': diagnostico_actual, 'explicacion': explicacion_diagnostico})
    if current_symptom is None:
        current_symptom = siguiente_sintoma()
    if current_symptom is not None:
        return jsonify({'pregunta': f'Es verdad que {current_symptom}?'})
    else:
        diagnostico_actual = haz_diagnostico()
        if diagnostico_actual:
            return jsonify({'diagnostico': diagnostico_actual, 'explicacion': explicacion_diagnostico})
        return jsonify({'diagnostico': 'No hay suficiente conocimiento para elaborar un diagnostico.'})

def procesar_respuesta(data):
    global current_symptom, diagnostico_actual
    if 'respuesta' not in data:
        return jsonify({'error': 'Respuesta no proporcionada'}), 400
    respuesta = data['respuesta'].strip().lower()
    if respuesta not in ['si', 'no']:
        return jsonify({'error': 'Respuesta inválida'}), 400

    if respuesta == 'si':
        conocido.append(current_symptom)
    elif respuesta == 'no':
        conocido.append('no ' + current_symptom)

    diagnostico_actual = haz_diagnostico()
    if diagnostico_actual:
        return jsonify({'diagnostico': diagnostico_actual, 'explicacion': explicacion_diagnostico})

    current_symptom = siguiente_sintoma()
    if current_symptom is None:
        diagnostico_actual = haz_diagnostico()
        if diagnostico_actual:
            return jsonify({'diagnostico': diagnostico_actual, 'explicacion': explicacion_diagnostico})
        return jsonify({'diagnostico': 'No hay suficiente conocimiento para elaborar un diagnostico.'})
    return jsonify({'pregunta': f'Es verdad que {current_symptom}?'})

def nuevo_diagnostico():
    global conocido, current_symptom, diagnostico_actual, explicacion_diagnostico
    conocido = []
    current_symptom = None
    diagnostico_actual = None
    explicacion_diagnostico = []
    return jsonify({'mensaje': 'Diagnóstico reiniciado. Puede comenzar un nuevo diagnóstico.'})

def create_app():
    app = Flask(__name__)
    CORS(app)
    with app.app_context():
        global conocimiento
        conocimiento = db.extraer_datos()

    @app.route('/pregunta', methods=['GET'])
    def pregunta():
        return obtener_pregunta()

    @app.route('/respuesta', methods=['POST'])
    def respuesta():
        data = request.json
        return procesar_respuesta(data)
    
    @app.route('/nuevo_diagnostico', methods=['POST'])
    def nuevo_diagnostico_endpoint():
        return nuevo_diagnostico()
    
    @app.route('/conocimiento', methods=['GET'])
    def obtener_conocimiento():
        return jsonify(conocimiento)
    
    @app.route('/course', methods=['GET'])
    def nombres_tablas():
        nombres = db.obtener_nombres_tablas()
        return jsonify(nombres)
    
    @app.route('/register', methods=['POST'])
    def register():
        data = request.json
        if 'username' not in data or 'password' not in data:
            return jsonify({'error': 'Usuario y/o contraseña no proporcionados'}), 400
        username = data['username']
        password = data['password']
        if user_db.register(username, password):
            return jsonify({'mensaje': 'Usuario registrado exitosamente'})
        return jsonify({'error': 'Usuario ya existe'}), 400
    
    @app.route('/login', methods=['POST'])
    def login():
        data = request.json
        if 'username' not in data or 'password' not in data:
            return jsonify({'error': 'Usuario y/o contraseña no proporcionados'}), 400
        username = data['username']
        password = data['password']
        if user_db.login(username, password):
            return jsonify({'mensaje': 'Inicio de sesión exitoso'})
        return jsonify({'error': 'Usuario y/o contraseña incorrectos'}), 400
    
    @app.route('/')
    def index():
        return "Bienvenido al Sistema Experto. Usa /pregunta para empezar."

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True,host='0.0.0.0', port=int(puerto))

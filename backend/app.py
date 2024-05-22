from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# Base de conocimientos
conocimiento = {
    'cheeta': ['es mamífero', 'es carnívoro', 'tiene color leonado y puntos negros'],
    'tigre': ['es mamífero', 'es carnívoro', 'tiene color leonado', 'tiene rayas negras'],
    'jirafa': ['es ungulado', 'tiene cuello largo', 'tiene piernas largas'],
    'zebra': ['es ungulado', 'tiene rayas negras'],
    'aveztruz': ['es un pájaro', 'no vuela', 'tiene cuello largo'],
    'pingüino': ['es un pájaro', 'no vuela', 'sabe nadar', 'es blanco con negro'],
    'albatros': ['es un pájaro', 'aparece en historias marinas', 'vuela bien']
}

# Lista para almacenar los síntomas conocidos
conocido = []
current_symptom = None
diagnostico_actual = None
explicacion_diagnostico = []

@app.route('/pregunta', methods=['GET'])
def pregunta():
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

@app.route('/respuesta', methods=['POST'])
def respuesta():
    global current_symptom, diagnostico_actual
    data = request.json
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

def haz_diagnostico():
    global explicacion_diagnostico
    explicacion_diagnostico = []
    for diagnosis, sintomas in conocimiento.items():
        if prueba_presencia_de(sintomas):
            explicacion_diagnostico = [sintoma for sintoma in sintomas if prueba_verdad_de(sintoma)]
            return diagnosis
    return None

def prueba_presencia_de(lista_de_sintomas):
    for sintoma in lista_de_sintomas:
        if not prueba_verdad_de(sintoma):
            return False
    return True

def prueba_verdad_de(sintoma):
    return sintoma in conocido

def siguiente_sintoma():
    for diagnosis, sintomas in conocimiento.items():
        for sintoma in sintomas:
            if sintoma not in conocido and 'no ' + sintoma not in conocido:
                return sintoma
    return None

@app.route('/')
def index():
    return "Bienvenido al Sistema Experto. Usa /pregunta para empezar."

if __name__ == '__main__':
    app.run(debug=True)

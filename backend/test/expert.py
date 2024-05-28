# Base de conocimientos
# conocimiento = {
#     'sarampion': [
#         'el paciente esta cubierto de puntos', 
#         'el paciente tiene temperatura alta',
#         'el paciente tiene ojos rojos', 
#         'el paciente tiene tos seca'
#     ],
#     'influenza': [
#         'el paciente tiene dolor en las articulaciones', 
#         'el paciente tiene mucho estornudo',
#         'el paciente tiene dolor de cabeza'
#     ],
#     'malaria': [
#         'el paciente tiene temperatura alta', 
#         'el paciente tiene dolor en las articulaciones',
#         'el paciente tiembla violentamente', 
#         'el paciente tiene escalofrios'
#     ]
# }

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

def consulta():
    diagnostico = haz_diagnostico()
    if diagnostico:
        escribe_diagnostico(diagnostico)
        ofrece_explicacion_diagnostico(diagnostico)
    else:
        print('No hay suficiente conocimiento para elaborar un diagnostico.')
    clean_scratchpad()

def haz_diagnostico():
    for diagnosis, sintomas in conocimiento.items():
        if prueba_presencia_de(sintomas):
            return diagnosis
    return None

def prueba_presencia_de(lista_de_sintomas):
    for sintoma in lista_de_sintomas:
        if not prueba_verdad_de(sintoma):
            return False
    return True

def prueba_verdad_de(sintoma):
    if sintoma in conocido:
        return True
    if 'no ' + sintoma in conocido:
        return False
    respuesta = pregunta_sobre(sintoma)
    if respuesta == 'si':
        conocido.append(sintoma)
        return True
    elif respuesta == 'no':
        conocido.append('no ' + sintoma)
        return False
    else:
        return prueba_verdad_de(sintoma)  # Preguntar de nuevo hasta obtener 'si' o 'no'

def pregunta_sobre(sintoma):
    while True:
        respuesta = input(f'Es verdad que {sintoma}? (si/no/porque): ').strip().lower()
        if respuesta in ['si', 'no', 'porque']:
            return respuesta
        else:
            print('Debes contestar si, no o porque.')

def escribe_diagnostico(diagnostico):
    print(f'El diagnostico es {diagnostico}.')

def ofrece_explicacion_diagnostico(diagnostico):
    respuesta = pregunta_si_necesita_explicacion()
    if respuesta == 'si':
        sintomas = conocimiento[diagnostico]
        print('Se determino este diagnostico porque se encontraron los siguentes sintomas:')
        escribe_lista_de_sintomas(sintomas)

def pregunta_si_necesita_explicacion():
    while True:
        respuesta = input('Quieres que justifique este diagnostico? (si/no): ').strip().lower()
        if respuesta in ['si', 'no']:
            return respuesta
        else:
            print('Debes contestar si o no.')

def escribe_lista_de_sintomas(lista_de_sintomas):
    for sintoma in lista_de_sintomas:
        print(sintoma)

def clean_scratchpad():
    global conocido
    conocido = []

# Iniciar la consulta
consulta()

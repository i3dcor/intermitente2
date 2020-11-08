def on_microbit_id_button_a_evt_up():
    girar_izquierda()
    radio.send_string("izquierda")
control.on_event(EventBusSource.MICROBIT_ID_BUTTON_A,
    EventBusValue.MICROBIT_BUTTON_EVT_UP,
    on_microbit_id_button_a_evt_up)

def girar_izquierda():
    global intermitente
    if intermitente == -1:
        intermitente = 0
    else:
        intermitente = -1
def emergencia():
    global doble_intermitente
    if doble_intermitente != 0:
        doble_intermitente = 0
    else:
        doble_intermitente = 2

def on_microbit_id_button_ab_evt_up():
    emergencia()
control.on_event(EventBusSource.MICROBIT_ID_BUTTON_AB,
    EventBusValue.MICROBIT_BUTTON_EVT_UP,
    on_microbit_id_button_ab_evt_up)

def on_microbit_id_button_b_evt_up():
    girar_derecha()
    radio.send_string("derecha")
control.on_event(EventBusSource.MICROBIT_ID_BUTTON_B,
    EventBusValue.MICROBIT_BUTTON_EVT_UP,
    on_microbit_id_button_b_evt_up)

def on_received_string(receivedString):
    if receivedString == "izquierda":
        girar_izquierda()
    else:
        if receivedString == "derecha":
            girar_derecha()
radio.on_received_string(on_received_string)

def girar_derecha():
    global intermitente
    if intermitente == 1:
        intermitente = 0
    else:
        intermitente = 1
doble_intermitente = 0
intermitente = 0
intermitente = 0
doble_intermitente = 0
radio.set_group(69)

def on_forever():
    if intermitente == 1:
        images.create_image("""
            . . # . .
            . . . # .
            . # # # #
            . . . # .
            . . # . .
            """).scroll_image(-1, 200)
    else:
        if intermitente == -1:
            images.create_image("""
                . . # . .
                . # . . .
                # # # # .
                . # . . .
                . . # . .
                """).scroll_image(1, 200)
        else:
            if doble_intermitente != 0:
                basic.show_leds("""
                    . . # . .
                    . # # # .
                    # # # # #
                    . # # # .
                    . # # # .
                    """)
            basic.pause(100)
            basic.clear_screen()
            basic.pause(100)
basic.forever(on_forever)

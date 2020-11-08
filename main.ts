control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_A, EventBusValue.MICROBIT_BUTTON_EVT_UP, function () {
    girar_izquierda()
    radio.sendString("izquierda")
})
function girar_izquierda () {
    if (intermitente == -1) {
        intermitente = 0
    } else {
        intermitente = -1
    }
}
function emergencia () {
    if (doble_intermitente != 0) {
        doble_intermitente = 0
    } else {
        doble_intermitente = 2
    }
}
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_AB, EventBusValue.MICROBIT_BUTTON_EVT_DOWN, function () {
    emergencia()
})
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_B, EventBusValue.MICROBIT_BUTTON_EVT_UP, function () {
    girar_derecha()
    radio.sendString("derecha")
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "izquierda") {
        girar_izquierda()
    } else {
        if (receivedString == "derecha") {
            girar_derecha()
        }
    }
})
function girar_derecha () {
    if (intermitente == 1) {
        intermitente = 0
    } else {
        intermitente = 1
    }
}
let doble_intermitente = 0
let intermitente = 0
let imagen_izquierda = images.createImage(`
    . . # . .
    . # . . .
    # # # # .
    . # . . .
    . . # . .
    `)
let imagen_derecha = images.createBigImage(`
    . # . . . . # . . .
    . . # . . . . # . .
    # # # # . # # # # .
    . . # . . . . # . .
    . # . . . . # . . .
    `)
radio.setGroup(69)
basic.forever(function () {
    if (intermitente == -1) {
        imagen_izquierda.scrollImage(1, 400)
    } else {
        if (intermitente == 1) {
            imagen_derecha.showImage(5)
            imagen_derecha.showImage(4)
            imagen_derecha.showImage(3)
            imagen_derecha.showImage(2)
            imagen_derecha.showImage(1)
        } else {
            if (doble_intermitente != 0) {
                basic.showLeds(`
                    . . # . .
                    . # # # .
                    # # # # #
                    . # # # .
                    . # # # .
                    `)
            }
            basic.pause(100)
            basic.clearScreen()
            basic.pause(100)
        }
    }
})

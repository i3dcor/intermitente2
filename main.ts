function girar_izquierda () {
    if (intermitente == -1) {
        intermitente = 0
    } else {
        intermitente = -1
    }
}
input.onButtonPressed(Button.A, function () {
    girar_izquierda()
    radio.sendString("izquierda")
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
input.onButtonPressed(Button.B, function () {
    girar_derecha()
    radio.sendString("derecha")
})
function girar_derecha () {
    if (intermitente == 1) {
        intermitente = 0
    } else {
        intermitente = 1
    }
}
let intermitente = 0
intermitente = 0
let derecha = 0
let izquierda = 0
radio.setGroup(69)
basic.forever(function () {
    if (intermitente == 1) {
        images.createImage(`
            . . # . .
            . . . # .
            . # # # #
            . . . # .
            . . # . .
            `).scrollImage(-1, 200)
    } else {
        if (intermitente == -1) {
            images.createImage(`
                . . # . .
                . # . . .
                # # # # .
                . # . . .
                . . # . .
                `).scrollImage(1, 200)
        } else {
            basic.showLeds(`
                . . # . .
                . # # # .
                # # # # #
                . # # # .
                . # # # .
                `)
            basic.pause(100)
            basic.clearScreen()
            basic.pause(100)
        }
    }
})

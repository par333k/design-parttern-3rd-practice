export class ColorConsole {
    constructor(colorStr) {
        this.color = colorStr
    }

    log() {
        console.log(`색상 :: ${this.color}`)
    }
}

export class RedConsole extends ColorConsole {
    constructor() {
        super('Red')
    }
}

export class BlueConsole extends ColorConsole {
    constructor() {
        super('Blue')
    }
}

export class GreenConsole extends ColorConsole {
    constructor() {
        super('Green')
    }
}


import { RedConsole, BlueConsole, GreenConsole} from './color-console.js'

export class ColorFactory {
    static setColor (typeStr) {
        switch(typeStr) {
            case 'Red':
                return new RedConsole();
            case 'Blue':
                return new BlueConsole();
            case 'Green':
                return new GreenConsole();
            default:
                return new Error('색상이 없다');
        }
    }
}


import { ColorFactory } from './color-factory.js'

let colorLog = ColorFactory.setColor(process.argv[2])
colorLog.log()
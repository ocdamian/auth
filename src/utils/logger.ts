
import winston from 'winston';
import moment from "moment";

export const factoryLogger = (dafaultMeta?: any) => {
  return winston.createLogger({
    levels: { error: 1, warn: 2, info: 3, notice: 4, debug: 5, silly: 6 },
    defaultMeta: dafaultMeta,
    transports: _createTransports(),
    exitOnError: false,
  });
}

const _createTransports = () => {
  const TRANSPORTS = []
  TRANSPORTS.push(new winston.transports.Console({
    format: winston.format.printf(_consoleFormat()),
    level: 'silly', // Muestra logs de nivel 6 o menor
    handleExceptions: false,
  }))

  return TRANSPORTS
}

const _consoleFormat = () => {
  return (info: any) => {
    const START = COLORS[info.level]
    const END = COLORS.reset
    const TIMESTAMP = moment().format('DD/MM/YYYY HH:mm:ss')
    const LEVEL = info.level
    const MESSAGE = info.message
    const CALLER = info._caller ? info._caller : ''
    const DATA = info.data ? info.data : ''
    return `${START}[${TIMESTAMP}] [${LEVEL}] ${MESSAGE} ${CALLER} ${DATA} ${END}`
  }
}

const COLORS: { [key: string]: string } = {
  error: `\x1b[91m`, // LIGHT_RED
  warn: `\x1b[93m`, // LIGHT_YELLOW
  info: `\x1b[96m`, // LIGHT_CYAN
  notice: `\x1b[92m`, // LIGHT_GREEN
  debug: `\x1b[94m`, // LIGHT_BLUE
  silly: `\x1b[95m`, // LIGHT_MAGENTA
  reset: `\x1b[0m`,  // Restaura al color por defecto
}
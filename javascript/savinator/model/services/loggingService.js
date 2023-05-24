/*
	DEPENDENCIES --------------------------------------------------------------------------------
*/

import { createLogger, transports } from 'winston';

import savinatorSettings from '../../utility/savinatorSettings.js';
const { loggerConfig } = savinatorSettings;


/*
	LOGGER ---------------------------------------------------------------------------------------------
*/

const logger = createLogger({
	transports: [ new transports.Console({ level: loggerConfig.level}) ]
});


/*
	EXPORTS ----------------------------------------------------------------------------
*/

export default logger;
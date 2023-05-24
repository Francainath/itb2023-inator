/*
	DEPENDENCIES --------------------------------------------------------------------------------
*/

import { createLogger, transports } from 'winston';

import accessinatorSettings from '../../utility/accessinatorSettings.js';
const { loggerConfig } = accessinatorSettings;


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
/*
	DEPENDENCIES --------------------------------------------------------------------------------
*/

import { createLogger, transports } from 'winston';

import reportinatorSettings from '../../utility/reportinatorSettings.js';
const { loggerConfig } = reportinatorSettings;


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
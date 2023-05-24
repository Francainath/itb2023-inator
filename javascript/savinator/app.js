/*
	DEPENDENCIES -----------------------------------------------------------------------------------------------------------------------------
*/

import express from 'express';
const app = express();

import logger from './model/services/loggingService.js';

import savinatorSettings from './utility/savinatorSettings.js';
const { port } = savinatorSettings;


/*
	ROUTES -----------------------------------------------------------------------------------------------------------------------------------
*/

import savinatorRoutes from './routes/savinatorRoutes.js';
app.use('/', savinatorRoutes);


/*
	SETUP & EXPORTS ---------------------------------------------------------------------------------------------------------------------------
*/

try {
	const server = app
		.listen(port)
		.on('listening', () => logger.info(`Savinator listening on port ${server.address().port}`));
} catch(e) {
	logger.error(e);
}
/*
	DEPENDENCIES -----------------------------------------------------------------------------------------------------------------------------
*/

import express from 'express';
const app = express();

import logger from './model/services/loggingService.js';

import accessinatorSettings from './utility/accessinatorSettings.js';
const { port } = accessinatorSettings;


/*
	ROUTES -----------------------------------------------------------------------------------------------------------------------------------
*/

import accessinatorRoutes from './routes/accessinatorRoutes.js';
app.use('/', accessinatorRoutes);


/*
	SETUP & EXPORTS ---------------------------------------------------------------------------------------------------------------------------
*/

try {
	const server = app
		.listen(port)
		.on('listening', () => logger.info(`Accessinator listening on port ${server.address().port}`));
} catch(e) {
	logger.error(e);
}
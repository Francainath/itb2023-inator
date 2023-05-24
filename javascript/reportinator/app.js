/*
	DEPENDENCIES -----------------------------------------------------------------------------------------------------------------------------
*/

import express from 'express';
const app = express();

import logger from './model/services/loggingService.js';

import reportinatorSettings from './utility/reportinatorSettings.js';
const { port } = reportinatorSettings;


/*
	ROUTES -----------------------------------------------------------------------------------------------------------------------------------
*/

import reportinatorRoutes from './routes/reportinatorRoutes.js';
app.use('/', reportinatorRoutes);


/*
	SETUP & EXPORTS ---------------------------------------------------------------------------------------------------------------------------
*/

try {
	const server = app
		.listen(port)
		.on('listening', () => logger.info(`Reportinator listening on port ${server.address().port}`));
} catch(e) {
	logger.error(e);
}
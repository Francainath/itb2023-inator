/*
	DEPENDENCIES ----------------------------------------------------------------------------------------------------------------------------
*/

import express from 'express';
const accessinatorRoutes = express.Router();

import bodyParser from 'body-parser';
accessinatorRoutes.use(bodyParser.json({limit: '5mb'}));

accessinatorRoutes.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});

import logger from '../model/services/loggingService.js';

import utilityFunctions from '../utility/utilityFunctions.js';
const { processError, isObjectWithProperty } = utilityFunctions;

import propagateRequest from '../model/services/requestPropagationService.js';


/*
	GREETING --------------------------------------------------------------------------------------------------------------------------------------------
*/

accessinatorRoutes.get('/greeting', (req, res) => {
	return res.status(200).json({ greeting: 'Hello! Welcome to the Accessinator!', language:'JavaScript'});
});


/*
	PROCESS ROUTES ------------------------------------------------------------------------------------------------------------------------------------------------
*/

accessinatorRoutes.post('/process', checkData, async (req, res) => {
	try {
		logger.debug(`/process request time:${Date.now()}, data:${JSON.stringify(req.body)}`);

		const returnData = await propagateRequest(req.body);

		return res.status(200).json(returnData);
	} catch(e) {
		processError(logger, 'accessinatorRoutes.route.process.error', e);
		return res.status(400).json(e);
	}
});


/*
	HELPER FUNCTIONS ---------------------------------------------------------------------------------------------------------------------------
*/

function checkData(req, res, next) {
	try {
		if(!isObjectWithProperty(req.body, 'data')) {
			return res.status(200).json({ error: 'no data to process through Accessinator!' });
		} else {
			next();
		}
	} catch(e) {
		processError(logger, 'accessinator.checkData.error', e);
		return res.status(400).json(e);
	}
}


/*
	EXPORTS ------------------------------------------------------------------------------------------------------------------------------------------------
*/

export default accessinatorRoutes;
import { Handler } from '@netlify/functions';
const axios = require('axios');

const handler: Handler = async (event, context) => {

	const data = JSON.stringify({
		"collection": "press",
		"database": "staticDb",
		"dataSource": "Cluster0",
	});

	const config = {
		method: 'post',
		url: 'https://data.mongodb-api.com/app/data-pcuoo/endpoint/data/v1/action/find',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Request-Headers': '*',
			'api-key': process.env.API_KEY_MONGODB,
		},
		data: data
	};

	return axios(config)
		.then(function (response) {
			return {
				statusCode: 200,
				body: JSON.stringify({ message: response.data }),
			};
		})
		.catch(function (error) {
			return {
				statusCode: 200,
				body: JSON.stringify({ message: error }),
			};
		});



};

export { handler };

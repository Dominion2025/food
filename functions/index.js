const functions = require("firebase-functions");
const fetch = require("node-fetch");

exports.fetchHtml = functions.https.onRequest(async (req, res) => {
	const url = req.query.url;

	if (!url) {
		return res.status(400).send("Missing ?url parameter");
	}

	try {
		const response = await fetch(url);
		const html = await response.text();
		res.set("Access-Control-Allow-Origin", "*"); // allow frontend to call this
		res.send(html);
	} catch (error) {
		res.status(500).send("Error fetching URL");
	}
});

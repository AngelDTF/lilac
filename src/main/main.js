const browser = process.argv.includes('--browser');
const { output } = require('./output');

if (browser)
{
	const http = require('http');
	const fs = require('fs');
	const config = require('../../config.json').browser;

	const server = http.createServer((request, response) =>
	{
		try
		{
			output.info(`URL Request: ${request.url}`);

			/* Redirects Start */
			if (request.url == '/')
			{
				output.info(`Redirecting URL '/' to '/static/html/index.html'.`);
				response.writeHead(302, { 'Location': 'static/html/index.html' });
				response.end();
				return;
			}
			else if (request.url == '/favicon.ico')
			{
				output.info(`Redirecting Data '/favicon.ico' to '/static/ico/favicon.ico'.`);
				request.url = '/static/ico/favicon.ico';
			}
			/* Redirects End */

			const data = fs.readFileSync(__dirname.slice(0, -9) + request.url);
			if (request.url.startsWith('/static/html'))
				response.setHeader('Content-Type', 'text/html');
			else if (request.url.startsWith('/static/css'))
				response.setHeader('Content-Type', 'text/css');
			else if (request.url.startsWith('/static/js'))
				response.setHeader('Content-Type', 'text/javascript');
			response.writeHead(200);
			response.end(data);
		}
		catch (err)
		{
			output.error(err);
			response.end(err.toString());
		}
	});

	server.listen(config.port, config.host, () =>
	{
		output.info(`Listening on host http://${config.host}:${config.port}`);
	});
}
else
{
	const { app, BrowserWindow } = require('electron');

	function CreateWindow()
	{
		const win = new BrowserWindow(
		{
			width: 1080,
			height: 716
		});

		win.loadFile('static/html/index.html');
	}

	app.whenReady().then(CreateWindow);
}
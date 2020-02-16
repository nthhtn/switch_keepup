import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import webpack from 'webpack';
import redis from 'redis';

import db from './server/models';
import { redis_host } from './config/redis';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/assets', express.static(`${__dirname}/static`));

const redisStore = require('connect-redis')(session);
const redisClient = redis.createClient();

app.use(session({
	secret: 'master_thesis',
	resave: false,
	saveUninitialized: false,
	store: new redisStore({ host: redis_host, port: 6379, client: redisClient })
}));

app.use(morgan('dev'));

import config from './webpack.config';
const compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

const syncOptions = {};
// const syncOptions = { force: true };
db.sequelize.sync(syncOptions).then(async (connection) => {
	console.log('Database setup complete...');
	require('./server/routes')(app);
	app.listen(8000, () => console.log('Switch KeepUp is listening on port 8000...'));
});

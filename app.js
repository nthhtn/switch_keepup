import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import webpack from 'webpack';
import passport from 'passport';

import db from './server/models';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/assets', express.static(`${__dirname}/static`));

app.use(session({
	secret: 'master_thesis',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
	console.log('serialize');
	console.log(user);
	return done(null, user);
});

passport.deserializeUser((user, done) => {
	console.log('deserialize');
	return done(null, user);
});

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
	await require('./server/helpers/initdb')();
	app.listen(8000, () => console.log('Switch KeepUp is listening on port 8000...'));
});

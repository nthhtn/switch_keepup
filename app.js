import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import webpack from 'webpack';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/assets', express.static(`${__dirname}/static`));

app.use(morgan('dev'));

import config from './webpack.config';
const compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

require('./server/routes')(app);

app.listen(8000, () => console.log('Switch KeepUp is listening on port 8000...'));

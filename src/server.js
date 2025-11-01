import app from './app.js';
import './database/index.js';
import 'dotenv/config';

app.listen(process.env.APP_PORT, () =>
  console.log('Apliction running on port 3001'),
);

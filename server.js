const app = require('./app');
const config = require('./app/configs/app');

app.listen(config.port, () => console.log(`Connected to ${config.url}:${config.port}`));

import app from './app';
import { config, connectDB, initConfig } from './config';

function initProject() {
  initConfig();
  connectDB();
}

initProject();

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});

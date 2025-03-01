import app from './app';
import { config, connectDB, initConfig } from './config';

async function initProject() {
  initConfig();
  await connectDB();
}

initProject()
  .then(() => {
    console.log('Database connected successfully');

    app.listen(config.port, () => {
      console.log(`Server is running on http://localhost:${config.port}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
    process.exit(1);
  });

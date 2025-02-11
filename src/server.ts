import app from './app';
import { config, connectDB, initConfig } from './config';
initConfig();
connectDB();

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});

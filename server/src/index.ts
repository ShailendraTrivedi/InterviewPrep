import config from './config';
import { connectDB, environmentName, mongoKind } from './config/db';
import app from './app';

async function start() {
  await connectDB();
  app.listen(config.env.PORT, () => {
    const port = config.env.PORT;
    const uri = config.env.MONGODB_URI;
    console.log(`Environment: ${environmentName()}`);
    console.log(`MongoDB: ${mongoKind(uri)}`);
    console.log(`Host URL: http://localhost:${port}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

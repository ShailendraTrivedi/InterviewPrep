import 'dotenv/config';

function extractEnv(variable: string, defaultValue = ''): string {
  return process.env[variable] ?? defaultValue;
}

export const constant = {
  MONGO_USER: extractEnv('MONGO_USER'),
  MONGO_PASSWORD: extractEnv('MONGO_PASSWORD'),
  MONGO_DATABASE: extractEnv('MONGO_DATABASE', 'interviewprep'),
  MONGO_HOST: extractEnv('MONGO_HOST'),
} as const;

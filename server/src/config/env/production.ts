import { constant } from '../../constant';

export function buildAtlasMongoUri(): string {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE, MONGO_HOST } = constant;
  const user = encodeURIComponent(MONGO_USER);
  const pass = encodeURIComponent(MONGO_PASSWORD);
  return `mongodb+srv://${user}:${pass}@${MONGO_HOST}/${MONGO_DATABASE}?retryWrites=true&w=majority`;
}

export default {
  MONGODB_URI: buildAtlasMongoUri(),
  MONGODB_USE_PUBLIC_DNS: true,
  MONGODB_DNS_SERVERS: '8.8.8.8,1.1.1.1',
} as const;

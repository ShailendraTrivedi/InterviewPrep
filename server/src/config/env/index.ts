import 'dotenv/config';
import development from './development';
import production from './production';

const base = process.env.NODE_ENV === 'production' ? production : development;

export default {
  ...base,
} as const;
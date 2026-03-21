import 'dotenv/config';
import development from './development';
import production from './production';
import { constant } from '../../constant';

const base = constant.NODE_ENV === 'production' ? production : development;

export default {
  PORT: 5000,
  NODE_ENV: constant.NODE_ENV,
  ...base,
} as const;
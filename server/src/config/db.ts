import config from '.';
import dns from 'node:dns';
import mongoose from 'mongoose';

export function environmentName(): 'Production' | 'Development' {
  return config.env.NODE_ENV === 'production' ? 'Production' : 'Development';
}

export function mongoKind(uri: string): 'Atlas' | 'Local' | 'Remote' {
  const u = uri.toLowerCase();
  if (u.startsWith('mongodb+srv://') || u.includes('.mongodb.net')) {
    return 'Atlas';
  }
  if (u.includes('localhost') || u.includes('127.0.0.1')) {
    return 'Local';
  }
  return 'Remote';
}

export function applyMongoSrvDns(uri: string): void {
  if (!uri.startsWith('mongodb+srv://')) return;
  if (!config.env.MONGODB_USE_PUBLIC_DNS) return;

  const servers = config.env.MONGODB_DNS_SERVERS.split(',')
    .map((s: string) => s.trim())
    .filter(Boolean);
  dns.setServers(servers.length > 0 ? servers : ['8.8.8.8', '1.1.1.1']);
}

export async function connectDB(): Promise<void> {
  const uri = config.env.MONGODB_URI;
  applyMongoSrvDns(uri);
  try {
    await mongoose.connect(uri);
  } catch (err) {
    console.error('MongoDB connection failed.');
    process.exit(1);
  }
}

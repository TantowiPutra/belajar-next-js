import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './lib/drizzle',
  schema: './lib/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_JgNFSVQ27rOo@ep-long-mountain-a49nmcxj-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require',
  },
});
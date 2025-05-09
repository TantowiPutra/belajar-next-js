import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon("postgresql://neondb_owner:npg_JgNFSVQ27rOo@ep-long-mountain-a49nmcxj-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require");
const db = drizzle({ client: sql });

export { db }
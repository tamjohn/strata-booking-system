import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: 'eps2669'
});

export default pool;
import envJSON from './env.json';

interface env {
  database: { name: string; user: { name: string; password: string } };
  server: { port: number };
}

const ENV: env = envJSON;

export default ENV;

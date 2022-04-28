import { MongoClient, ServerApiVersion } from 'mongodb';
import ENV from '../env';

const uri = `mongodb+srv://${ENV.database.user.name}:${ENV.database.user.password}@cluster0.0lhsz.mongodb.net/${ENV.database.name}?retryWrites=true&w=majority`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
};

const client = new MongoClient(uri, options);

export const fetchMovie = (movieTitle?: string) => {
  return new Promise((resolve, reject) => {
    client.connect(async (err) => {
      if (err) reject(err);

      const database = client.db('sample_mflix');
      const collection = database.collection('movies');
      const query = { title: 'Back to the Future' };
      const movie = await collection.findOne(query);

      client.close();

      resolve(movie);
    });
  });
};

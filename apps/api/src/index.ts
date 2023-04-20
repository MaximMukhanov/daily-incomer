import { createServer } from 'api/src/services/server';

const port = process.env.PORT || 3001;
const server = createServer();

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});

import app from './config/express';

const PORT = process.env.PORT || 5000;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });
};

export {startServer};

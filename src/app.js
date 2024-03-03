const Hapi = require('@hapi/hapi');
const { loadModel, predict } = require('./inference');

(async () => {
  // Load and get machine learning model
  const model = await loadModel();
  console.log('Model loaded');

  // Init HTTP Server
  const server = Hapi.server({
    port: 3000,
    host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
  });

  server.route({
    method: 'POST',
    path: '/predicts',

    handler: async (request) => {
      // Get image that uploaded by user
      const { image } = request.payload;
      // Predict by passing model and image
      const predictions = await predict(model, image);

      // Return the predictions
      const [paper, rock] = predictions;

      if (paper) {
        return { result: 'paper' };
      }

      if (rock) {
        return { result: 'rock' };
      }

      return { result: 'scissors' };
    },

    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
      },
    },
  });
  await server.start();

  console.log('Server running on %s', server.info.uri);
})();

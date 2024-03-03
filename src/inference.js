const tfjs = require('@tensorflow/tfjs-node');

/**
+ * Loads a model from the specified URL.
+ *
+ * @return {Promise<tf.LayersModel>} The loaded layers model
+ */
function loadModel() {
  const modelUrl = 'file://models/model.json';
  return tfjs.loadLayersModel(modelUrl);
}

/**
 * Predicts the output based on the given model and image buffer.
 *
 * @param {tfjs.model} model - The model used for prediction
 * @param {Buffer} imageBuffer - The image buffer to be used for prediction
 * @return {Array} The predicted data
 */
function predict(model, imageBuffer) {
  const tensor = tfjs.node.decodeJpeg(imageBuffer).resizeNearestNeighbor([150, 150]).expandDims().toFloat();
  return model.predict(tensor).data();
}

module.exports = {
  loadModel,
  predict,
};

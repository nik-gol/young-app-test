const { Prediction } = require('../src/api.js');
const assert = require("assert");

describe('prediction', function() {
  it('correct-request', async function() {
    const prediction = new Prediction();
    const data = await prediction.getPrediction("Send an email to mom");
    assert.notEqual(data.prediction.topIntent, 'None');
    assert.notEqual(data.prediction.topIntent, undefined);
  });
});

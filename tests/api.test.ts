import Prediction from "../src/api";
const assert = require("assert");
const sinon = require("sinon");
const fs = require("fs");
const axios = require("axios");

afterEach(() => {
  sinon.restore()
});


describe('prediction', function() {
  describe('getPrediction', function() {
    var fixtures;

    before(() => {
      fixtures = JSON.parse(fs.readFileSync('tests/fixtures.json'));
    });
    
    it('getPredictionReturnsRequest', async function() {
      const fixture = fixtures['send-an-email-to-mom'];
      const resolved = new Promise((r) => r({ data: fixture }));

      const request = { method: (URL) => {
        console.log(fixture);
        return resolved;
      }}

      sinon.replace(axios, 'get', request.method);

      const mock = sinon.mock(axios, 'get', request.method);

      /* const request = { method: (URL) => {
        console.log(fixture);
        return { data: fixture };
      }} */

      const prediction = new Prediction();

      mock.expects("get").once();

      const data = await prediction.getPrediction("Send an email to mom");
      mock.verify();
    });

    it('getPredictionReturnsSameQuery', async function() {
      const makeFixtureName = (str) => {
        str = str.charAt(0).toLowerCase() + str.slice(1);
        return str.split(" ").join("-");
      }

      const query = 'Send an email to mom';
      const fixtureName = makeFixtureName(query);
      const fixture = fixtures[fixtureName];
      const request = { method: (_) => {
        return { data: fixture };
      }}
      const mock = sinon.mock(request);
      mock.expects("method").once();

      const prediction = new Prediction();

      sinon.replace(prediction, 'request', request.method);
      const data = await prediction.getPrediction(query);
      assert.equal(data.query, query);
    });

    it('test-wrong-queryParams-type'), async function() {
    }

    it('test-fails-request-with-wrong-query-params'), async function() {
    }

    /* it('found-predictions', async function() {
      const prediction = new Prediction();
      const data = await prediction.getPrediction("Send an email to mom");
      assert.notEqual(data.prediction.topIntent, 'None');
      assert.notEqual(data.prediction.topIntent, undefined);
    });

    it('not-found-predictions', async function() {
      const prediction = new Prediction();
      const data = await prediction.getPrediction("asdjn23b1");
      assert.equal(data.prediction.topIntent, 'None');
    });

    it('found-several-entities-prediction', async function() {
    }); */
  });
});

require('dotenv').config();

const queryString = require('querystring');
const readline = require('readline');

const axios = require('axios');


/**
 * Get prediction data from LUIS by utterance
 * @constructor
 * @description Set up queryParams for buildUrl method
**/
class Prediction {
  /**
   * Set up queryParams to object as parametrs for request
  **/
  constructor() {
    this.queryParams = {
      'show-all-intents': true,
      'verbose': true,
      'subscription-key': process.env.LUIS_PREDICTION_KEY,
    };
  }

  /**
   * Build url using utterance as phrase to LUIS analization
   * @param {string} utterance - phrase which will added to url arg
   * @return {string} LUIS endpoint
  **/
  #buildUrl(utterance) {
    this.queryParams['query'] = utterance;

    const URL = `${process.env.LUIS_ENDPOINT}luis/prediction/v3.0`+
                `/apps/${process.env.LUIS_APP_ID}/slots/staging/predict?` +
                `${queryString.stringify(this.queryParams)}`;

    return URL;
  }

  /**
   * Make request to LUIS service
   * @async
   * @param {string} URL - url to LUIS endpoint
   * @return {Promise} Represent response from LUIS service
  **/
  async #request(URL) {
    try {
      return await axios.get(URL);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Get prediction data from LUIS service by utterance
   * @async
   * @param {string} utterance - phrase to analyze by LUIS service
  **/
  async getPrediction(utterance) {
    const URL = this.#buildUrl(utterance);
    const response = await this.#request(URL);
    return response.data;
  }
}

const isObjectEmpty = (obj) => Object.entries(obj).length === 0;

/**
 * Function for show result returned from getPrediction
 * method of Prediction class
 * @param {string} utterance - phrase to analyzi by LUIS service
 */
async function analyzePhrase(utterance) {
  const prediction = new Prediction();

  prediction.getPrediction(utterance).then((data) => {
    // exit with message if no results found
    if (data.prediction.topIntent === 'None' ||
      isObjectEmpty(data.prediction.entities)) {
      console.log(`Seems like there is no match` +
                  `with your query: ${data.query}`);
      console.log(`Try again`);
      process.exit(1);
    }

    // show results
    console.log(`These results I found`);
    /* eslint guard-for-in: "off" */
    for (const entity in data.prediction.entities) {
      if (entity == '$instance') {
        break;
      }

      console.log(`Entity '${entity}':`);
      data.prediction.entities[entity].forEach(
          (val) => console.log(`    ${val}`),
      );
    }

    process.exit(0);
  });
}

if (require.main === module) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Email? Okay, send me a query.' +
            'For example: \'Send an email to mom\'\n',
  analyzePhrase,
  );
} 

module.exports.Prediction = Prediction;

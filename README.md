## Prerequisites:
  [Yarn](https://classic.yarnpkg.com/en/docs/install#debian-stable)
  [nodeJs Lts(14.15.X)](https://nodejs.org/en/download/)

## How to use:

#### Set up env variables
##### TIP: You can copy `.env.example` to `.env`

Register [LUIS application](https://www.luis.ai/). [How-to](https://docs.microsoft.com/en-us/azure/cognitive-services/luis/sign-in-luis-portal)
Then publish your app as described [here][https://docs.microsoft.com/en-us/azure/cognitive-services/luis/luis-how-to-publish-app]
In tab manage you can find all necessary credentials

Fill them in `.env` file

#### Clone repository
```git clone https://github.com/nik-gol/young-app-test.git```

#### Install project dependecies
```yarn install```

#### Run app
```yarn start```

#### Run tests
```yarn test```

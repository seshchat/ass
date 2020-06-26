# Ass
Ass creates a mock REST server for your app to communicate with to fake its state for App Store / Play Store / whatever

## Installation
```bash
npm i -g @seshchat/ass
```
```bash
yarn global add @seshchat/ass
```

## Usage
Create an `Assfile.json` containing information about your mock server. Here's an example:
```json
{
  "name": "SESH",
  "port": 4000,

  "options": [{
    "name": "Onboarding",
    
    "endpoints": [{
      "method": "POST",
      "endpoint": "/graphql",

      "statusCode": 200,
      "body": {
        "hello": "world"
      }
    }]
  }, {
    "name": "Chat",

    "endpoints": [{
      "method": "POST",
      "endpoint": "/graphql",

      "statusCode": 200,
      "body": {
        "hello": "world",
        "x": 0
      }
    }]
  }]
}
```

Then start the Ass server:
```bash
ass ./Assfile.json
```

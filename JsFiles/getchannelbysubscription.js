
var fs = require('fs');
var readline = require('readline');
var {google} = require('googleapis');
//var { googleAuth } = require('google-auth-library');
const { OAuth2Client } = require('google-auth-library');
var sub;
var CircularJSON = require('circular-json');
var SCOPES = ['https://www.googleapis.com/auth/youtube.force-ssl']
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'google-apis-nodejs-quickstart.json';
var dbChannel = require('./mongoconnection');

console.log('after tokenpath');

// Load client secrets from a local file.
async function getdata(){
    console.log('getdata');
    try{
      let content = fs.readFileSync('./JsFiles/client_secret.json');
      //console.log("content", JSON.parse(content));
    return await  authorize(JSON.parse(content), {'params': {'mine': 'true',
      'part': 'snippet','maxResults': '25'}}, subscriptionsListMySubscriptions);

    }catch(e){
      console.log('Error loading client secret file: ' + err);
      return;  
   }
// fs.readFile('./JsFiles/client_secret.json', function(err, content) {
//   if (err) {
//     console.log('Error loading client secret file: ' + err);
//     return;
//   }
//   //Authorize a client with the loaded credentials, then call the YouTube API.
//   console.log("content", JSON.parse(content));
//  return authorize(JSON.parse(content), {'params': {'mine': 'true',
//                  'part': 'snippet'}}, subscriptionsListMySubscriptions);

// });
}
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(credentials, requestData, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  //var auth = new googleAuth();
 // var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
  var oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);

  try {
    let token =  fs.readFileSync(TOKEN_PATH);
    oauth2Client.credentials = JSON.parse(token);
    let data1 = await callback(oauth2Client, requestData);
    //console.log("data", data1);
    return data1;
  }catch(err){
    getNewToken(oauth2Client, requestData, callback);
  }
  // Check if we have previously stored a token.
  // fs.readFile(TOKEN_PATH, function(err, token) {
  //   if (err) {
  //     getNewToken(oauth2Client, requestData, callback);
  //   } else {
  //     oauth2Client.credentials = JSON.parse(token);
  //     callback(oauth2Client, requestData);
  //   }
  // });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, requestData, callback) {
  console.log("getNewTOken");
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client, requestData);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Remove parameters that do not have values.
 *
 * @param {Object} params A list of key-value pairs representing request
 *                        parameters and their values.
 * @return {Object} The params object minus parameters with no values set.
 */
function removeEmptyParameters(params) {
  for (var p in params) {
    if (!params[p] || params[p] == 'undefined') {
      delete params[p];
    }
  }
  return params;
}

/**
 * Create a JSON object, representing an API resource, from a list of
 * properties and their values.
 *
 * @param {Object} properties A list of key-value pairs representing resource
 *                            properties and their values.
 * @return {Object} A JSON object. The function nests properties based on
 *                  periods (.) in property names.
 */
function createResource(properties) {
  var resource = {};
  var normalizedProps = properties;
  for (var p in properties) {
    var value = properties[p];
    if (p && p.substr(-2, 2) == '[]') {
      var adjustedName = p.replace('[]', '');
      if (value) {
        normalizedProps[adjustedName] = value.split(',');
      }
      delete normalizedProps[p];
    }
  }
  for (var p in normalizedProps) {
    // Leave properties that don't have values out of inserted resource.
    if (normalizedProps.hasOwnProperty(p) && normalizedProps[p]) {
      var propArray = p.split('.');
      var ref = resource;
      for (var pa = 0; pa < propArray.length; pa++) {
        var key = propArray[pa];
        if (pa == propArray.length - 1) {
          ref[key] = normalizedProps[p];
        } else {
          ref = ref[key] = ref[key] || {};
        }
      }
    };
  }
  return resource;
}


function subscriptionsListMySubscriptions(auth, requestData) {
  var service = google.youtube('v3');
  var parameters = removeEmptyParameters(requestData['params']);
  parameters['auth'] = auth;
  let promise = new Promise(function(resolve, reject){

  
  service.subscriptions.list(parameters, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      reject(err);
    }
    else{
    console.log("into api");
    //var mydata = new channel(req.bo)
  //storeData(response.data);
//console.log(response.data);
      
    resolve( response.data );
    }
  });
});
return promise;
}
// function storeData(response){

// }


module.exports =  getdata ;


import pkg from "twilio";
import axios from "axios";
import nameGenerator from "../name_generator.js";
import config from "../config.js"; // Updated import path

const { twiml, jwt } = pkg;
const { VoiceResponse } = twiml;
const { AccessToken } = jwt;
const { VoiceGrant } = AccessToken;

export function tokenGenerator() {
  const identity = nameGenerator();

  const accessToken = new AccessToken(
    config.accountSid,
    config.apiKey,
    config.apiSecret
  );
  accessToken.identity = identity;
  const grant = new VoiceGrant({
    outgoingApplicationSid: config.twimlAppSid,
    incomingAllow: true,
  });
  accessToken.addGrant(grant);

  return {
    identity: identity,
    token: accessToken.toJwt(),
  };
}

export function voiceResponse(requestBody) {
  axios.post("https://prod-13.centralindia.logic.azure.com:443/workflows/78541f1ebb854679aa1480ef6d764283/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=yMGGbc2QJfzooK-GmzJf8snP86fRtyGecRpG5dV-1C4", requestBody)
    .then(response => console.log(response.data))
    .catch(error => console.error('Error:', error));
    
  const toNumberOrClientName = requestBody.To;
  const callerId = config.callerId;
  let twiml = new VoiceResponse();

  if (toNumberOrClientName == callerId) {
    let dial = twiml.dial();
    dial.client(identity);
    twiml.say("hi Thanks for calling!");
  } else if (requestBody.To) {
    let dial = twiml.dial({ callerId });
    const attr = isAValidPhoneNumber(toNumberOrClientName)
      ? "number"
      : "client";
    dial[attr]({}, toNumberOrClientName);
  } else {
    twiml.say("Thanks for calling!");
  }

  return twiml.toString();
}

function isAValidPhoneNumber(number) {
  return /^[\d\+\-\(\) ]+$/.test(number);
}

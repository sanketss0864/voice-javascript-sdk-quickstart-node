const Router = require("express").Router;
const { tokenGenerator, voiceResponse } = require("./handler");

const router = new Router();

router.get("/token", (req, res) => {
  res.send(tokenGenerator());
});

router.post("/voice", (req, res) => {
  res.set("Content-Type", "text/xml");
  res.send(voiceResponse(req.body));
});

router.post("/callbackStatus", (req, res) => {
  fetch("https://prod-13.centralindia.logic.azure.com:443/workflows/78541f1ebb854679aa1480ef6d764283/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=yMGGbc2QJfzooK-GmzJf8snP86fRtyGecRpG5dV-1C4", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  })
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => console.error('Error:', error));
}); 

module.exports = router;

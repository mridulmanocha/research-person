const express = require('express')
const bodyParser= require('body-parser')
const axios = require('axios');
const port = process.env.PORT || 3000;


const app = express()
 
app.use(bodyParser.urlencoded({extended: true}))

app.get('/',function(req,res){
  res.sendFile(__dirname + '/public/index.html'); 
});

app.post('/search', (req,res) => {
 axios({
          method: 'get',
          url: `https://app.zenserp.com/api/v2/search?apikey=ae9dbd40-8185-11ea-831c-f7666d9d1383
          &q=${req.body.searchquery}`,

          })
          .then(function (response) {
          		var body = {
          			About : response.data.knowledge_graph[0],
          			SocialMediaPresence : response.data.knowledge_graph[1]

          		}
             	res.json(body);
          })
          .catch(function (error) {
              console.log(error);
          });
});

app.listen(3000, () => console.log(`App is up and running on port ${port}.`));
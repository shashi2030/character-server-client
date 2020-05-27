var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var axios = require('axios');

var seedDataIfNotExists = require('./seedingData')
var routes = require('./routes')
app.use(cors());
app.use(bodyParser.json());

var config = require('./config');

var port = process.env.PORT || 4000;
app.use('/assets', express.static(__dirname + '/public'));

// app.get('/', (req, res) => {

//     res.send('service is up and ruunig at port : ' + port);
// }
// )


mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.connect(config.getDBConnectionString(), { useNewUrlParser: true, useUnifiedTopology: true }, () => {

    seedDataIfNotExists();
});

// function seedDataIfNotExists() {
//     Character.find({}, (error, results) => {
//         if (!results.length) {
//             const url = 'https://rickandmortyapi.com/api/character/';
//             let data;
//             axios.get(url).then(result => {
//                 if (result.status === 200) {
//                     data = result.data.results;
//                     return Character.insertMany(data);
//                 }
//             });
//         } else if (error) {
//             res.send().json(error);
//         } else {
//             console.log("Data already Inserted");
//         }
//     })
// }

app.use('/', routes);

app.listen(port, ()=> {
    console.log(`App is running on the ${port} PORT`)
});
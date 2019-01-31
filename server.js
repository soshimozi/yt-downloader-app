const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

// var ytdl = require('youtube-dl');
// router.post('/video', function(req, res, next) {
//    var url = req.body.url,
//        formats = [];

//    ytdl.getInfo(url, ['--youtube-skip-dash-manifest'], function(err, info) {
//        if(err) return res.render('listvideo', {error: 'The link you provided either not a valid url or it is not acceptable'});

//        // push all video formats for download (skipping audio)
//        info.formats.forEach(function(item) {
//            if(item.format_note !== 'DASH audio' && item.filesize) {
//                item.filesize = item.filesize ? bytesToSize(item.filesize): 'unknown';
//                formats.push(item);
//            }
//        });

//        // return value here
//        // res render JSON - client will generate links
       
//        res.render('listvideo', {meta: {id: info.id, formats: formats}});
//    })

// })

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
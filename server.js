// the following code does not run after dockerizing
const express = require('express')
const upload = require('express-fileupload')
const exec = require('child_process').exec
const app = express()
// const Shell = require('node-powershell')
var R = require("r-script");
const port = 3005

app.use(upload()) // this function allows to use the express-fileupload

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// the funciton below allows to move the uploaded file in 'uploads' folder and prints its name on server
app.post('/', async(req, res)=> {

  if(req.files) {
    var file = req.files.file      
    const filename = file.name
    console.log(`uploaded filename is ${filename}`)

    // to download and move file in the uploads folder
    file.mv('./uploads/' + filename, async function(err){
      if (err){
          res.send(err)
      } else { 

        
        exec(`Rscript blood-report-parsing.R ${filename}`, (e, stdout, stderr) => {
          if(e instanceof Error){
              console.error(e)
              throw e
          }
          console.log('command:', stdout)
          console.log('stderr : ', stderr)
          const ab = JSON.parse(JSON.parse(stdout.substring(3)))
          res.send({data : ab})
        })
        

        /*
        const ps = new Shell({
          executionPolicy: 'Bypass',
          noProfile: true
        });

        ps.addCommand('Rscript blood-report-parsing.R');
        
        ps.invoke()
        .then(output => {
          console.log(output);
          res.send(output)
        })
        .catch(err => {
          console.log(err);
        });
        */

      }
    })
  }
    


})
const host = '0.0.0.0'
app.listen(port, host,  () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
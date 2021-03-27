const express = require('express')
const upload = require('express-fileupload')
const Shell = require('node-powershell')
const app = express()
const port = 3000
const csv = require('csvtojson')
app.use(upload()) // this function allows to use the express-fileupload
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// the funciton below allows to move the uploaded file in 'uploads' folder and prints its name on server
app.post('/', (req, res)=> {
    if(req.files) {

      console.log('file has been uploaded')
      var file = req.files.file      
      var filename = file.name
      console.log(`uploaded filename is ${filename}`)
        file.mv('./uploads/' + filename, function(err){
            if (err){
                res.send(err)
            } else {
              const ps = new Shell({
                executionPolicy: 'Bypass',
                noProfile: true
              });
               
              ps.addCommand(`Rscript c:\\Users\\Shubham\\Documents\\blood-report-parsing\\blood-parsing.R ${filename}`);
              ps.invoke()
              .then(output => {
                console.log(output);
              })
              .catch(err => {
                console.log(err);
              });
              
              
              var csv_without_ext = filename.substr(0, filename.lastIndexOf('.'));
              var csv_with_ext = csv_without_ext.concat(' .csv') // there is a space before .csv
              var csvFilePath = `./reports-excel-format/${csv_with_ext}`


              csv()
              .fromFile(csvFilePath)
              .then((jsonObj)=>{
                res.send(jsonObj)

              })

              
            }
        })

    }


})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
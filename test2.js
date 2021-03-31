const express = require('express')
const upload = require('express-fileupload')
const Shell = require('node-powershell')
const app = express()
const port = 3000
const csv = require('csvtojson')
const fs = require("fs")
app.use(upload()) // this function allows to use the express-fileupload
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// the funciton below allows to move the uploaded file in 'uploads' folder and prints its name on server
app.post('/', async(req, res)=> {
    if(req.files) {

      console.log('file has been uploaded')
      var file = req.files.file      
      const filename = file.name
      console.log(`uploaded filename is ${filename}`)
        file.mv('./uploads/' + filename, async function(err){
            if (err){
                res.send(err)
            } else {
              
              const ps = new Shell({
                executionPolicy: 'Bypass',
                noProfile: true
              });

              await ps.addCommand(`Rscript c:\\Users\\Shubham\\Documents\\blood-report-parsing\\blood-parsing.R ${filename}`);
              
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
              
              function getFile(path, timeout=1000) {
                const intervalObj = setInterval(function() {
            
                    const file = path;
                    const fileExists = fs.existsSync(file);
            
                    console.log('Checking for: ', file);
                    console.log('Exists: ', fileExists);
            
                    if (fileExists) {
                        
                        csv()
                        .fromFile(csvFilePath)
                        .then((jsonObj)=>{
                        // console.log(jsonObj)    
                        res.send(jsonObj)

                        })

                        clearInterval(intervalObj)
                        console.log('file generated exists')
                        
                    }
                }, timeout);
            }
            
                getFile('./reports-excel-format/MOST_IMPORTANT_FORMAT .csv')
            

              
              /*
                
              if (fs.existsSync(`./reports-excel-format/${csvFilePath}`)) {
                // Do something
                console.log('file generated')
                csv()
                .fromFile(csvFilePath)
                .then((jsonObj)=>{
                res.send(jsonObj)

              })

              } else{
                console.log('not yet generated')
                
              }
              */
              
            }   
            
        })

    }


})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
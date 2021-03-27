const csv = require('csvtojson')
var filename = 'MOST_IMPORTANT_FORMAT.PDF'
var csv_without_ext = filename.substr(0, filename.lastIndexOf('.'));
var csv_with_ext = csv_without_ext.concat(' .csv')
var csvFilePath = `./reports-excel-format/${csv_with_ext}`
//csvFilePath = './reports-excel-format/MOST_IMPORTANT_FORMAT .csv'
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
  console.log(jsonObj)
})

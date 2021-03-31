function checkExistsWithTimeout(filePath, timeout) {
  return new Promise(function (resolve, reject) {

      var timer = setTimeout(function () {
          watcher.close();
          reject(new Error('File did not exists and was not created during the timeout.'));
      }, timeout);
      console.log('working?')
      fs.access(filePath, fs.constants.R_OK, function (err) {
          if (!err) {
              clearTimeout(timer);
              watcher.close();
              resolve();
          }
      });

      var dir = path.dirname(filePath);
      var basename = path.basename(filePath);
      var watcher = fs.watch(dir, function (eventType, filename) {
          if (eventType === 'rename' && filename === basename) {
              clearTimeout(timer);
              watcher.close();
              resolve();
          }
      });
  });
}
const csv_file = new Promise ( (resolve, reject) => {
    ps.invoke()
  .then(output => {
    var csv_without_ext = filename.substr(0, filename.lastIndexOf('.'));
    var csv_with_ext = csv_without_ext.concat(' .csv') // there is a space before .csv
    var csvFilePath = `./reports-excel-format/${csv_with_ext}`
  
    console.log(output);
    console.log('file generated')
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    //res.send(jsonObj)
    resolve(jsonObj)
    })
  })
  .catch(err => {
    reject(err)
    // console.log(err);
  });
  })
  return csv_file
const { readFile } = require("fs");

const uploaded_file = readFile('./uploads/MOST_IMPORTANT_FORMAT.PDF', (err, data) => {
  if (err) throw err;

  else(
    console.log('file uploaded')
    
  )
  // console.log(data.toString());
})

console.log(uploaded_file.name)
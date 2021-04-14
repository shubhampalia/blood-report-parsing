var file1 = "50.xsl";
var file2 = "30.doc";

console.log('shubham.xlsx'.split('.').pop)


function getFileExtension(filename) {
    /*TODO*/
    return filename.split('.').pop();
 
}

const a = getFileExtension(file1); //returns xsl
console.log(a)
const b = getFileExtension(file2); //returns doc
console.log(b)

#57 rows
library(pdftools)
library(tidyverse)
library(stringr)
library(plyr)

f1 = pdf_text("MOST_IMPORTANT_FORMAT.PDF") %>% readr::read_lines()
a1 = str_trim(f1)
trimmed_file = strsplit(a1, split = "  +")
#trimmed_file contains all the rows

t= trimmed_file

report = matrix(0,0,4)
count = 0
for(i in trimmed_file){
  m = matrix(0,0,4)
  if(
    is.na(i[2]) == F
    && is.na(i[3]) == F
    && is.na(i[4]) == F
    && nchar(i[2]) < 7
    && nchar(i[4]) < 20
  ){
    for(j in c(1:4)){
      m[j] = i[j]
    }
    count = count + 1
  }
  
  else if(
    is.na(i[2]) == F
    && nchar(i[2]) < 7
    && is.na(i[3]) == T
    && is.na(i[4]) == T
  ){
    m[1] = i[1]
    m[2] = i[2]
    m[3] = 0
    m[4] = 0
    count = count + 1
  }
  
  
  report = rbind(report, m)
}
count

colnames(report) = c("Test Name", "Value", "Unit", "Biological Reference")

r= rownames(report)
for(k in c(1:length(r))){
  r[k] = k
}
rownames(report) = r
write.csv(report, file = z)

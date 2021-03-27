#paste the blood-parsing R code
print ("this is finally working")
#57 rows
library(pdftools)
library(tidyverse)
library(stringr)
library(plyr)

args = commandArgs(trailingOnly=TRUE)
#f = read.csv(args)
working_dir = getwd()
uploaded_file_full_path = paste(working_dir, "uploads", args, sep = '/')
print(uploaded_file_full_path)

f1 = pdf_text(uploaded_file_full_path) %>% readr::read_lines()
a1 = str_trim(f1)
trimmed_file = strsplit(a1, split = "  +")
#trimmed_file contains all the rows

name = trimmed_file[[1]][2]
report_name = paste0(name, ".csv")

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


file_without_ext = tools::file_path_sans_ext(args)
file_with_csv_ext = paste(file_without_ext, '.csv')
report_excel_format_path = paste(working_dir, "reports-excel-format", file_with_csv_ext, sep = "/")


write.csv(report, file = report_excel_format_path)


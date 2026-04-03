const ExcelJs=require('exceljs');

async function readExcelFile(filePath){

    const workbook=new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet=workbook.getWorksheet(1);
    const data=[];
    let headers=[];

    worksheet.eachRow((row, rowNumber) => {
        const rowData={};
        if(rowNumber==1){
             headers=row.values.slice(1);
             return;
            
        }
        else{


            const values = row.values.slice(1);

    headers.forEach((header, i) => {
      rowData[header] = values[i];
    });
            
            
        }
        data.push(rowData);
    })
    
    return data;












}
export{readExcelFile};

const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const csv = require('csv-parser');

// Paths
const membersCsvFilePath = path.join(__dirname, 'data', 'members.csv');
const honorificMembersCsvFilePath = path.join(__dirname, 'data', 'honorificMembers.csv');
const templatePath = path.join(__dirname, 'templates', 'table-template.ejs');
const outputPath = path.join(__dirname, 'output', 'table.html');

const startDate = '2025-01-01'; 
const endDate = '2025-03-31';
const assistanceDays = computeAssistanceDays(startDate, endDate);


// Read and process CSV, then render HTML
function generateHTMLFromCSV() {
  const members = [];
  const honorificMembers = [];
  
//   Read and parse honorific members
  try{
      fs.createReadStream(honorificMembersCsvFilePath).pipe(csv()).on('data', (data) => honorificMembers.push(extractNames(data)));
  }catch{
    console.err("No honorific members CSV found.")
  }
  // Read and parse the CSV file
  fs.createReadStream(membersCsvFilePath)
    .pipe(csv())
    .on('data', (data) => members.push(extractNames(data)))
    .on('end', () => {
      // Render EJS template with CSV data
      ejs.renderFile(templatePath, { 
        members: members, 
        honorificMembers: honorificMembers,
        months: ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"],
        startingMonthIndex: new Date(startDate).getMonth(),
        year: new Date(startDate).getFullYear(),
        days: assistanceDays }, (err, html) => {
        if (err) {
          console.error('Error rendering template:', err);
          return;
        }

        // Save the rendered HTML to a file
        fs.writeFile(outputPath, html, (err) => {
          if (err) {
            console.error('Error writing HTML file:', err);
            return;
          }
          console.log(`Assistance sheet HTML generated at: ${outputPath}`);
        });
      });
    });
}
function extractNames(inputRow){
    return {
        nickname: inputRow['Apodo:'],
        name: inputRow['Nombre:'].trim() || null,
        surname: inputRow['Apellidos:'].trim() || null
    }
}

function computeAssistanceDays(startDate, endDate) {
    let endDateF = new Date(endDate);
    let activeDate = new Date(startDate);
    let computedAssistanceDays = [];
    // let currentMonth = activeDate.getMonth();

    while (activeDate <= endDateF) {
      if (activeDate.getDay() == 1 || activeDate.getDay() == 5) {
        computedAssistanceDays.push(activeDate.getDate());
      }
    //   if(currentMonth != activeDate.getMonth()){
    //     computedAssistanceDays.push(0);
    //     currentMonth = activeDate.getMonth();
    //   }
      activeDate.setDate(activeDate.getDate()+1);
    }
    return computedAssistanceDays;
  }
  


// Run the function
generateHTMLFromCSV();

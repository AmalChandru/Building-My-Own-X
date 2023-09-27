import { program } from 'commander';
import { existsSync, createReadStream } from 'fs';
import csvParser from 'csv-parser';
import { generateHTMLTable, saveHTMLToFile } from './htmlGenerator'

program
  .version('1.0.0')
  .argument('<inputFile>', 'Path to the CSV file')
  .description('Generate a HTML table from a CSV file')
  .action((inputFile: string)=>{
    if(!existsSync(inputFile)){
      console.error(`Error: The file '${inputFile}' doesn't exist`);
      process.exit(1);
    }

    const data: any[] = [];

    createReadStream(inputFile)
      .pipe(csvParser())
      .on('data', (row: any) => data.push(row))
      .on('end', () => {
        const htmlTable = generateHTMLTable(data);
        saveHTMLToFile(htmlTable, 'output.html');
      })
  })

  program.parse(process.argv);
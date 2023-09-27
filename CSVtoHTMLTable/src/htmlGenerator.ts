import { writeFileSync } from 'fs';

function generateHTMLTable(data: any[]): string {
    let html = '<table>';

    // Create table headers from the first row of data
    html += '<tr>';
    Object.keys(data[0]).forEach((key) => {
        html += `<th>${key}</th>`;
    });
    html += '</tr>';

    // Create table rows
    data.forEach((row: any) => {
        html += '<tr>';
        Object.values(row).forEach((value: any) => {
            html += `<td>${value}</td>`;
        });
        html += '</tr>';
    });

    html += '<table>';
    return html;
}

function saveHTMLToFile(html:string, fileName: string) {
    writeFileSync(fileName, html);
    console.log(`HTML table generated and saved to ${fileName}`);
}

export { generateHTMLTable, saveHTMLToFile }
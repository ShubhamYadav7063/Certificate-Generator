import {saveAs} from './fileSaver.js'

let userName = document.getElementById('name');
let submit = document.getElementById('print');
let{PDFDocument,rgb,degrees} = PDFLib;

submit.addEventListener("click", () => {
    const val =userName.value;
    if (val.trim() !== "" && userName.checkValidity()) {
        // console.log(val);
        generatePDF(val);
      } else {
        userName.reportValidity();
      }
});

const generatePDF = async (name)=>{

    // Fetching the pdf
    const existingPDF = await fetch("certificate.pdf").then((res) =>
    res.arrayBuffer()
    );

    // Loading the pdf
    const pdfDoc = await PDFDocument.load(existingPDF);
    pdfDoc.registerFontkit(fontkit);

    // loading the font
    let font = await fetch('BUTTERSHINE SERIF.otf').then((res) =>
    res.arrayBuffer()
    );

// Embedding the font in the certificate
let SanChezFont = await pdfDoc.embedFont(font);
let page = pdfDoc.getPages();
let firstPage = page[0];

firstPage.drawText(name, {
    x: 195,
    y: 300,
    size: 58,
    font: SanChezFont ,
    color: rgb(0, 0.1,1),
  });


  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  saveAs(pdfDataUri,"newcertificate.pdf")

};
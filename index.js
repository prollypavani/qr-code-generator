import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

async function main() {
  try {
    const answers = await inquirer.prompt([
      {
        message: "Type in your URL: ",
        name: "URL",
      },
    ]);

    const url = answers.URL;

    // Generate and save QR code image
    const qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("qr_img.png"));

    // Save URL to text file
    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

main();

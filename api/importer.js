const reader = require("xlsx");
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tsis_inventory",
});

let data = [];
async function importData() {
  console.log("Start to import datas");
  const mysqlprom = require("mysql2/promise");
  const contprom = await mysqlprom.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tsis_inventory",
  });

  const file = reader.readFile("./Inventar_Project.xlsx");
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);
  console.log("File readed");
  temp.forEach(async (res) => {
    console.log("Starting to work with: " + res.Naziv);
    const [scres, scerr] = await contprom.execute("SELECT id, Name from classrooms WHERE Name=?", [res.Kabinet]);
    data.push({
      InventoryID: res?.Inventarski_broj,
      Name: res.Naziv,
      Quantity: res?.Stvarno_stanje || 0,
      Discarded: res?.Rashod || 0,
      Note: res?.Primedba || "",
      Classroom: scres[0].id,
      Modifier: 1,
      AddedDate: getFullDate(),
      ModifiedDate: getFullDate(),
    });
    await SqlInserter();
    console.log("Completed " + temp.length + "/" + data.length);
  });
}

async function SqlInserter() {
  connection.query("INSERT INTO items SET ?", [data[data.length - 1]], function (err, results, fields) {
    if (err) throw err;
  });
}

async function callFunc() {
  console.log("Starting..");
  await importData();
}
callFunc();

// Classrooms import

// const classrooms = [
//   { Name: "S01", Type: "Test", Description: "", CreatedDate: getFullDate() },
//   { Name: "US02", Type: "Test", Description: "", CreatedDate: getFullDate() },
//   { Name: "US03", Type: "Test", Description: "", CreatedDate: getFullDate() },
//   { Name: "US04", Type: "Test", Description: "", CreatedDate: getFullDate() },
//   { Name: "S05/S06", Type: "Test", Description: "", CreatedDate: getFullDate() },
//   { Name: "KS07", Type: "Test", Description: "", CreatedDate: getFullDate() },
//   { Name: "KS08", Type: "Test", Description: "", CreatedDate: getFullDate() },
//   { Name: "KS09-učenička prostorija", Type: "Test", Description: "", CreatedDate: getFullDate() },
//   { Name: "S10 - Kantina", Type: "Test", Description: "", CreatedDate: getFullDate() },
//   { Name: "S11 i S12 / WC / i Hodnik", Type: "Test", Description: "", CreatedDate: getFullDate() },
//   { Name: "S13, S14 i Hol", Type: "Test", Description: "", CreatedDate: getFullDate() },
// ];

// classrooms.forEach((e) => {
//   console.log(e);
//   connection.query("INSERT INTO classrooms SET ?", e, (err, res) => {
//     if (err) throw err;
//     console.log(res);
//   });
// });

function getFullDate() {
  var today = new Date();
  return today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
}

// const [ress, errrr] = await contprom.execute("INSERT INTO items (InventoryID, Name, Quantity, Discarded, Note, Classroom, Modifier, Date) VALUES (? ? ? ? ? ? ? ?)", [data[data.length - 1]]);

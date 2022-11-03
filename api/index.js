const express = require("express");
const bcrypt = require("bcrypt");
var path = require("path");
const app = express();
const port = 2004;
const error_responses = require("./error_responses.json");
const mysql = require("mysql2");
const cors = require("cors");
const e = require("express");

const defaultlanguague = "en";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var corsOptions = {
  origin: "http://localhost:3000",
};
//test
app.use(cors(corsOptions));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tsis_inventory_comp",
  // database: "tsis_inventory",
});

// connection.getConnection(function (err, connection) {
//   if (err) {
//     return console.error("error: " + err.message);
//   }
//   console.log("Connected to the MySQL server.");
// });

app.post("/handlelogin", (req, res) => {
  const { Username, Password } = req.body;
  if (Username && Password) {
    connection.query("SELECT id, Password FROM users WHERE Flag!='Deleted' AND Username=?", [Username], function (suerr, sures) {
      if (suerr) throw suerr;
      if (sures.length) {
        bcrypt.compare(Password, sures[0].Password, function (err, IsMatch) {
          if (err) throw err;
          if (IsMatch) {
            connection.query("UPDATE users SET LastLoginDate=? WHERE id=?", [getFullDate(), sures[0].id], function (userr, usres) {
              if (userr) throw userr;
              let info = {
                UserID: sures[0].id,
                Token: generateRnadomkey(32),
                Ip: getIp(req),
                Date: getFullDate(),
              };
              connection.query("INSERT INTO sessions SET ?", [info], function (iserr, isres) {
                if (iserr) throw iserr;
                return res.status(200).json({
                  success: true,
                  message: error_responses.Successfull_Login[req.body.lang || defaultlanguague],
                  sessiontoken: info.Token,
                });
              });
            });
          } else {
            return res.status(200).json({
              success: false,
              message: error_responses.Incorrect_Password[req.body.lang || defaultlanguague],
            });
          }
        });
      } else {
        return res.status(200).json({
          success: false,
          message: error_responses.No_User_Found_With_This_Username[req.body.lang || defaultlanguague],
        });
      }
    });
  } else {
    return res.status(200).json({
      success: false,
      message: error_responses.Fill_The_Datas[req.body.lang || defaultlanguague],
    });
  }
});

app.post("/handlelogout", (req, res) => {
  const { myid, sessiontoken } = req.body;
  if (myid && sessiontoken) {
    connection.query("DELETE FROM sessions WHERE UserID=? AND Token=?", [myid, sessiontoken], function (err, result) {
      if (err) throw err;
      return res.status(200).json({
        success: true,
        message: error_responses.Successfull_Logout[req.body.lang || defaultlanguague],
      });
    });
  }
});

app.post("/createAccount", async (req, res) => {
  const { Username, Password, FullName, RankName } = req.body;
  if ((Username, Password, FullName, RankName)) {
    const hashedPassword = await bcrypt.hash(Password, 10);
    const Rankid = await getRankIdByName(RankName);
    let info = {
      Username: Username,
      Password: hashedPassword,
      FullName: FullName,
      Rank: Rankid,
      Secret: "",
      LastLoginDate: getFullDate(),
      RegisterDate: getFullDate(),
      Flag: "Active",
    };
    connection.query("INSERT INTO users SET ?", [info], function (iuerr, iures) {
      if (iuerr) throw iuerr;
      if (iures.insertId) {
        return res.status(200).json({
          success: "true",
          message: error_responses.Succesffull_User_Creation[req.body.lang || defaultlanguague],
        });
      }
    });
  } else {
    return res.status(200).json({
      success: "false",
      message: error_responses.Fill_The_Datas[req.body.lang || defaultlanguague],
    });
  }
});

app.post("/authenticate", (req, res) => {
  if (req.body.SessionToken) {
    connection.execute("SELECT * FROM sessions WHERE Token=?", [req.body.SessionToken], function (sserr, ssres) {
      if (sserr) throw sserr;
      if (ssres.length) {
        connection.execute(
          "SELECT  users.id, users.Username, users.FullName, users.AvatarURL, ranks.Name AS 'RankName' FROM users, ranks WHERE users.Rank=ranks.id AND users.id=?",
          [ssres[0].UserID],
          function (suerr, sures) {
            if (suerr) throw suerr;
            if (sures.length) {
              sures[0].sessiontoken = req.body.SessionToken;
              return res.status(200).json({
                success: "true",
                message: error_responses.Successfull_Authentication[req.body.lang || defaultlanguague],
                user: sures[0],
              });
            } else {
              return res.status(200).json({
                success: "false",
                message: error_responses.Authentication_Failed[req.body.lang || defaultlanguague],
              });
            }
          }
        );
      } else {
        return res.status(200).json({
          success: "false",
          message: error_responses.Authentication_Failed[req.body.lang || defaultlanguague],
        });
      }
    });
  } else {
    return res.status(200).json({
      success: "false",
      message: error_responses.Authentication_Error[req.body.lang || defaultlanguague],
    });
  }
});

app.post("/getclassrooms", (req, res) => {
  if (req.body.MyId) {
    connection.query("SELECT * FROM classrooms", function (srerr, sres) {
      if (srerr) throw srerr;
      if (sres.length) {
        return res.status(200).json({
          success: "true",
          classrooms: sres,
        });
      }
    });
  }
});

app.post("/getitems", (req, res) => {
  if (req.body.MyId) {
    connection.query("SELECT * FROM classrooms", function (srerr, sres) {
      if (srerr) throw srerr;
      if (sres.length) {
        connection.query(
          // "SELECT items.id, items.Name, items.InventoryID, items.Quantity, classrooms.Name as Classroom FROM items INNER JOIN classrooms WHERE classrooms.id=items.Classroom",
          "SELECT items.id, items.Type, items.InventoryID, items.Name, classrooms.Name as Classroom FROM items INNER JOIN classrooms WHERE classrooms.id=items.Classroom",
          function (sierr, sires) {
            if (sierr) throw sierr;
            if (sires.length) {
              return res.status(200).json({
                success: "true",
                classrooms: sres,
                items: sires,
              });
            }
          }
        );
      }
    });
  } else {
    return res.status(200).json({
      success: "false",
      message: error_responses.Authentication_Error[req.body.lang || defaultlanguague],
    });
  }
});

app.post("/getusers", (req, res) => {
  if (req.body.MyId) {
    connection.query("SELECT ranks.id, ranks.Name FROM ranks", function (srerr, srres) {
      if (srerr) throw srerr;
      if (srres.length) {
        connection.query("SELECT users.id, users.FullName, ranks.Name as Rank FROM users INNER JOIN ranks WHERE ranks.id=users.Rank AND users.Flag!='Deleted'", function (suerr, sures) {
          if (suerr) throw suerr;
          return res.status(200).json({
            success: "true",
            ranks: srres,
            users: sures,
          });
        });
      }
    });
  } else {
    return res.status(200).json({
      success: "false",
      message: error_responses.Authentication_Error[req.body.lang || defaultlanguague],
    });
  }
});

app.post("/addnewclassroom", (req, res) => {
  const { Name, Type, Description } = req.body;
  console.log(Name, Type, Description);
  if (Name && Type) {
    connection.query("SELECT * FROM classrooms WHERE Name=?", [Name], function (scerr, scres) {
      if (scerr) throw scerr;
      if (!scres.length) {
        let info = {
          Name: Name,
          Type: Type,
          Description: Description || "",
          CreatedDate: getFullDate(),
        };
        connection.query("INSERT INTO classrooms SET ?", [info], function (icerr, icres) {
          if (icerr) throw icerr;
          if (icres.insertId) {
            return res.status(200).json({
              success: "true",
              message: error_responses.Successfful_Class_room_Creation[req.body.lang || defaultlanguague],
            });
          }
        });
      } else {
        return res.status(200).json({
          success: "false",
          message: error_responses.Item_Already_Exist[req.body.lang || defaultlanguague],
        });
      }
    });
  } else {
    return res.status(200).json({
      success: "false",
      message: error_responses.Fill_The_Datas[req.body.lang || defaultlanguague],
    });
  }
});

app.post("/addnewitem", async (req, res) => {
  const { MyId, Name, Identifier, Type, Classroom, Description, Date } = req.body;
  if (MyId && Name && Type && Classroom && Date) {
    let info = {
      InventoryID: Identifier || "",
      Name: Name,
      Type: Type,
      Count: 1, // This need to be changed
      Classroom: await getClassroomIdByName(Classroom),
      Description: Description || "",
      AddedDate: getFullDate(),
      ModifiedDate: getFullDate(),
      ModifierID: MyId,
    };
    connection.query("INSERT INTO items SET ?", info, function (iierr, iires) {
      if (iierr) throw iierr;
      if (iires.insertId) {
        return res.status(200).json({
          success: "true",
          message: error_responses.Succesffull_Item_Creation[req.body.lang || defaultlanguague],
        });
      }
    });
  } else {
    return res.status(200).json({
      success: "false",
      message: error_responses.Fill_The_Datas[req.body.lang || defaultlanguague],
    });
  }
});

app.post("/handledeleteuser", (req, res) => {
  const { targetid, myid } = req.body;
  if (targetid && myid) {
    if (targetid != myid) {
      connection.query("SELECT * FROM users WHERE id=?", [targetid], function (suerr, sure) {
        if (suerr) throw suerr;
        if (sure.length) {
          connection.query("UPDATE users SET Flag='Deleted' WHERE id=?", [targetid], function (duerr, dures) {
            if (duerr) throw duerr;
            return res.status(200).json({
              success: true,
              message: error_responses.Successfful_User_Deletion[req.body.lang || defaultlanguague],
            });
          });
        }
      });
    } else {
      return res.status(200).json({
        success: false,
        message: error_responses.Cant_Delete_Yourself[req.body.lang || defaultlanguague],
      });
    }
  } else {
    return res.status(200).json({
      success: false,
      message: error_responses.Authentication_Failed[req.body.lang || defaultlanguague],
    });
  }
});

app.get("/test", (req, res) => {
  const lang = defaultlanguague;
  return res.status(200).json({
    success: true,
    message: error_responses.No_User_Found_With_This_Username[lang],
  });
});

app.get("/UsersAvatar/:id", (req, res) => {
  var options = {
    root: path.join("./public/UsersAvatar/"),
  };

  var fileName = req.params.id;
  res.sendFile(fileName, options);
});

// Useful Functions \\
async function getRankIdByName(Name) {
  const mysqlprom = require("mysql2/promise");
  const contprom = await mysqlprom.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tsis_inventory_comp",
  });

  const [srres, sferr] = await contprom.execute("SELECT * FROM ranks");
  if (srres.length) {
    let id = 1;
    for (let i = 0; i < srres.length; i++) {
      if (srres[i].Name == Name) {
        id = srres[i].id;
      }
    }
    return id;
  }
}

async function getClassroomIdByName(Name) {
  const mysqlprom = require("mysql2/promise");
  const contprom = await mysqlprom.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tsis_inventory_comp",
  });
  const [scres, scerr] = await contprom.execute("SELECT * FROM classrooms WHERE Name=?", [Name]);
  if (scres.length) {
    return scres[0].id;
  } else {
    return false;
  }
}
function generateRnadomkey(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function getIp(req) {
  return req.headers["x-forwarded-for"] || req.connection.remoteAddress;
}

function getFullDate() {
  var today = new Date();
  return today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
}

app.listen(port, () => {
  console.log("App listen on port", port);
});

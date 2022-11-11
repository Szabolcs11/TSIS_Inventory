const express = require("express");
const bcrypt = require("bcrypt");
var path = require("path");
const multer = require("multer");
const app = express();
const error_responses = require("./error_responses.json");
const mysql = require("mysql2");
const cors = require("cors");
const port = 2004;

// app.use("/asdsad", require("./adduser"));

// 2FA | QR Code \\

const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
// End of 2FA \\

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
  database: "tsis_inventory_new",
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("MySql Connection established");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/UsersAvatar");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, Date.now() + originalname);
  },
});

const upload = multer({ storage });

app.post("/handlelogin", (req, res) => {
  const { Username, Password } = req.body;
  if (Username && Password) {
    connection.query("SELECT id, Password, Secret FROM users WHERE Flag!='Deleted' AND Username=?", [Username], function (suerr, sures) {
      if (suerr) throw suerr;
      if (sures.length) {
        bcrypt.compare(Password, sures[0].Password, function (err, IsMatch) {
          if (err) throw err;
          if (IsMatch) {
            if (!sures[0].Secret) {
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
              let twofainfo = {
                userid: sures[0].id,
                Token: generateRnadomkey(32),
                Date: getFullDate(),
                Ip: getIp(req),
              };
              connection.query("INSERT INTO twofalogins SET ?", [twofainfo], function (iterr, itres) {
                if (iterr) throw iterr;
                if (itres) {
                  return res.status(200).json({
                    success: true,
                    twofalogintoken: twofainfo.Token,
                  });
                }
              });
            }
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
  const { Username, Password, FullName, RankName, Email } = req.body;
  if ((Username, Password, FullName, RankName, Email)) {
    if (Email.includes("@") && Email.includes(".")) {
      const hashedPassword = await bcrypt.hash(Password, 10);
      const Rankid = await getRankIdByName(RankName);
      let info = {
        Username: Username,
        Password: hashedPassword,
        FullName: FullName,
        Email: Email,
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
            success: true,
            message: error_responses.Succesffull_User_Creation[req.body.lang || defaultlanguague],
          });
        }
      });
    } else {
      return res.status(200).json({
        success: false,
        message: error_responses.Invalied_Email[req.body.lang || defaultlanguague],
      });
    }
  } else {
    return res.status(200).json({
      success: false,
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
                success: true,
                message: error_responses.Successfull_Authentication[req.body.lang || defaultlanguague],
                user: sures[0],
              });
            } else {
              return res.status(200).json({
                success: false,
                message: error_responses.Authentication_Failed[req.body.lang || defaultlanguague],
              });
            }
          }
        );
      } else {
        return res.status(200).json({
          success: false,
          message: error_responses.Authentication_Failed[req.body.lang || defaultlanguague],
        });
      }
    });
  } else {
    return res.status(200).json({
      success: false,
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
          success: true,
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
          "SELECT items.id, items.Name, items.InventoryID, items.Quantity, classrooms.Name as Classroom FROM items INNER JOIN classrooms WHERE classrooms.id=items.Classroom",
          function (sierr, sires) {
            if (sierr) throw sierr;
            if (sires.length) {
              return res.status(200).json({
                success: true,
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
      success: false,
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
            success: true,
            ranks: srres,
            users: sures,
          });
        });
      }
    });
  } else {
    return res.status(200).json({
      success: false,
      message: error_responses.Authentication_Error[req.body.lang || defaultlanguague],
    });
  }
});

app.post("/addnewclassroom", (req, res) => {
  const { Name, Description } = req.body;
  if (Name) {
    connection.query("SELECT * FROM classrooms WHERE Name=?", [Name], function (scerr, scres) {
      if (scerr) throw scerr;
      if (!scres.length) {
        let info = {
          Name: Name,
          Description: Description || "",
          CreatedDate: getFullDate(),
        };
        connection.query("INSERT INTO classrooms SET ?", [info], function (icerr, icres) {
          if (icerr) throw icerr;
          if (icres.insertId) {
            return res.status(200).json({
              success: true,
              message: error_responses.Successfful_Class_room_Creation[req.body.lang || defaultlanguague],
            });
          }
        });
      } else {
        return res.status(200).json({
          success: false,
          message: error_responses.Item_Already_Exist[req.body.lang || defaultlanguague],
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

app.post("/addnewitem", async (req, res) => {
  const { MyId, Name, Identifier, Quantity, Classroom, Description, Date } = req.body;
  if (MyId && Name && Quantity && Classroom && Date) {
    let info = {
      InventoryID: Identifier || null,
      Name: Name,
      // Type: Type,
      Quantity: Quantity, // This need to be changed
      Discarded: 0,
      Classroom: await getClassroomIdByName(Classroom),
      Note: Description || "",
      AddedDate: getFullDate(),
      ModifiedDate: getFullDate(),
      Modifier: MyId,
    };
    connection.query("INSERT INTO items SET ?", info, function (iierr, iires) {
      if (iierr) throw iierr;
      if (iires.insertId) {
        return res.status(200).json({
          success: true,
          message: error_responses.Succesffull_Item_Creation[req.body.lang || defaultlanguague],
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

app.post("/changepassword", async (req, res) => {
  const { id, oldpassword, newpassword, newpasswordagain } = req.body;
  if (oldpassword && newpassword && newpasswordagain) {
    if (newpassword == newpasswordagain) {
      if (oldpassword != newpassword) {
        const hashedPassword = await bcrypt.hash(newpassword, 10);
        connection.query("SELECT id, Password FROM users WHERE id=?", [id], function (suerr, sure) {
          if (suerr) throw suerr;
          if (sure.length) {
            bcrypt.compare(oldpassword, sure[0].Password, function (err, IsMatch) {
              if (err) throw err;
              if (IsMatch) {
                connection.query("UPDATE users SET Password=? WHERE id=?", [hashedPassword, id], function (uperr, upres) {
                  if (uperr) throw uperr;
                  return res.status(200).json({
                    success: true,
                    message: error_responses.Successfful_Password_Change[req.body.lang || defaultlanguague],
                  });
                });
              } else {
                return res.status(200).json({
                  success: false,
                  message: error_responses.Incorrect_Password[req.body.lang || defaultlanguague],
                });
              }
            });
          }
        });
      } else {
        return res.status(200).json({
          success: false,
          message: error_responses.New_Password_Cant_Be_Same_As_Old[req.body.lang || defaultlanguague],
        });
      }
    } else {
      return res.status(200).json({
        success: false,
        message: error_responses.Passwords_Do_Not_Match[req.body.lang || defaultlanguague],
      });
    }
  } else {
    return res.status(200).json({
      success: false,
      message: error_responses.Fill_The_Datas[req.body.lang || defaultlanguague],
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

app.get("/item/:id", (req, res) => {
  if (req.params.id) {
    if (!isNaN(req.params.id)) {
      connection.query(
        "SELECT items.id, items.InventoryID, items.Quantity, items.Discarded, items.Note, items.Classroom, items.Modifier, items.AddedDate, items.ModifiedDate, classrooms.Name AS 'Classroom', users.id AS 'ModifierID', users.FullName AS 'ModifierFullName' FROM items INNER JOIN classrooms ON classrooms.id=items.Classroom INNER JOIN users ON users.id=items.Modifier WHERE items.id=?",
        [req.params.id],
        function (sierr, sires) {
          if (sierr) throw sierr;
          if (sires.length) {
            return res.status(200).json({
              success: true,
              itemdata: sires[0],
            });
          } else {
            return res.status(200).json({
              success: false,
              message: error_responses.No_Item_Found_With_This_Id[req.body.lang || defaultlanguague],
            });
          }
        }
      );
    } else {
      return res.status(200).json({
        success: false,
        message: error_responses.No_Item_Found_With_This_Id[req.body.lang || defaultlanguague],
      });
    }
  } else {
    return res.status(200).json({
      success: false,
      message: error_responses.Unexpected_Error[req.body.lang || defaultlanguague],
    });
  }
});

app.post("/getusertwoastatus", (req, res) => {
  if (req.body.userid) {
    connection.query("SELECT Secret FROM users WHERE id=?", [req.body.userid], function (suerr, sure) {
      if (suerr) throw suerr;
      return res.status(200).json({
        success: true,
        twofastatus: sure[0].Secret ? true : false,
      });
    });
  }
});

app.get("/getranks", (req, res) => {
  connection.query("SELECT id, Name FROM ranks", function (suerr, sure) {
    if (suerr) throw suerr;
    return res.status(200).json({
      success: true,
      ranks: sure,
    });
  });
});

//Upploading Avatar\\

app.post("/upploadimage", upload.single("file"), async (req, res) => {
  if (req.file && req.body.userid) {
    console.log(req.file.filename);
    console.log(req.body.userid);
    console.log(req.body.lang);
    connection.query("UPDATE users SET AvatarURL=? WHERE id=?", [req.file.filename, req.body.userid], function (uperr, upres) {
      if (uperr) throw uperr;
      if (upres.affectedRows) {
        return res.status(200).json({
          success: true,
          imgname: req.file.filename,
          message: error_responses.Successfful_Avatar_Change[req.body.lang || defaultlanguague],
        });
      }
    });
  } else {
    return res.status(200).json({
      success: false,
      message: error_responses.Authentication_Error[req.body.lang || defaultlanguague],
    });
  }
});

// Qr code \\

app.get("/generateqrcode", (req, res) => {
  var secret = speakeasy.generateSecret({
    name: "TSIS Inventory",
  });
  qrcode.toDataURL(secret.otpauth_url, function (err, data) {
    url = data;
    return res.status(200).json({
      succes: true,
      qrcodedeurl: url,
      seecret: secret.ascii,
    });
  });
});

app.post("/handleaddtwofa", (req, res) => {
  const { userid, seecret, code } = req.body;
  if (userid && seecret && code) {
    let verified = verifytwofacode(code, seecret);
    if (verified) {
      connection.query("UPDATE users SET Secret=? WHERE id=?", [seecret, userid], function (uperr, upres) {
        if (uperr) throw uperr;
        if (upres.affectedRows) {
          return res.status(200).json({
            success: true,
            message: error_responses.You_Successfully_Turned_On_2FA[req.body.lang || defaultlanguague],
          });
        }
      });
    } else {
      return res.status(200).json({
        success: false,
        message: error_responses.Ivalid_Code[req.body.lang || defaultlanguague],
      });
    }
  } else {
    return res.status(200).json({
      success: false,
      message: error_responses.Fill_The_Datas[lang],
    });
  }
});

app.post("/handledeletetwofa", (req, res) => {
  const { userid, key } = req.body;
  if (userid && key) {
    connection.query("SELECT Secret FROM users WHERE id=?", [userid], function (suerr, sure) {
      if (suerr) throw suerr;
      if (sure.length) {
        let verified = verifytwofacode(key, sure[0].Secret);
        if (verified) {
          connection.query("UPDATE users SET Secret=? WHERE id=?", [null, userid], function (uperr, upres) {
            if (uperr) throw uperr;
            if (upres.affectedRows) {
              return res.status(200).json({
                success: true,
                message: error_responses.You_Successfully_Turned_Off_2FA[req.body.lang || defaultlanguague],
              });
            }
          });
        } else {
          return res.status(200).json({
            success: false,
            message: error_responses.Ivalid_Code[req.body.lang || defaultlanguague],
          });
        }
      }
    });
  } else {
    return res.status(200).json({
      success: false,
      message: error_responses.Fill_The_Datas[req.body.lang || defaultlanguague],
    });
  }
});

app.get("/validatetwofaverify/:token", (req, res) => {
  if (req.params.token) {
    connection.query("SELECT * FROM twofalogins WHERE Token=?", [req.params.token], function (suerr, sures) {
      if (suerr) throw suerr;
      if (sures.length) {
        return res.status(200).json({
          success: true,
        });
      } else {
        return res.status(200).json({
          success: false,
        });
      }
    });
  } else {
    return res.status(200).json({
      success: false,
    });
  }
});

app.post("/verifytwofa", (req, res) => {
  const { token, code } = req.body;
  if (token && code) {
    connection.query("SELECT * FROM twofalogins WHERE Token=?", [token], function (sterr, stres) {
      if (sterr) throw sterr;
      if (stres.length) {
        connection.query("SELECT id, Secret FROM users WHERE id=?", [stres[0].UserID], function (suerr, sures) {
          if (suerr) throw suerr;
          if (sures.length) {
            let verified = verifytwofacode(code, sures[0].Secret);
            if (verified) {
              let info = {
                UserID: sures[0].id,
                Token: generateRnadomkey(32),
                Ip: getIp(req),
                Date: getFullDate(),
              };
              connection.query("INSERT INTO sessions SET ?", [info], function (iserr, isres) {
                if (iserr) throw iserr;
                connection.query("DELETE FROM twofalogins WHERE Token=?", [token], function (dterr, dtres) {
                  if (dterr) throw dterr;
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
                message: error_responses.Ivalid_Code[req.body.lang || defaultlanguague],
              });
            }
          } else {
            return res.status(200).json({
              success: false,
              message: error_responses.Authentication_Error[req.body.lang || defaultlanguague],
            });
          }
        });
      } else {
        return res.status(200).json({
          success: false,
          message: error_responses.Authentication_Error[req.body.lang || defaultlanguague],
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

// Useful Functions \\

function verifytwofacode(key, secret) {
  let verify = speakeasy.totp.verify({
    secret: secret,
    encoding: "ascii",
    token: key,
  });
  return verify;
}

async function getRankIdByName(Name) {
  const mysqlprom = require("mysql2/promise");
  const contprom = await mysqlprom.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tsis_inventory_new",
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
    database: "tsis_inventory_new",
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

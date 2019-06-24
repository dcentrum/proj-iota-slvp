// var sqlite3 = require('sqlite3').verbose();

// module.exports = {
// db : new sqlite3.Database(':memory:'),
// db.serialize(function() {
//   db.run("CREATE TABLE lorem (info TEXT)");
 
//   var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//   for (var i = 0; i < 10; i++) {
//       stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();
 
//   db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
//       console.log(row.id + ": " + row.info);
//   });
// });
 
// db.close();

var sqlite3 = require('sqlite3').verbose();


let db = new sqlite3.Database('./PROJ_SLVP.db',sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if(err){
        return console.error(err.message);
    }
    console.log('Created/connected to PROJ_SLVP sqlite3 db.');
})

module.exports = {
create : function createTable(){
    db.run('CREATE TABLE Violation_Details(Violation_Id INTEGER PRIMARY KEY, Vehicle_No text NOT NULL, IOTA_Hash text NOT NULL, IPFS_Hash text NOT NULL, Violation_Appeal BOOLEAN);',function(err){
        if(err){
            return console.error(err.message);
        }
        console.log("Successfully created Violation_Details table")
    });
},

insert : function insertDb(Violation_Id, Vehicle_No, IOTA_Hash, IPFS_Hash, Violation_Appeal){
    db.run('INSERT INTO Violation_Details VALUES(Violation_Id, Vehicle_No, IOTA_Hash, IPFS_Hash, Violation_Appeal)',function(err){
      if (err) {
          return console.error(err.message);
        }
        console.log('Prepared Insert Statement');
  })
  },
  
select : function selectDb(){
    db.all('SELECT * FROM Violation_Details', [],function(err,row){
      if (err) {
          return console.error(err.message);
        }
        console.log(row);
  })
  },
  
update : function updateDb(Violation_Id){
  db.run('UPDATE Violation_Details SET Violation_Appeal = true WHERE Violation_Id = ?',[Violation_Id],function(err){
    if (err) {
      return console.error(err.message);
    }
    console.log('Row(s) updated: '+ this.changes);
  })
  }
}


db.close(function(err){
    if (err) {
        return console.error(err.message);
      }
      console.log('Closed the PROJ_SLVP database connection.');
})

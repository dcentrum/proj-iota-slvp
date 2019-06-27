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

module.exports = {

openDB : function(){  
  db = new sqlite3.Database('./PROJ_SLVP.db',sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if(err){
        return console.error(err.message);
    }
    console.log('Created/connected to PROJ_SLVP sqlite3 db.');
    //return db;
})
},

createTable : function createTable(){
    db.run('CREATE TABLE Violation_Details(challanNum text PRIMARY KEY, platenum text NOT NULL, challanDate DATE NOT NULL, IOTA_Hash text NOT NULL, IOTA_Seed text NOT NULL, IPFS_Hash text NOT NULL, isAppealed BOOLEAN, isAppealedAccepted BOOLEAN, isPaid BOOLEAN);',function(err){
        if(err){
            return console.error(err.message);
        }
        console.log("Successfully created Violation_Details table")
    });
},

addChallan : function addChallan(challanNum, platenum, challanDate, IOTA_Hash, IOTA_Seed, IPFS_Hash){
    db.run('INSERT INTO Violation_Details VALUES(?,?,?,?,?,?,FALSE,FALSE,FALSE)',[challanNum, platenum, challanDate, IOTA_Hash, IOTA_Seed, IPFS_Hash],function(err){
      if (err) {
          return console.error(err.message);
        }
        console.log('Inserted Successfully');
  })
  },
  
getChallans : function getChallans(platenumIn, challanDateIn, isAppealedIn, isPaidIn){
  let sql = 'SELECT * FROM Violation_Details WHERE CASE WHEN ? IS NULL THEN 1 ELSE platenum END = CASE WHEN ? IS NULL THEN 1 ELSE ? END ' +
                                            'AND CASE WHEN ? IS NULL THEN 1 ELSE challanDate END = CASE WHEN ? IS NULL THEN 1 ELSE ? END '+
                                            'AND CASE WHEN ? IS NULL THEN 1 ELSE isAppealed END = CASE WHEN ? IS NULL THEN 1 ELSE ? END '+
                                            'AND CASE WHEN ? IS NULL THEN 1 ELSE isPaid END = CASE WHEN ? IS NULL THEN 1 ELSE ? END';
    db.all(sql, [platenumIn, platenumIn, platenumIn, challanDateIn, challanDateIn, challanDateIn, isAppealedIn, isAppealedIn, isAppealedIn, isPaidIn, isPaidIn, isPaidIn], function(err,row){
      if (err) {
          return console.error(err.message);
        }
        console.log(row);
  })
},
  
appealChallan : function appealChallan(challanNum, platenum){
  db.run('UPDATE Violation_Details SET isAppealed = true WHERE challanNum = ? AND platenum = ?',[challanNum, platenum],function(err){
    if (err) {
      return console.error(err.message);
    }
    console.log('Row(s) updated: '+ this.changes);
  })
},

appealAction : function appealAction(challanNum, platenum){
    db.run('UPDATE Violation_Details SET isAppealedAccepted = true WHERE challanNum = ? AND platenum = ?',[challanNum, platenum],function(err){
      if (err) {
        return console.error(err.message);
      }
      console.log('Row(s) updated: '+ this.changes);
    })
},

payChallan : function payChallan(challanNum, platenum){
  db.run('UPDATE Violation_Details SET isPaid = true WHERE challanNum = ? AND platenum = ?',[challanNum, platenum],function(err){
      if (err) {
        return console.error(err.message);
      }
    console.log('Row(s) updated: '+ this.changes);
  })
},

close : function close(){
  db.close(function(err){
    if (err) {
        return console.error(err.message);
      }
      console.log('Closed the PROJ_SLVP database connection.');
})
}

}

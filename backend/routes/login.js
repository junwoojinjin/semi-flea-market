
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'nodejs',
    password : 'skku123!',
    database : 'testing'
  });

const computeUserLogin = (req, res) => {
    const {id, pw } = req.body;
    var user;
    connection.query(`SELECT * FROM user WHERE login_id='${id}'`, function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        
        user = results;
        if(user.length === 0){
            res.send({check:false,type:'ID does not exist'});
        }
        else{
          if(user[0].login_pw == pw){
              res.send({check:true,user_id:user[0].id,user_name:user[0].name})
          }
          else{
              res.send({check:false,type:'Wrong PW'});
          }
        }
        
      }); 
};

const computeUserRegister = (req, res) => {
    const {id, pw, name} = req.body;
    var user;
    connection.query(`SELECT * FROM user WHERE login_id='${id}'`, function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        
        user = results;
        if(user.length === 0){
            connection.query('SELECT max(id) as id FROM user;',function (error, results, fields){
                var new_id = results[0].id;
                connection.query(`INSERT INTO user (id, name, login_id,login_pw) VALUES ('${new_id+1}', '${name}','${id}','${pw}');`,function (error, results, fields){
                    if (error) {
                        console.log(error);
                    }
                    else{
                        res.send({check:true});
                    }
                });
            })
            
        }
        else{
            res.send({check:false})
        }
      }); 
};



const checkUserID = (req, res) => {
    const {id } = req.body;
  
    connection.query(`SELECT * FROM user WHERE login_id='${id}'`, function (error, results, fields) {
        if( results.length !== 0){
            res.send({check:false});
        }
        else{
            res.send({check:true});
        }
    });
}

const getUsers = (req, res) => {

    connection.query(`SELECT * FROM user`, function (error, results, fields) {
        if(error)
        {
            console.log(error);
        }
        else{
            res.send(results);
        }
    });
}

const deleteUserByID = (req, res) => {
    console.log('???',req.data)
    const {user_id} = req.body;
    connection.query(`DELETE FROM user WHERE id = '${user_id}';`, function (error, results, fields) {
        if(error)
        {
            console.log(error);
        }
        else{
            res.send(true);
        }
    });
}

const ChangeUserByID = (req, res) => {
    console.log('???',req.body)
    const {user_id,name} = req.body;
    connection.query(`UPDATE  user SET name = '${name}' WHERE (id = '${user_id}');`, function (error, results, fields) {
        if(error)
        {
            console.log(error);
        }
        else{
            res.send(true);
        }

    });
}
module.exports = {
    computeUserLogin,
    computeUserRegister,
    checkUserID,
    getUsers,
    deleteUserByID,
    ChangeUserByID
};
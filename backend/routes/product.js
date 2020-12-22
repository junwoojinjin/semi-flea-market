
var mysql = require('mysql');
const { use } = require('.');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'nodejs',
    password : 'skku123!',
    database : 'testing'
  });

const saveImg = (req, res) => {
    console.log(req.body)
    var {name, type, price, place, date ,phone,user_id} = req.body;
    console.log(req.file)
    
    connection.query(`INSERT INTO items (user_id,name, price, type, date, picture_path, place, phone_num,warning_count,selling) VALUES ('${user_id}','${name}', '${price}','${type}','${date}','${req.file.filename}','${place}','${phone}',0,1);`,
        function (error, results, fields){
            if (error) {
                console.log(error);
            }
            else{
                res.send({check:true});
            }
        }
    );
   
}
const getProducts = (req,res) => {
    console.log(req.body)
    console.log(req.file)
    if(req.body.option === false){
        connection.query(`SELECT * FROM items;`,
            function (error, results, fields){
                if (error) {
                    console.log(error);
                }
                else{
                    res.send(results);
                }
            }
        );
    }
    else{
        const {seller_name , p_name , price_limit} = req.body;
        console.log(seller_name)
        if(seller_name === '' && p_name  === '' && price_limit ===''){
            connection.query(`SELECT * FROM items;`,
            function (error, results, fields){
                if (error) {
                    console.log(error);
                }
                else{
                    res.send(results);
                }
            }
         );
        }
        else if(seller_name !== '' && p_name  === '' && price_limit ===''){
            connection.query(`SELECT items.* FROM items Join user ON items.user_id = user.id WHERE user.name = '${seller_name}';`,
            function (error, results, fields){
                if (error) {
                    console.log(error);
                }
                else{
                    res.send(results);
                }
            }
         );
        }
        else if(seller_name === '' && p_name  !== '' && price_limit ===''){
            connection.query(`SELECT items.* FROM items Join user ON items.user_id = user.id WHERE items.name = '${p_name}';`,
            function (error, results, fields){
                if (error) {
                    console.log(error);
                }
                else{
                    res.send(results);
                }
            }
         );
        }
        else if(seller_name === '' && p_name  === '' && price_limit !==''){
            connection.query(`SELECT items.* FROM items Join user ON items.user_id = user.id WHERE items.price <= '${price_limit}';`,
            function (error, results, fields){
                if (error) {
                    console.log(error);
                }
                else{
                    res.send(results);
                }
            }
         );
        }
        else if(seller_name === '' && p_name  !== '' && price_limit !==''){
            connection.query(`SELECT items.* FROM items Join user ON items.user_id = user.id WHERE items.price <= '${price_limit}' and items.name = '${p_name}';`,
            function (error, results, fields){
                if (error) {
                    console.log(error);
                }
                else{
                    res.send(results);
                }
            }
         );
        }
        else if(seller_name !== '' && p_name  !== '' && price_limit !==''){
            connection.query(`SELECT items.* FROM items Join user ON items.user_id = user.id WHERE items.price <= '${price_limit}' and user.name = '${seller_name}' and items.name = '${p_name}';`,
            function (error, results, fields){
                if (error) {
                    console.log(error);
                }
                else{
                    res.send(results);
                }
            }
         );
        }
        else if(seller_name !== '' && p_name  !== '' && price_limit ===''){
            connection.query(`SELECT items.* FROM items Join user ON items.user_id = user.id WHERE items.name = '${p_name}' and user.name = '${seller_name}';`,
            function (error, results, fields){
                if (error) {
                    console.log(error);
                }
                else{
                    res.send(results);
                }
            }
         );
        }
        else if(seller_name !== '' && p_name  === '' && price_limit !==''){
            connection.query(`SELECT items.* FROM items Join user ON items.user_id = user.id WHERE user.name = '${seller_name}' and items.price <= '${price_limit}';`,
                function (error, results, fields){
                    if (error) {
                        console.log(error);
                    }
                    else{
                        res.send(results);
                    }
                }
            );
        }
    }
}
const getProductByID = (req,res) => {
    console.log(req.body)
    var {p_id} = req.body;

    connection.query(`SELECT items.*, user.name as user_name FROM items Join user ON items.user_id = user.id WHERE items.id = ${p_id};`,
        function (error, results, fields){
            if (error) {
                console.log(error);
            }
            else{
                res.send(results[0]);
            }
        }
    );
}
const computeProductBuy = (req,res) =>{
    console.log(req.body)
    var {p_id,user_id, time} = req.body;
    connection.query(`INSERT INTO buyLog (user_id,product_id,time) VALUES ('${user_id}','${p_id}', '${time}:00');`,
        function (error, results, fields){
            if (error) {
                console.log(error);
            }
            else{
                connection.query(`UPDATE items SET selling = '0' WHERE (id = '${p_id}');`,
                function (error, results, fields){
                    if (error) {
                        console.log(error);
                    }
                    else{
                    
                        res.send({check:true});
                    }
                });
            }
        }
    );

}
const computeProductWish = (req,res)=>{
    console.log(req.body)
    var {check,p_id,user_id} = req.body;
    if(check === 'first'){ // 이미 있으면 true 반환
        connection.query(`SELECT * FROM wish_table WHERE product_id = ${p_id} and user_id = ${user_id};`,
        function (error, results, fields){
            if (error) {
                console.log(error);
            }
            else{
                if(results.length !== 0){
                    res.send({check:true});
                }
                else{
                    res.send({check:false});
                }
            }
        }
    );
    }

    else if(check === 'register'){
        connection.query(`INSERT INTO wish_table (user_id,product_id) VALUES ('${user_id}','${p_id}');`,
        function (error, results, fields){
            if (error) {
                console.log(error);
            }
            else{
                res.send({check:true});
            }
     });
    }
    else{
        connection.query(`DELETE FROM wish_table WHERE (user_id = '${user_id}' and product_id = '${p_id}');`,
        function (error, results, fields){
            if (error) {
                console.log(error);
            }
            else{
                res.send({check:true});
            }
        });
    }
}
const getMyProductByID = (req,res)=>{
    console.log(req.body);
    const {user_id} = req.body;
    connection.query(`SELECT items.*, count(product_id) as wish_count from items left JOIN wish_table ON items.id = wish_table.product_id WHERE items.user_id = '${user_id}' GROUP BY items.id;`,
        function (error, results, fields){
            if (error) {
                console.log(error);
            }
            else{
                res.send(results);
            }
        }
    );
}

const deleteMyProductByID = (req,res)=>{
    console.log(req.body);
    const {product_id} = req.body;
    connection.query(`DELETE FROM items WHERE id = '${product_id}';`,
        function (error, results, fields){
            if (error) {
                console.log(error);
            }
            else{
                res.send({check:true});
            }
        }
    );

}
const editProductByID = (req,res)=>{
    const {p_id,name, type, price, place, date ,phone} = req.body;
    connection.query(`UPDATE items SET name='${name}',type='${type}', price='${price}', place='${place}', date='${date}' ,phone_num='${phone}' WHERE (id = '${p_id}');`,
        function (error, results, fields){
            if (error) {
                console.log(error);
            }
            else{
                res.send({check:true});
            }

        }
    );
}
const getPurchListByID = (req,res)=>{

    console.log('!!!',req.body);
    const {user_id} = req.body;
    connection.query(`SELECT items.* , buylog.time as buytime FROM items join buyLog ON items.id = buyLog.product_id WHERE (buyLog.user_id = '${user_id}');`,
        function (error, results, fields){
            if (error) {
                console.log(error);
            }
            else{
                res.send(results);
            }

        }
    );
}

const getWishListByID = (req,res)=>{

    console.log('!!!',req.body);
    const {user_id} = req.body;
    connection.query(`SELECT items.* FROM items join wish_table ON items.id = wish_table.product_id WHERE wish_table.user_id = ${user_id};`,
        function (error, results, fields){
            if (error) {
                console.log(error);
            }
            else{
                res.send(results);
            }

        }
    );
}

module.exports = {
    saveImg,
    getProducts,
    getProductByID,
    computeProductBuy,
    computeProductWish,
    getMyProductByID,
    deleteMyProductByID,
    editProductByID,
    getPurchListByID,
    getWishListByID
};
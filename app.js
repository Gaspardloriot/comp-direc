const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const port = process.env.PORT || 5000;

//Create connection
const db= mysql.createConnection({
    host    : 'eu-cdbr-west-03.cleardb.net',
    user    : 'b415b5d9b9c974',
    password: '5850e3eb',
    database: 'heroku_9275f474c0b2e99'
});

//Connect
db.connect((err)=>{
if(err){
    throw(err);
}
console.log('mysql connected...')
})


const app= express();

//Insert post 1
app.get('/addpost1', (req, res)=>{
    let post={title:'Post one', body:'this is post number 1'};
    let sql= 'INSERT INTO posts SET ?'
    let query= db.query(sql, post, (err, result)=>{
        if(err) throw err;
        console.log( result, 'Operation successful');
        res.send('Post 1 added...');
    })
});

//Insert post 2
app.get('/addpost2', (req, res)=>{
    let post={title:'Post two', body:'this is post number 2'};
    let sql= 'INSERT INTO posts SET ?'
    let query= db.query(sql, post, (err, result)=>{
        if(err) throw err;
        console.log( result, 'Operation successful');
        console.log(db)
        res.send('Post 2 added...');
    })
});

//Select posts
app.get('/getposts/:id', (req, res)=>{
    let sql = `SELECT * FROM department WHERE id=${req.params.id}`;
    let query= db.query(sql, (err,results)=>{
        if (err) throw err;
        console.log(results[0].name);       
        res.json(results)
    });
});

//Select posts
app.get('/getlocation/:id', (req, res)=>{
    let sql = `SELECT * FROM location WHERE id=${req.params.id}`;
    let query= db.query(sql, (err,results)=>{
        if (err) throw err;
        console.log(results);       
        res.json(results)
    });
});

//Select post
app.get('/getpost/:id', (req, res)=>{
    let sql = `SELECT * FROM personnel WHERE id= ${req.params.id}`;
    let query= db.query(sql, (err,result)=>{
        if (err) throw err;
        console.log(result);        
        res.send(result)
    });
});

//update post
app.get('/updatepost/:id', (req, res)=>{
    let newTitle= 'Updated Title';
    let sql = `UPDATE POSTS SET title= '${newTitle}' WHERE id= ${req.params.id}`;
    let query= db.query(sql, (err,result)=>{
        if (err) throw err;
        console.log(result);
        res.send(result)
    });
});

function deletePost(num){
//delete post
app.get('/deletepost', (req, res)=>{
    let newTitle= 'Updated Title';
    let sql = `DELETE FROM posts WHERE id= ${num}`;
    let query= db.query(sql, (err,result)=>{
        if (err) throw err;
        console.log(res);
        res.send('Post deleted, Operations success')
    });
});
}

let table='personnel'
//get database
app.get(`/geteverything`, (req, res)=>{    
    let sql = `SELECT * FROM ${table} `;
    let query= db.query(sql, (err,result)=>{
        if (err) throw err;
        console.log(query);        
        
        res.send(result)
    });
});




app.use(express.json());
app.use(cors())

app.listen(port, () => {
    console.log(`company directory listening at http://localhost:${port}`)
  });

  
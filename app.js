const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const port = process.env.PORT || 8081;

//Create connection
const db= mysql.createConnection({
    host    : 'eu-cdbr-west-03.cleardb.net',
    user    : 'b415b5d9b9c974',
    password: '5850e3eb',
    database: 'heroku_9275f474c0b2e99'
});



//Connect to database
db.connect((err)=>{
    if(err){
        throw(err);
    }
    console.log(`mysql connected to database...`)
    })
    
    //Setting up EXPRESS, CORS, JSON
    const app= express();
    app.use(cors())
    app.use(express.json());
    
    
    //Keep database alive
    setInterval(function () {
        db.query('SELECT 1');
        console.log(`query executed on port ${port},maintaining database alive...`);
    }, 50000);
    
    //get database
    app.get(`/geteverything`, (req, res)=>{    
        let sql = `SELECT * FROM PERSONNEL `;
        let query= db.query(sql, (err,result)=>{
            if (err) throw err;
            console.log(query);        
            
            res.send(result)
        });
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
    
    //Update
    app.post('/update', (req, res)=>{    
         let body=req.body;
         let req_table=body.table
         let req_field=body.field
         let changeTo=body.changeTo
         let id=body.id;
         let sql = `UPDATE ${req_table} SET ${req_field} = '${changeTo}' WHERE id=${id}`;
         let query= db.query(sql, (err,result)=>{
            if (err) throw err;
            console.log(result);        
            console.log(req.body);
            res.json(`employee ${id}'s ${req_field} was updated to ${changeTo}`)
        })
    })
    
    //Add a new employee:
    app.post('/add_employee', (req, res)=>{
        console.log(req.body)
        let newEmployee=req.body
        let idGenerator=Math.floor((Math.random()*1000000)+1);    
        req.body.id=idGenerator;
        let sql= 'INSERT INTO personnel SET ?'
        let query= db.query(sql, newEmployee, (err, result)=>{
            if(err) throw err;
            console.log( `${idGenerator} was added,`, 'new employee successfully processed...');
            res.json(`New employee ${newEmployee.firstName} ${newEmployee.lastName}, id: ${newEmployee.id} was added...`);
        })
    });
    
    //delete post
    app.get('/delete/:id', (req, res)=>{    
        let sql = `DELETE FROM personnel WHERE id= ${req.params.id}`;
        let query= db.query(sql, (err,result)=>{
            if (err) throw err;
            console.log(res);
            res.json(`Employee ${req.params.id} was deleted`)
        });
    });
    
    app.listen(port, () => {
        console.log(`company directory listening at http://localhost:${port}`)
      });
    

  
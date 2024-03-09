const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    await pool.getConnection((err, conn)=>{
      if(err)
        throw err;
      console.log('Connected to the DB');
      conn.release();
    });
    await checkDatabase();
  } catch (error) {
    console.error('Error connecting to the DB:', error);
  }
})();

function checkDatabase(){
  pool.query("SELECT * FROM `admins`", (err) =>{
    if(err){
      pool.query("create table `admins` (`id` int auto_increment,`email` text null,`username` text null,`password` text null,`name` text null,`verified` boolean default false,constraint api_keys_pk primary key (id))",
        (err)=>{
          if(err)
            throw err;
          console.log(`Database admins created!`)
        }
      )
    }
  })
  pool.query("SELECT * FROM `blocks`", (err) =>{
    if(err){
      pool.query("create table `blocks` (`id` int auto_increment,`data` longtext null,`date` text null,constraint api_keys_pk primary key (id))",
        (err)=>{
          if(err)
            throw err;
          console.log(`Database blocks created!`)
        }
      )
    }
  })
  pool.query("SELECT * FROM `settings`", (err) =>{
    if(err){
      pool.query("create table `settings` (`id` int auto_increment,`data` longtext null,constraint api_keys_pk primary key (id))",
        (err)=>{
          if(err)
            throw err;
          console.log(`Database settings created!`)
        }
      )
    }
  })
  console.log(`Database checked!`)
}

module.exports = pool;
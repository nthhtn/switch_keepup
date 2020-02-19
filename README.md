# Switch KeepUp

This repository is dedicated to Switch KeepUp web application, in scope of Running Software Project course

### Technologies in use

***

* Node.js ft. Express:

> Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Express is a fast, unopinionated, minimalist web framework for Node.js.

* React ft. Redux:

>  React is a JavaScript library for building user interfaces. Redux is a predictable state container for JavaScript apps. (Not to be confused with a WordPress framework – Redux Framework). It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience, such as live code editing combined with a time traveling debugger. You can use Redux together with React, or with any other view library. It is tiny (2kB, including dependencies).

* MySQL ft. Sequelize:

> MySQL is a relational database management system based on SQL – Structured Query Language. The application is used for a wide range of purposes, including data warehousing, e-commerce, and logging applications. The most common use for mySQL however, is for the purpose of a web database. Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.

### Installation

***

* Prerequisites: 
	* Node.js: https://nodejs.org/en/
	* MySQL: https://www.mysql.com/ ; Additionally, a SQL database and user must already exist

* Clone project:
```
git clone https://github.com/nthhtn/switch_keepup.git
```

* Install packages:
```
npm install
```

* Initialize `.env` file in root folder, specifying:
```
DB_NAME=your_mysql_database_name
DB_USER=your_mysql_db_user
DB_PWD=your_mysql_db_password
DB_HOST=your_mysql_database_host
```

* Run project:
```
npm start
```

### Contributors

***

* Aleksi Ruokoniemi
* Anukesh Chauhan
* Arttu Ristola
* Hien Nguyen
* Jani Haimilahti

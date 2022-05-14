require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// setup config app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())

// setup swagger
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express")
const swaggerSpect = {
  definition: {
      openapi: "3.0.0",
      info: {
          title: "Express API with Swagger",
          version: "0.1.0",
          description: "API Documentation",
          license: {
              name: "MIT",
              url: "https://spdx.org/licenses/MIT.html",
          },
          contact: {
              name: "Alip Rahman",
              email: "aliprrahman@gmail.com",
          },
      },
      servers: [
          {
              url: `http://localhost:${process.env.APP_PORT}`,
              description: 'Development server',
          },
      ],
  },
  apis: [
     "src/routes/*.js"
  ],
}
const swaggerDocument = swaggerJSDoc(swaggerSpect)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

app.get('/', (req, res, next) => {
    try {
        res.status(200).send({
            message: 'wellcome to REST API'
        });
    } catch (error) {
        next(error);
    }
});

// load router module
app.use('/', require('./src/routes/index'));

// error handle
// app.use((req, res, next) => {
// 	res.status(404).send({
// 		message: 'Route Path Not found'
// 	});
// })
// app.use((err, req, res, next) => {
// 	res.status(500).send({
// 		status: 'Internal server error',
// 		error: err.message ? err.message : ''
// 	});
// })

// run app
app.listen(process.env.APP_PORT, () => {
  console.log(`App Started on Port ${process.env.APP_PORT}`);
});

require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const xssClean = require('xss-clean');
const helmet = require('helmet');
const cors = require('cors');
const hpp = require('hpp');
const email = require('./routes/email');
const port = process.env.PORT || 8000;

const rateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100 // 100 request
    // 100 request in 10 mins
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(xssClean());
app.use(rateLimiter);
app.use(cors());
app.options('*', cors())
app.use(hpp());

app.post('/email', email);

app.listen(port, () => {
    console.log(`Email server started at PORT ${port}`);
});
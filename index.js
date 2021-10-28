const express = require('express'); // importing express dependency
const  bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use(express.static('img'));   
const dotenv = require('dotenv');
const  mongoose =  require('mongoose'); // importing mongoose depency

const cors = require('cors');



app.use(cors({

    origin: '*'

}));

// connecting to mongodb database 
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/testblog')
.then( () => console.log('Connected to database..'))
.catch( err => console.log('Could not connect to the database', err));

dotenv.config();


// import router 
const postRouter = require('./router/postRouter');





app.use('/api/post', postRouter); // calling the post api


















const port =  process.env.PORT || 5000;
app.listen(port, () => console.log(`Listen on port ${port}`));
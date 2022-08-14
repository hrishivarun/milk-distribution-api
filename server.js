const mongoose = require('mongoose');
const express = require('express');

const addOrder = require('./routes/addOrder');
const updateStatus = require('./routes/updateStatus');
const updateDetails = require('./routes/updateDetails');
const deletedOrder = require('./routes/deleteOrder');
const checkCapacity = require('./routes/checkCapacity');


const connectionURL = `mongodb+srv://user:password%40321@dairydatabase.lbgitoc.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();

app.use(addOrder);
app.use(updateDetails);
app.use(updateStatus);
app.use(deletedOrder);
app.use(checkCapacity);


const PORT = process.env.PORT || 3000;
const db = mongoose.connection;
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`listening on PORT ${PORT}`);
    });
})
const express = require("express");
const cors = require("cors");
const port = 8000;
const app = express();
const db_name = "schedule_db";

app.use(cors());
app.use(express.json());

require("./server/config/mongoose")(db_name);
require("./server/routes/schedule.routes")(app);

app.listen(port, () => console.log(`Listening on port ${port}`));
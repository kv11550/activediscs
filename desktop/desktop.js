const express = require('express')
//const cors_1 = __importDefault(require("cors"));
//const bodyParser = __importStar(require("body-parser"));
//const helmet_1 = __importDefault(require("helmet"));
const app = express()
const port = 3000


app.use(express.static(''));

app.get('/test', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
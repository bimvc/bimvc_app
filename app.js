const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.use(express.static('dist'));
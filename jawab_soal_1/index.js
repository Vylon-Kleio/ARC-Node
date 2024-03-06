// Contoh penggunaan library axios untuk get request ke public API
const axios = require("axios");

axios
  .get("https://api.publicapis.org/entries")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });

// Import readline module
const readline = require("readline");

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// List of menu items for the restaurant
const menu = [
  { name: "Sate Padang", price: 19000 },
  { name: "Ayam Geprek", price: 15000 },
  { name: "Seblak", price: 10000 },
  { name: "Bubur Ayam", price: 12000 },
  { name: "Ketoprak", price: 15000 },
  { name: "Extra Joss Susu", price: 7000 },
  { name: "Teh Poci", price: 8000 },
  { name: "Es Cekek", price: 3000 },
];

// Display menu to user
function showMenu() {
  console.log("Selamat datang di Resto!");
  console.log("Menu:");
  menu.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name} - Rp${item.price}`);
  });
}

// Receive order
function placeOrder(order, callback) {
  setTimeout(() => {
    const selectedMenuItem = menu[order - 1];
    if (selectedMenuItem) {
      callback(null, selectedMenuItem);
    } else {
      callback("Menu tidak ditemukan!");
    }
  }, 2000);
}

// Main Menu
async function welcomeToResto() {
  showMenu();

  const orders = [];

  while (true) {
    const order = await new Promise((resolve) => {
      rl.question(
        "Masukkan angka menu yang ingin dipesan (ketik done untuk mengakhiri pesanan): ",
        (answer) => {
          resolve(answer);
        }
      );
    });

    if (order.toLowerCase() === "done") {
      break;
    }

    const orderNumber = parseInt(order);
    if (isNaN(orderNumber) || orderNumber < 1 || orderNumber > menu.length) {
      console.log("Menu tidak ditemukan!");
      continue;
    }

    orders.push(orderNumber);
  }

  try {
    let totalPrice = 0;

    for (const order of orders) {
      const result = await new Promise((resolve, reject) => {
        placeOrder(order, (error, menuItem) => {
          if (error) {
            reject(error);
          } else {
            resolve(menuItem);
          }
        });
      });

      console.log(`Kamu memesan: ${result.name}`);
      console.log(`Harga: Rp${result.price}`);
      totalPrice += result.price;
    }

    console.log(`Total harga untuk semua pesanan: Rp${totalPrice}`);
  } catch (error) {
    console.log(error);
  }

  rl.close();
}

// Selamat Datang di Resto
welcomeToResto();

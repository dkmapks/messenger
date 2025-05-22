let day = 1;
let money = 1000;
let stock = 0;
const buyPrices = {
  10: 40,
  20: 35,
  50: 30,
  100: 25,
  200: 20
};

function buyDrugs() {
  let amount = prompt("Ile gram chcesz kupić? (10, 20, 50, 100, 200)");
  amount = parseInt(amount);
  if (!buyPrices[amount]) return alert("Nieprawidłowa ilość!");
  let cost = amount * buyPrices[amount];
  if (money >= cost) {
    money -= cost;
    stock += amount;
    log(`Zakupiono ${amount}g po ${buyPrices[amount]} zł/g = ${cost} zł`);
    updateUI();
  } else {
    alert("Nie masz tyle kasy!");
  }
}

function nextDay() {
  day++;
  const clients = Math.floor(Math.random() * 21) + 20; // 20–40
  let sold = Math.min(clients, stock);
  let earned = sold * 50;
  money += earned;
  stock -= sold;

  const places = ["Park Solidarności", "Promenada nad Jeziorem", "ul. Wojska Polskiego", "Os. Jeziorna", "Plaża miejska", "Dworzec PKP", "Ełcka Kolejka Wąskotorowa"];
  const place = places[Math.floor(Math.random() * places.length)];

  log(`Dzień ${day}: sprzedano ${sold}g za ${earned} zł (${clients} klientów) na ${place}`);

  if (stock < 20) {
    log(`Masz mało towaru (${stock}g)! Kliknij prawym przyciskiem myszy i wybierz „Kup towar”`);
  }

  updateUI();
}

function updateUI() {
  document.getElementById("day").textContent = day;
  document.getElementById("money").textContent = money;
  document.getElementById("stock").textContent = stock;
}

function log(text) {
  const logBox = document.getElementById("log");
  logBox.innerHTML = `<div>> ${text}</div>` + logBox.innerHTML;
}

// Kupno towaru – shortcut prawym przyciskiem
window.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  buyDrugs();
});
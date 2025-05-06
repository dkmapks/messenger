// Istniejące dane (zachowane bez zmian)
let cash = 1000;
let btcBalance = 0;
let storageUsed = 0;
let storageLimit = 50;

let inventory = {
  kokaina: 0,
  marihuana: 0,
  mefedron: 0,
  amfetamina: 0,
  pixy: 0
};

let warehouseLevels = [
  { name: "Darmowy", capacity: 50, cost: 0 },
  { name: "Poziom 2", capacity: 200, cost: 1000 },
  { name: "Poziom 3", capacity: 1000, cost: 5000 },
  { name: "Poziom 4", capacity: 5000, cost: 15000 },
  { name: "Poziom 5", capacity: 30000, cost: 30000 }
];
let currentWarehouse = 0;

let supplierOffers = [];
let clientOffers = [];

let workers = [
  { name: "Kamil" }, { name: "Tymon" }, { name: "Andrzej" },
  { name: "Louis" }, { name: "Tomek" }, { name: "Kacper" },
  { name: "Bartek" }, { name: "Tiamo" }, { name: "Paweł" },
  { name: "Tomek" }
];
let activeDeliveries = [];

let travelCities = [
  { name: "Olsztyn", cost: 2500, bonus: 1 },
  { name: "Białystok", cost: 5000, bonus: 2 },
  { name: "Wrocław", cost: 10000, bonus: 4 },
  { name: "Gdańsk", cost: 20000, bonus: 5 },
  { name: "Warszawa", cost: 50000, bonus: 8 },
  { name: "Berlin", cost: 80000, bonus: 10 },
  { name: "Madryt", cost: 120000, bonus: 13 },
  { name: "Rzym", cost: 160000, bonus: 15 },
  { name: "Tokio", cost: 200000, bonus: 20 },
  { name: "Kolumbia", cost: 250000, bonus: 25 },
  { name: "Monako", cost: 400000, bonus: 30 },
  { name: "Hamburg", cost: 1000000, bonus: 50 }
];

// Nowy: eksport narkotyków
function exportDrugs(drug, amount) {
  if (inventory[drug] >= amount) {
    inventory[drug] -= amount;
    storageUsed -= amount;
    let value = amount * 200; // ustalony zysk
    cash += value;
    alert(`Eksportowano ${amount}g ${drug} za ${value} zł.`);
    updateUI();
  } else {
    alert("Za mało towaru.");
  }
}

// Nowy: zapis gry
function saveGame() {
  const state = {
    cash, btcBalance, storageUsed, storageLimit, inventory,
    currentWarehouse, supplierOffers, clientOffers, workers,
    activeDeliveries
  };
  localStorage.setItem("ddrugsSave", JSON.stringify(state));
  alert("Gra zapisana.");
}

// Nowy: wczytanie gry
function loadGame() {
  const data = localStorage.getItem("ddrugsSave");
  if (data) {
    const state = JSON.parse(data);
    Object.assign(window, state);
    updateUI();
    alert("Gra wczytana.");
  } else {
    alert("Brak zapisu gry.");
  }
}

// Nowy: kupno/sprzedaż BTC po kursie 50k
const btc = {
  deposit() {
    let amt = parseFloat(document.getElementById("btcAmount").value);
    let cost = amt * 50000;
    if (!isNaN(amt) && cash >= cost) {
      btcBalance += amt;
      cash -= cost;
      updateUI();
    } else {
      alert("Za mało gotówki.");
    }
  },
  withdraw() {
    let amt = parseFloat(document.getElementById("btcAmount").value);
    if (!isNaN(amt) && btcBalance >= amt) {
      btcBalance -= amt;
      cash += amt * 50000;
      updateUI();
    } else {
      alert("Za mało BTC.");
    }
  }
};

// Nowy: klient VIP co 30 sekund
function generateVipClient() {
  const drugs = ["kokaina", "marihuana", "mefedron", "amfetamina", "pixy"];
  let vipOrder = [];
  for (let i = 0; i < 3; i++) {
    let drug = drugs[Math.floor(Math.random() * drugs.length)];
    let amount = Math.floor(Math.random() * 50) + 50;
    let price = (drug === "kokaina" ? 500 : 100) + Math.floor(Math.random() * 200);
    vipOrder.push({ drug, amount, price });
  }
  vipOrder.forEach(order => {
    clientOffers.push(order);
  });
  alert("Pojawił się klient VIP z dużym zamówieniem!");
}

// Podmiana podróży na ulepszenia (po zakupie znika)
function travel(city, cost, bonus) {
  if (cash >= cost) {
    cash -= cost;
    workers.forEach(w => {
      w.bonus = (w.bonus || 0) + bonus;
    });
    travelCities = travelCities.filter(c => c.name !== city);
    alert(`Podróż do ${city}. Pracownicy mają teraz +${bonus} zł/g.`);
    updateUI();
  }
}

// Zmniejszenie cen darknet (supplier)
function generateSupplierOffer() {
  const drugs = ["kokaina", "marihuana", "mefedron", "amfetamina", "pixy"];
  let drug = drugs[Math.floor(Math.random() * drugs.length)];
  let amount = Math.floor(Math.random() * 10) + 1;
  let price = Math.floor(Math.random() * 80) + 20; // niższe ceny
  supplierOffers.push({ drug, amount, price });
}

function generateClientOffer() {
  const drugs = ["kokaina", "marihuana", "mefedron", "amfetamina", "pixy"];
  let drug = drugs[Math.floor(Math.random() * drugs.length)];
  let amount = Math.floor(Math.random() * 5) + 1;
  let basePrices = { kokaina: 400, marihuana: 50, mefedron: 50, amfetamina: 40, pixy: 20 };
  let price = basePrices[drug] + Math.floor(Math.random() * 50);
  clientOffers.push({ drug, amount, price });
}

// Pokazanie UI telefonu
document.getElementById("openPhone").addEventListener("click", () => {
  document.getElementById("phoneApps").classList.remove("hidden");
});

// Interwały
setInterval(generateSupplierOffer, 15000);
setInterval(generateClientOffer, 10000);
setInterval(generateVipClient, 30000);

updateUI();

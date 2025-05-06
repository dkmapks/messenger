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
  { name: "Kamil" }, { name: "Monika" }, { name: "Andrzej" },
  { name: "Ola" }, { name: "Tomek" }, { name: "Wiktoria" },
  { name: "Bartek" }, { name: "Julia" }, { name: "Paweł" },
  { name: "Magda" }
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
  { name: "Kolumbia", cost: 250000, bonus: 24 },
  { name: "Monako", cost: 400000, bonus: 30 },
  { name: "Hamburg", cost: 1000000, bonus: 50 }
];

let darknetOffers = [];

function updateUI() {
  document.getElementById("cash").innerText = cash;
  document.getElementById("btc").innerText = btcBalance.toFixed(3);
  document.getElementById("storageUsed").innerText = storageUsed;
  document.getElementById("storageLimit").innerText = storageLimit;

  let warehouseHTML = "";
  warehouseLevels.forEach((level, i) => {
    if (i > currentWarehouse && cash >= level.cost) {
      warehouseHTML += `<button onclick="upgradeWarehouse(${i})">${level.name} (${level.capacity}g) za ${level.cost} zł</button><br>`;
    }
  });
  document.getElementById("warehouseOptions").innerHTML = warehouseHTML;

  let invHTML = "";
  for (let drug in inventory) {
    invHTML += `<p>${drug}: ${inventory[drug]}g</p>`;
  }
  document.getElementById("inventory").innerHTML = invHTML;

  let supplierHTML = "";
  supplierOffers.forEach((offer, i) => {
    supplierHTML += `<p>${offer.amount}g ${offer.drug} po ${offer.price} zł/g <button onclick="acceptSupplier(${i})">Kup</button></p>`;
  });
  document.getElementById("supplierOffers").innerHTML = supplierHTML;

  let clientHTML = "";
  clientOffers.forEach((offer, i) => {
    clientHTML += `<p>Kup ${offer.amount}g ${offer.drug} za ${offer.price} zł/g <button onclick="acceptClient(${i})">Sprzedaj</button></p>`;
  });
  document.getElementById("clients").innerHTML = clientHTML;

  let travelHTML = "";
  travelCities.forEach(c => {
    travelHTML += `<button onclick="travel('${c.name}', ${c.cost}, ${c.bonus})">${c.name} (${c.cost} zł, +${c.bonus} zł/g)</button> `;
  });
  document.getElementById("travel").innerHTML = travelHTML;

  let workersList = "";
  activeDeliveries.forEach(d => {
    workersList += `<p>${d.name} dostarcza ${d.amount}g ${d.drug} za ${d.price} zł/g</p>`;
  });
  document.getElementById("workersList").innerHTML = workersList;

  let workerOptions = "";
  workers.forEach(w => {
    workerOptions += `<option value="${w.name}">${w.name}</option>`;
  });
  document.getElementById("workerName").innerHTML = workerOptions;

  let darknetHTML = "";
  darknetOffers.forEach((offer, i) => {
    darknetHTML += `<p>${offer.amount}g ${offer.drug} po ${offer.priceBTC} BTC/g <button onclick="acceptDarknetOffer(${i})">Kup</button></p>`;
  });
  document.getElementById("darknetOffers").innerHTML = darknetHTML;
}

function upgradeWarehouse(i) {
  let level = warehouseLevels[i];
  if (cash >= level.cost) {
    cash -= level.cost;
    currentWarehouse = i;
    storageLimit = level.capacity;
    updateUI();
  }
}

function manualBuy() {
  let drug = document.getElementById("buyDrug").value;
  let amount = parseInt(document.getElementById("buyAmount").value);
  let price = parseInt(document.getElementById("buyPrice").value);
  if (cash >= amount * price && storageUsed + amount <= storageLimit) {
    cash -= amount * price;
    inventory[drug] = (inventory[drug] || 0) + amount;
    storageUsed += amount;
    updateUI();
  } else {
    alert("Błąd zakupu");
  }
}

function manualSell() {
  let drug = document.getElementById("sellDrug").value;
  let amount = parseInt(document.getElementById("sellAmount").value);
  let price = parseInt(document.getElementById("sellPrice").value);
  if (inventory[drug] >= amount) {
    inventory[drug] -= amount;
    cash += amount * price;
    storageUsed -= amount;
    updateUI();
  } else {
    alert("Brak towaru");
  }
}

function acceptSupplier(i) {
  let offer = supplierOffers[i];
  if (cash >= offer.amount * offer.price && storageUsed + offer.amount <= storageLimit) {
    cash -= offer.amount * offer.price;
    inventory[offer.drug] += offer.amount;
    storageUsed += offer.amount;
    supplierOffers.splice(i, 1);
    updateUI();
  }
}

function acceptClient(i) {
  let offer = clientOffers[i];
  if (inventory[offer.drug] >= offer.amount) {
    inventory[offer.drug] -= offer.amount;
    cash += offer.amount * offer.price;
    storageUsed -= offer.amount;
    clientOffers.splice(i, 1);
    updateUI();
  }
}

function assignToWorker() {
  const name = document.getElementById("workerName").value;
  const drug = document.getElementById("workerDrug").value;
  const amount = parseInt(document.getElementById("workerAmount").value);
  const price = parseFloat(document.getElementById("workerPrice").value);

  if (!inventory[drug] || inventory[drug] < amount || amount <= 0 || price <= 0) {
    alert("Błąd: za mało towaru lub nieprawidłowe dane.");
    return;
  }

  inventory[drug] -= amount;
  storageUsed -= amount;

  activeDeliveries.push({ name, drug, amount, price });
  updateUI();

  setTimeout(() => {
    cash += amount * price;
    activeDeliveries = activeDeliveries.filter(d => !(d.name === name && d.drug === drug && d.amount === amount && d.price === price));
    updateUI();
    alert(`${name} sprzedał ${amount}g ${drug} za ${amount * price} zł.`);
  }, 10000 + Math.random() * 10000);
}

function travel(city, cost, bonus) {
  if (cash >= cost) {
    cash -= cost;
    workers.forEach(w => {
      w.bonus = (w.bonus || 0) + bonus;
    });
    alert(`Podróż do ${city}. Pracownicy mają teraz +${bonus} zł/g.`);
    updateUI();
  }
}

const btc = {
  deposit() {
    let amt = parseFloat(document.getElementById("btcAmount").value);
    if (!isNaN(amt)) {
      btcBalance += amt;
      updateUI();
    }
  },
  withdraw() {
    let amt = parseFloat(document.getElementById("btcAmount").value);
    if (!isNaN(amt) && btcBalance >= amt) {
      btcBalance -= amt;
      updateUI();
    }
  }
};

function generateSupplierOffer() {
  const drugs = ["kokaina", "marihuana", "mefedron", "amfetamina", "pixy"];
  let drug = drugs[Math.floor(Math.random() * drugs.length)];
  let amount = Math.floor(Math.random() * 10) + 1;
  let price = Math.floor(Math.random() * 200) + 20;
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

function generateDarknetOffer() {
  const drugs = ["kokaina", "marihuana", "mefedron", "amfetamina", "pixy"];
  let drug = drugs[Math.floor(Math.random() * drugs.length)];
  let amount = Math.floor(Math.random() * 10) + 1;
  let priceBTC = Math.floor(Math.random() * 2) + 1;
  darknetOffers.push({ drug, amount, priceBTC });
}

function acceptDarknetOffer(i) {
  let offer = darknetOffers[i];
  if (btcBalance >= offer.amount * offer.priceBTC) {
    btcBalance -= offer.amount * offer.priceBTC;
    inventory[offer.drug] += offer.amount;
    updateUI();
    darknetOffers.splice(i, 1);
  }
}

setInterval(generateSupplierOffer, 15000);
setInterval(generateClientOffer, 10000);
setInterval(generateDarknetOffer, 20000);

updateUI();

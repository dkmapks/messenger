let cash = 1000;
let btc = 0.0;
let wealth = cash;
let inventory = [];
let properties = [];
let cars = [];
let policeEnabled = true;
let godModeEnabled = false;
let btcRate = 50000;

function updateStatus() {
  document.getElementById('cash').innerText = cash.toFixed(2);
  document.getElementById('btc').innerText = btc.toFixed(2);
  wealth = cash + btc * btcRate;
  document.getElementById('wealth').innerText = wealth.toFixed(2);
}

function buyDrugs() {
  if (cash >= 100) {
    cash -= 100;
    inventory.push('narkotyki');
    updateStatus();
  }
}

function sellDrugs() {
  const index = inventory.indexOf('narkotyki');
  if (index !== -1) {
    cash += 150;
    inventory.splice(index, 1);
    updateStatus();
  }
}

function openCryptoWallet() {
  let amount = parseFloat(prompt("Ile chcesz wpłacić do portfela BTC?"));
  if (!isNaN(amount) && amount > 0 && amount <= cash) {
    cash -= amount;
    btc += amount / btcRate;
    updateStatus();
  }
}

function buyProperty() {
  if (cash >= 5000) {
    cash -= 5000;
    properties.push('dom');
    updateStatus();
  }
}

function buyCar() {
  if (cash >= 3000) {
    cash -= 3000;
    cars.push('samochód');
    updateStatus();
  }
}

function viewInventory() {
  let message = "Ekwipunek:\n";
  message += "Przedmioty: " + inventory.join(", ") + "\n";
  message += "Nieruchomości: " + properties.join(", ") + "\n";
  message += "Samochody: " + cars.join(", ");
  alert(message);
}

function saveGame() {
  const saveData = {
    cash, btc, inventory, properties, cars, policeEnabled, godModeEnabled
  };
  localStorage.setItem('druglordSave', JSON.stringify(saveData));
  alert("Gra zapisana!");
}

function loadGame() {
  const data = JSON.parse(localStorage.getItem('druglordSave'));
  if (data) {
    cash = data.cash;
    btc = data.btc;
    inventory = data.inventory;
    properties = data.properties;
    cars = data.cars;
    policeEnabled = data.policeEnabled;
    godModeEnabled = data.godModeEnabled;
    updateStatus();
    alert("Gra wczytana!");
  } else {
    alert("Brak zapisu gry.");
  }
}

function addMoney() {
  cash += 10000;
  updateStatus();
}

function disablePolice() {
  policeEnabled = false;
  alert("Policja wyłączona!");
}

function maxDrugPrices() {
  alert("Ceny narkotyków są teraz maksymalne! (placeholder)");
}

function resetGame() {
  if (confirm("Czy na pewno chcesz zresetować grę?")) {
    cash = 1000;
    btc = 0.0;
    inventory = [];
    properties = [];
    cars = [];
    policeEnabled = true;
    godModeEnabled = false;
    updateStatus();
  }
}

function addBTC() {
  btc += 1;
  updateStatus();
}

function godMode() {
  godModeEnabled = true;
  alert("Tryb nieśmiertelny aktywowany!");
}

function teleport() {
  alert("Teleportacja do miasta! (placeholder)");
}

function unlockProperties() {
  properties.push("willa", "apartament", "rezydencja");
  updateStatus();
  alert("Odblokowano wszystkie nieruchomości!");
}

function debugEvents() {
  alert("Debugowanie wydarzeń (placeholder)");
}

function showGodUI() {
  alert("UI God Mode aktywowane (placeholder)");
}

function checkModCode() {
  const code = document.getElementById("mod-code").value;
  if (code === "narko123") {
    document.getElementById("mod-menu").style.display = "block";
    alert("Mod Menu odblokowane!");
  } else {
    alert("Nieprawidłowy kod.");
  }
}

function togglePhone() {
  const phone = document.getElementById("phone-interface");
  phone.style.display = phone.style.display === "none" ? "block" : "none";
}

function openApp(appName) {
  const screen = document.getElementById("phone-app-screen");
  switch (appName) {
    case 'crypto':
      screen.innerHTML = `
        <h3>CryptoExchange</h3>
        <p>Kurs BTC: $${btcRate}</p>
        <button onclick="openCryptoWallet()">Wpłać do portfela</button>
      `;
      break;

    case 'missions':
      screen.innerHTML = `
        <h3>Zlecenia</h3>
        <ul>
          <li>Przemyć 3x narkotyki – Nagroda: $500 <button onclick="completeMission1()">Wykonaj</button></li>
        </ul>
      `;
      break;

    case 'storage':
      screen.innerHTML = `
        <h3>Magazyn</h3>
        <p>Narkotyki: ${inventory.filter(i => i === 'narkotyki').length}</p>
        <p>Samochody: ${cars.length}</p>
        <p>Nieruchomości: ${properties.length}</p>
      `;
      break;

    case 'lab':
      screen.innerHTML = `
        <h3>Laboratorium</h3>
        <p>Produkcja niedostępna – rozbudowa w przyszłości</p>
      `;
      break;

    case 'contacts':
      screen.innerHTML = `<h3>Kontakty</h3><p>Brak zapisanych kontaktów</p>`;
      break;

    case 'blackmarket':
      screen.innerHTML = `<h3>Czarny Rynek</h3><p>Brak towaru – aktualizacja wkrótce</p>`;
      break;

    case 'bank':
      screen.innerHTML = `<h3>Bank</h3><p>Stan konta: $${cash.toFixed(2)}</p>`;
      break;

    case 'profile':
      screen.innerHTML = `
        <h3>Profil</h3>
        <p>BTC: ${btc.toFixed(2)} | Gotówka: $${cash.toFixed(2)}</p>
        <p>Majątek: $${wealth.toFixed(2)}</p>
      `;
      break;

    default:
      screen.innerHTML = `<p>Aplikacja nieznana.</p>`;
  }
}

function completeMission1() {
  let count = inventory.filter(i => i === 'narkotyki').length;
  if (count >= 3) {
    for (let i = 0; i < 3; i++) {
      inventory.splice(inventory.indexOf('narkotyki'), 1);
    }
    cash += 500;
    updateStatus();
    alert("Zlecenie wykonane! Otrzymujesz $500.");
    openApp('missions');
  } else {
    alert("Potrzebujesz co najmniej 3x narkotyki.");
  }
}

window.onload = () => updateStatus();

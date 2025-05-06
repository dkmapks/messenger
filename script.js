let cash = 1000;
let btc = 0.0;
let wealth = cash;
let inventory = [];
let properties = [];
let cars = [];
let policeEnabled = true;
let godModeEnabled = false;
let btcRate = 250000; // Zaktualizowana wartość BTC (250 000 zł za sztukę)

// Funkcja do aktualizacji statusu
function updateStatus() {
  document.getElementById('cash').innerText = cash.toFixed(2);
  document.getElementById('btc').innerText = btc.toFixed(2);
  wealth = cash + btc * btcRate;
  document.getElementById('wealth').innerText = wealth.toFixed(2);
}

// Funkcja zakupu narkotyków
function buyDrugs() {
  cash -= 100;
  inventory.push('narkotyki');
  updateStatus();
}

// Funkcja sprzedaży narkotyków
function sellDrugs() {
  if (inventory.includes('narkotyki')) {
    cash += 150;
    inventory.splice(inventory.indexOf('narkotyki'), 1);
    updateStatus();
  }
}

// Funkcja do otwierania portfela BTC
function openCryptoWallet() {
  let amount = prompt("Ile chcesz wpłacić do portfela BTC?");
  amount = parseFloat(amount);
  if (amount > 0 && amount <= cash) {
    cash -= amount;
    btc += amount / btcRate;
    updateStatus();
  }
}

// Funkcja zakupu nieruchomości
function buyProperty() {
  if (cash >= 5000) {
    cash -= 5000;
    properties.push('dom');
    updateStatus();
  }
}

// Funkcja zakupu samochodu
function buyCar() {
  if (cash >= 3000) {
    cash -= 3000;
    cars.push('samochód');
    updateStatus();
  }
}

// Funkcja wyświetlania ekwipunku
function viewInventory() {
  alert(inventory.join(', '));
}

// Funkcja zapisu gry
function saveGame() {
  // Tworzymy obiekt z danymi gry
  const gameData = {
    cash: cash,
    btc: btc,
    wealth: wealth,
    inventory: inventory,
    properties: properties,
    cars: cars,
    policeEnabled: policeEnabled,
    godModeEnabled: godModeEnabled,
    btcRate: btcRate
  };
  
  // Zapisujemy obiekt w localStorage jako JSON
  localStorage.setItem('gameData', JSON.stringify(gameData));
  alert("Gra została zapisana!");
}

// Funkcja wczytywania gry
function loadGame() {
  // Sprawdzamy, czy istnieje zapis w localStorage
  const savedGame = localStorage.getItem('gameData');
  
  if (savedGame) {
    // Przekształcamy zapisany JSON na obiekt JavaScript
    const gameData = JSON.parse(savedGame);
    
    // Ustawiamy dane gry
    cash = gameData.cash;
    btc = gameData.btc;
    wealth = gameData.wealth;
    inventory = gameData.inventory;
    properties = gameData.properties;
    cars = gameData.cars;
    policeEnabled = gameData.policeEnabled;
    godModeEnabled = gameData.godModeEnabled;
    btcRate = gameData.btcRate;
    
    // Aktualizujemy wyświetlanie stanu gry
    updateStatus();
    alert("Gra została wczytana!");
  } else {
    alert("Brak zapisanej gry.");
  }
}

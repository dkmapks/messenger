let cash = 0;
let drugs = 0;
let workers = 0;
let bank = 0;
let reputation = 0;

function updateStats() {
  document.getElementById('cash').innerText = cash;
  document.getElementById('drugs').innerText = drugs;
  document.getElementById('workers').innerText = workers;
  document.getElementById('bank').innerText = bank;
  document.getElementById('reputation').innerText = reputation;
}

function buyDrugs() {
  let amount = prompt("Ile gramów narkotyków chcesz kupić?");
  amount = parseInt(amount);
  if (isNaN(amount) || amount <= 0) return;
  let price = amount * 10; // Cena za gram
  if (cash >= price) {
    cash -= price;
    drugs += amount;
    reputation += 1;
    updateStats();
  } else {
    alert("Nie masz wystarczająco gotówki.");
  }
}

function sellDrugs() {
  let amount = prompt("Ile gramów narkotyków chcesz sprzedać?");
  amount = parseInt(amount);
  if (isNaN(amount) || amount <= 0) return;
  if (drugs >= amount) {
    let price = amount * 15; // Cena sprzedaży za gram
    cash += price;
    drugs -= amount;
    reputation += 2;
    updateStats();
  } else {
    alert("Nie masz wystarczająco narkotyków.");
  }
}

function hireWorker() {
  let cost = 500;
  if (cash >= cost) {
    cash -= cost;
    workers += 1;
    reputation += 5;
    updateStats();
  } else {
    alert("Nie masz wystarczająco gotówki.");
  }
}

function openBank() {
  let choice = prompt("Wybierz opcję:\n1. Pożyczka\n2. Lokata");
  if (choice === "1") {
    let amount = prompt("Ile chcesz pożyczyć?");
    amount = parseInt(amount);
    if (isNaN(amount) || amount <= 0) return;
    cash += amount;
    bank -= amount * 5; // Spłata x5
    updateStats();
  } else if (choice === "2") {
    let option = prompt("Wybierz lokatę:\n1. 5% na 2 minuty\n2. 15% na 5 minut\n3. 50% na 15 minut");
    let amount = prompt("Ile chcesz zdeponować?");
    amount = parseInt(amount);
    if (isNaN(amount) || amount <= 0 || cash < amount) return;
    cash -= amount;
    let interest = 0;
    let time = 0;
    if (option === "1") {
      interest = 0.05;
      time = 2;
    } else if (option === "2") {
      interest = 0.15;
      time = 5;
    } else if (option === "3") {
      interest = 0.5;
      time = 15;
    } else {
      alert("Nieprawidłowa opcja.");
      return;
    }
    setTimeout(() => {
      let profit = amount + amount * interest;
      cash += profit;
      updateStats();
      alert(`Lokata zakończona. Otrzymałeś ${profit} zł.`);
    }, time * 60000);
    updateStats();
  } else {
    alert("Nieprawidłowa opcja.");
  }
}

function openModMenu() {
  document.getElementById('modMenu').style.display = 'block';
}

function activateMod() {
  let code = document.getElementById('modCode').value;
  if (code === "7432") {
    let choice = prompt("Wybierz co chcesz dodać:\n1. Narkotyki\n2. Gotówka\n3. Pracownicy");
    let amount = prompt("Ile chcesz dodać?");
    amount = parseInt(amount);
    if (isNaN(amount) || amount <= 0) return;
    if (choice === "1") {
      drugs += amount;
    } else if (choice === "2") {
      cash += amount;
    } else if (choice === "3") {
      workers += amount;
    } else {
      alert("Nieprawidłowa opcja.");
      return;
    }
    updateStats();
    alert("Dodano pomyślnie.");
  } else {
    alert("Nieprawidłowy kod.");
  }
}

updateStats();

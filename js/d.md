'use strict';

// Array for business hours
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

// Variable storing array of location objects + variable for table
var allLocations = [];
var locationTable = document.getElementById('locationSales');
var storeForm = document.getElementById('store-form');

// Constructor function for stores
function CookieStore(location, minCustomers, maxCustomers, avgSale) {
  this.location = location;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgSale = avgSale;
  this.avgCustomersHour = 0;
  this.avgCookiesHour = 0;
  this.customersArray = [];
  this.cookiesArray = [];
  this.totalCookies = 0;
  this.getAvgCustomersHour = function (){
    for (var i = 0; i < hours.length; i++){
      this.avgCustomersHour = Math.ceil(Math.random() * (this.maxCustomers - this.minCustomers + 1) + this.minCustomers);
      this.customersArray.push(this.avgCustomersHour);
    }
  };
  this.getAvgCookiesHour = function(){
    for (var i = 0; i < this.customersArray.length; i++){
      this.avgCookiesHour = Math.ceil(this.customersArray[i] * this.avgSale);
      this.cookiesArray.push(this.avgCookiesHour);
    }
  };
  this.getTotalSold = function(){
    this.totalCookies = this.cookiesArray.reduce(function (a,b) {
      return a + b;
    }, 0);
  };

  this.getAvgCustomersHour();
  this.getAvgCookiesHour();
  this.getTotalSold();
  allLocations.push(this);
}

//Creating new instances of the object
new CookieStore('First and Pike', 23, 65, 6.3);
new CookieStore('SeaTac Airport', 3, 24, 1.2);
new CookieStore('Seattle Center',11, 38, 3.7);
new CookieStore('Capitol Hill', 20, 38, 2.3);
new CookieStore('Alki', 2, 16, 4.6);

//These render the table, its headers, and its content
function renderHeaders() {
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = 'Location';
  trEl.appendChild(thEl);
  for (var i = 0; i < hours.length; i++) {
    thEl = document.createElement('th');
    thEl.textContent = hours[i];
    trEl.appendChild(thEl);
  };
  thEl = document.createElement('th');
  thEl.textContent = 'Total';
  trEl.appendChild(thEl);
  locationTable.appendChild(trEl);
}

CookieStore.prototype.render = function () {
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = this.location;
  trEl.appendChild(tdEl);

  for (var i = 0; i < hours.length; i++){
    tdEl = document.createElement('td');
    tdEl.textContent = this.cookiesArray[i];
    trEl.appendChild(tdEl);
  }
  tdEl = document.createElement('td');
  tdEl.textContent = this.totalCookies;
  trEl.appendChild(tdEl);

  locationTable.appendChild(trEl);
};

function renderAll() {
  locationSales.innerHTML = ' ';
  renderHeaders();
  for (var i in allLocations) {
    allLocations[i].render();
  }
};

//Event Handler
function addNewStore(event) {

  var newStoreName = event.target.name.value;
  var addMinCustomers = parseInt(event.target.minCustomers.value);
  var addMaxCustomers = parseInt(event.target.maxCustomers.value);
  var addAvgSale = parseInt(event.target.avgSale.value);

  event.preventDefault();

  if (!event.target.name.value || !event.target.minCustomers.value || !event.target.maxCustomers.value || !event.target.avgSale.value) {
    return alert('Oops, you forgot something! Please check your entries and try again.');
  }

  if(event.target.minCustomers.value < 0 || event.target.maxCustomers.value < 0 || event.target.avgSale.value < 0) {
    return alert ('How are you putting negative values in here? Quit it, you\re not giving away customers and cookies.');
  }

  if (event.target.minCustomers.value > event.target.maxCustomers.value) {
    return alert('That\'s not how numbers work, nerd.');
  }

  // This code block isn't running -- still working on it. The fields get updated in the allLocations array, I just can't get the table to update correctly.
  for (var i = 0; i < allLocations.length; i++){
    if (newStoreName == allLocations[i].location) {
      allLocations[i].minCustomers = addMinCustomers;
      allLocations[i].maxCustomers = addMaxCustomers;
      allLocations[i].avgSale = addAvgSale;
      renderAll();
      return;
    } else {
      event.target.name.value = null;
      event.target.minCustomers.value = null;
      event.target.maxCustomers.value = null;
      event.target.avgSale.value = null;
      new CookieStore(newStoreName,addMinCustomers,addMaxCustomers,addAvgSale);
      renderAll();
      return;
    }
  }
}
    // new CookieStore(newStoreName,addMinCustomers,addMaxCustomers,addAvgSale);
    // renderAll();

//Event Listener
storeForm.addEventListener('submit',addNewStore);

renderAll();

console.log(allLocations);
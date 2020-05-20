'use strict';
//working hour
var operationHour = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

var allcookieshops = [];
//Get cookie sold to table 
var cookieshopTable = document.getElementById('cookies-sold');
//Get to add shop to form
var cookieShopForm = document.getElementById('add-shop-form');
//funmctionally ==================================
//Constructor for store sales data
function CookieShop(location, minCust, maxCust, cookiesPerSale) {
  this.location = location;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.cookiesPerSale = cookiesPerSale;
  this.cookiesSoldPerHr = [];
  allcookieshops.push(this);

}
//count the customer per hour
CookieShop.prototype.custPerHr = function () {
  return Math.ceil(Math.random() * ((this.maxCust) - (this.minCust)) + this.minCust);
};
//count how much we sells cookies per hour
CookieShop.prototype.cookiesPerHr = function () {
  return Math.round(this.cookiesPerSale * this.custPerHr());
};

CookieShop.prototype.render = function() { 
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = this.location;
  trElement.appendChild(thElement);

  var cookiesSold = 0;
  var totalCookiesSold = 0;

  for (var i = 0; i < operationHour.length; i++) {

    cookiesSold = this.cookiesPerHr();

    var tdElement = document.createElement('td');
    tdElement.textContent = cookiesSold;
    trElement.appendChild(tdElement);

    this.cookiesSoldPerHr.push(cookiesSold);

    totalCookiesSold += cookiesSold;
  }

  tdElement = document.createElement('td');
  tdElement.textContent = totalCookiesSold;
  trElement.appendChild(tdElement);
  cookieshopTable.appendChild(trElement);
};

function makeHeaderRow() { // Table Header Row Function
  var theadElement = document.createElement('thead');
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = '';
  trElement.appendChild(thElement);

  for (var i = 0; i < operationHour.length; i++) {
    thElement = document.createElement('th');
    thElement.textContent = operationHour[i];
    trElement.appendChild(thElement);
  }

  thElement = document.createElement('th');
  thElement.textContent = 'Daily Totals';
  trElement.appendChild(thElement);
  theadElement.appendChild(trElement);

  cookieshopTable.appendChild(theadElement);
}

//hour totals in the taable 
function totalCookiesPerHour() { 
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = 'Hourly Totals';
  trElement.appendChild(thElement);

  var grandTotalCookies = 0;

  for (var i = 0; i < operationHour.length; i++) {
    var totalCookies = 0;
    for( var j = 0; j < allcookieshops.length; j++) {
      totalCookies += allcookieshops[j].cookiesSoldPerHr[i];
      grandTotalCookies += allcookieshops[j].cookiesSoldPerHr[i];
    }
    var tdElement = document.createElement('td');
    tdElement.textContent = totalCookies;
    trElement.appendChild(tdElement);

  }
  tdElement = document.createElement('td');
  tdElement.textContent = grandTotalCookies;
  trElement.appendChild(tdElement);
  cookieshopTable.appendChild(trElement);
}
//Calls function to generate arrays with random number of cookies
new CookieShop('Seattle', 23, 65, 6.3);
new CookieShop('Tokyo', 3, 24, 1.2);
new CookieShop('Dubai', 11, 38, 3.7);
new CookieShop('Paris', 20, 38, 2.3);
new CookieShop('Lima', 2, 16, 4.6);

function renderallcookieshops() {
  for(var i in allcookieshops) {
    allcookieshops[i].render();
  }
}
// code to add new shop to the table 
function addNewCookieShop(event) {
  event.preventDefault();
  console.log(event);
  console.log(event.target);
  console.log(event.target.shopLocation);
  console.log
  // Get target of event 
  (event.target.shopLocation.value);
  var newLoc = event.target.shopLocation.value;

  //The parseInt() function parses a string and returns an integer.
  
  var newMinCust = parseInt(event.target.minCust.value);
  var newMaxCust = parseInt(event.target.maxCust.value);
  var newCookiesPerSale = parseInt(event.target.cookiesPerSale.value);
// call function to creates a new object
  new CookieShop(newLoc, newMinCust, newMaxCust, newCookiesPerSale);

// Access & Update text with TextContent to Table 
  cookieshopTable.innerHTML = '';
  makeHeaderRow();
  renderallcookieshops();
  totalCookiesPerHour();
}
//select style changer
function changeStyle(list) {
  var selecte=list.options[list.selectedIndex].value;
   document.body.style.backgroundColor=selecte;

  }
  //changeStyle();

//Event Listener to Form
cookieShopForm.addEventListener('submit', addNewCookieShop);

makeHeaderRow();
renderallcookieshops();
totalCookiesPerHour();



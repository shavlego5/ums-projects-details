let scroll = document.getElementById("scrollSwitch");
let leftButton = document.getElementById("cards_button");
let rightButton = document.getElementById("tables_button");
let cards = document.getElementsByClassName("card");
let table = document.getElementById("table");
let detailsContainer = document.getElementById("details_container");

/* ქარდების რაოდენობა */
let cardsCount = document.getElementById("cards_container").childElementCount;

let cardsContainer = document.getElementById("cards_container");

function toCards() {
  scroll.style.transform = "translateX(0)";
  leftButton.style.color = "#ECF0F1";
  rightButton.style.color = "black";
  detailsContainer.style.transform = "scale(0)";
  /*ქარდების გამოჩენა*/
  setTimeout(() => {
    cardsContainer.style.transform = "scale(1)";
    for (let i = 0; i < cardsCount; i++) {
      cards[i].style.transform = "scale(1)";
    }
  }, 300);
  table.style.transform = "scale(0)";
}

function toTables() {
  scroll.style.transform = "translateX(90px)";
  leftButton.style.color = "black";
  rightButton.style.color = "#ECF0F1";
  detailsContainer.style.transform = "scale(0)";
  /*ქარდების დამალვა*/
  for (let i = 0; i < cardsCount; i++) {
    cards[i].style.transform = "scale(0)";
  }
  setTimeout(() => {
    table.style.transform = "scale(1)";
  }, 300);
}

/*
  ფერების მინიჭება სტატუსზე მითითებული სტატუსის მიხედვით.
  ლოგიკა ამოწმებს რომელი სტრინგი წერია სტატუს ველში და მის მიხედვით ანიჭებს შესაბამის ფერს.
*/

for (let i = 0; i < cardsCount; i++) {
  let text = document.getElementsByClassName("status")[i].innerHTML;

  if (text === "დასრულებული") {
    document.getElementsByClassName("status")[i].style.color = "#F1C40F";
  }
  if (text === "გაუქმებული") {
    document.getElementsByClassName("status")[i].style.color = "#E74C3C";
  }
  if (text === "შეჩერებული") {
    document.getElementsByClassName("status")[i].style.color = "#2E86C1";
  }
  if (text === "მიმდინარე") {
    document.getElementsByClassName("status")[i].style.color = "#2ECC71";
  }
}

/*ცხრილის შექმნა*/

let tbody = document.querySelector("tbody");

let thCount = tbody.querySelector("tr:first-child").childElementCount;

for (let i = 0; i < cardsCount; i++) {
  let tr = tbody.insertRow();

  for (let i = 0; i < thCount; i++) {
    tr.insertCell();
  }
}

/*ქარდებიდან ცხრილში მონაცემების გადატანა*/
let textData = document.getElementsByClassName("text");
let td = document.getElementsByTagName("td");

for (let j = 0; j < cardsCount * thCount; j++) {
  let text = textData[j].innerHTML;
  td[j].innerHTML = text;
}

function showDetails() {
  table.style.transform = "scale(0)";
  cardsContainer.style.transform = "scale(0)";
  setTimeout(() => {
    detailsContainer.style.transform = "scale(1)";
  }, 300);
}

/*საბოლოო ღირებულების გამოთვლა*/

let startPrice = document.getElementsByClassName("start_price");
let priceChange = document.getElementsByClassName("price_change");
let priceResult = document.getElementsByClassName("price_result");

/*
Number(startPrice[i].innerHTML.replace(/\s+/g, "")) -
გამოსახულება იღებს სტრინგს საწყისი ფასიდან. რადგანაც სტრინგში მოცემული რიცხვები
სფეისებითაა შეყვანილი მისი რიცხვად გადაქცევა შეუძლებელია.
replace(/\s+/g, "") მეთოდი სფეისებს ანაცვლებს "" ცარიელი სტრინგით რის შემდეგაც
Number() მეთოდით ხდება სტრინგის რიცხვებში გადაყვანა და შემდეგ შეჯამება.
*/
let result;
for (let i = 0; i < startPrice.length; i++) {
  result =
    Number(startPrice[i].innerHTML.replace(/\s+/g, "")) +
    Number(priceChange[i].innerHTML.replace(/\s+/g, ""));
  priceResult[i].innerHTML = result;
}

/*
რიცხვის ფორმატის შესანარჩუნებლად საჭიროა რიცხვის სტრინგში გადაყვანა და ყოველი მესამე
ციფრის შემდეგ გამოტოვების ჩასმა რასაც შემდეგი ლოგიკა ასრულებს.
*/

let resultToString = result.toString();
let numberString = "";

while (resultToString.length > 0) {
  /*თუ რიცხვთა რაოდენობა სამის ჯერადია */
  if (resultToString.length % 3 == 0) {
    numberString = numberString + " " + resultToString.substring(0, 3);
    resultToString = resultToString.substring(3);
    /* თუ რიცხვთა რაოდენობა 3 + 2 ის ჯერადია */
  } else if (resultToString.length % 3 == 2) {
    numberString = numberString + " " + resultToString.substring(0, 2);
    resultToString = resultToString.substring(2);
    /* თუ რიცხვთა რაოდენობა 3 + 1 ის ჯერადია */
  } else if (resultToString.length % 3 == 1) {
    numberString = numberString + " " + resultToString.substring(0, 1);
    resultToString = resultToString.substring(1);
  }
}

/*
საბოლოო შედეგის ჩასმა საბოლოო ღირებულების ველში.
*/

for (let i = 0; i < startPrice.length; i++) {
  priceResult[i].innerHTML = numberString;
}

/*
ვადაგადაცილება.
*/

let endDate = document.getElementsByClassName("end_date");
let contractTerm = document.getElementsByClassName("contract_term");
let contractOverdue = document.getElementsByClassName("contract_overdue");
/*
milliseconds რაოდენობა ერთ დღეში
*/
let day = 24 * 60 * 60 * 1000;

for (let i = 0; i < endDate.length; i++) {
  /* სტრინგის date ფორმატში გადაყვანა*/
  let end = new Date(endDate[i].innerHTML);
  /* სტრინგის date ფორმატში გადაყვანა*/
  let term = new Date(contractTerm[i].innerHTML);
  /*
  ვადაგადაცილების გამოთვლა.
  Math.round() ამრგვალებს რიცხვს (Math.round(5.6) -> 6 ; Math.round(5.4) -> 5).
   */
  let overdue = Math.round((end - term) / day);
  /* ვადაგადაცილების ველში ჩასმა */
  contractOverdue[i].innerHTML = overdue + " დღე";

  /* ფერების მინიჭება ვადაგადაცილების მიხედვით */
  if (overdue <= 0) {
    contractOverdue[i].style.color = "green";
  } else {
    contractOverdue[i].style.color = "red";
  }
}

/* 
ფაქტიური სამუშაოების ხანგრძლივობის გამოთვლა 
*/

let actualWorkStart = document.getElementsByClassName(
  "actual_works_start_date"
);
let actualWorkEnd = document.getElementsByClassName("actual_works_end_date");
let actualWorkDuration = document.getElementsByClassName(
  "actual_works_duration"
);

for (let i = 0; i < actualWorkDuration.length; i++) {
  /* სტრინგის date ფორმატში გადაყვანა*/
  let end = new Date(actualWorkEnd[i].innerHTML);
  /* სტრინგის date ფორმატში გადაყვანა*/
  let start = new Date(actualWorkStart[i].innerHTML);
  /*
  ვადაგადაცილების გამოთვლა.
   */
  let duration = Math.round((end - start) / day);

  actualWorkDuration[i].innerHTML = duration + " დღე";
}

/* 
მიღება-ჩაბარების ხანგრძლივობის გამოთვლა 
*/

let acceptanceStart = document.getElementsByClassName("acceptance_start");
let acceptanceEnd = document.getElementsByClassName("acceptance_end");
let acceptanceDuration = document.getElementsByClassName("acceptance_duration");

for (let i = 0; i < acceptanceDuration.length; i++) {
  /* სტრინგის date ფორმატში გადაყვანა*/
  let end = new Date(acceptanceEnd[i].innerHTML);
  /* სტრინგის date ფორმატში გადაყვანა*/
  let start = new Date(acceptanceStart[i].innerHTML);
  /*
  ვადაგადაცილების გამოთვლა.
   */
  let duration = Math.round((end - start) / day);

  acceptanceDuration[i].innerHTML = duration + " დღე";
}

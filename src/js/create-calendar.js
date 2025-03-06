import {date, year, month} from './data.js';



function getFirstWeekDay() {
  const date = new Date(year, month , 1);

  const day = date.getDay();

  if (day == 0) {   
    return 6;    
  }
  else {    
    return day - 1;
  } 
}


function getDaysInMonth(year, month) {
  const daysInMonth = new Date(year, month  + 1, 0).getDate(); 
  return daysInMonth;
  
}


export function createCalendar(year, month, calendarId) { 
  const calendar = document.getElementById(calendarId);  
  
  let title = document.createElement('h2');
  title.textContent = `${getMonthName(month)} - ${year}`
  calendar.appendChild(title);
  
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');
  table.appendChild(thead);
  table.appendChild(tbody);
  calendar.appendChild(table);
  
  let rowThead = thead.insertRow();
  let arrDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  for (let i = 0; i < arrDays.length; i++) {
    let cellThead = rowThead.insertCell();
    cellThead.textContent = arrDays[i];
  }  

  let dayCount = 1;
  let firstDay = getFirstWeekDay(year, month);
  for (let i = 0; i < 6; i++) {
    let row = tbody.insertRow();
    for (let j = 0; j < 7; j ++) {
      let cell = row.insertCell();
      if (i == 0 && j < firstDay) {
        cell.textContent = '';        
      }
      else if (dayCount <= getDaysInMonth(year, month)) {
        cell.textContent = dayCount;
        cell.dataset.day = dayCount;
        cell.dataset.month = month;
        cell.dataset.year = year;
        if (j == 5 || j == 6) {
          cell.classList.add('weekend');
        }
        let today = new Date();
        if (today.getFullYear() == year && today.getMonth() == month && today.getDate() == dayCount) {
          cell.classList.add('current-day')
        }
         dayCount++;
      }
      else {
        cell.textContent = '';
      }
    }
  }
}

function getMonthName(month) {
  let months = ['Январь', 'Февраль', 'Март', 'Апрель','Май', 'Июнь', 'Июль', 'Август','Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']; 
  if (months[month] == undefined) {
    return months[0];
  }
  return months[month];
}


let selectedDate1 = null;
let selectedDate2 = null;

function calculateDifference() {
  if (selectedDate1 && selectedDate2) {
    const diffMSec = Math.abs(selectedDate2.getTime() - selectedDate1.getTime());
    const difInDays = Math.floor(diffMSec / (1000 * 60 * 60 * 24));
    document.getElementById('result').innerText = difInDays;
  }
}
function handleClick(event) {
  
  const cell = event.target;

  if (cell.dataset.day) {
    const clickedYear = parseInt(cell.dataset.year);
    const clickedMonth = parseInt(cell.dataset.month);
    const clickedDay = parseInt(cell.dataset.day)
    const clickedDate = new Date(clickedYear, clickedMonth, clickedDay);

    if (!selectedDate1) {
      selectedDate1 = clickedDate;
      cell.classList.add('checked');
    } else if (!selectedDate2) {
      selectedDate2 = clickedDate;
      cell.classList.add('checked');
    }
    else {
      alert('Вы уже выбрали две даты');
      return;
    }
   
    calculateDifference();
  }
}

document.getElementById('calendar1').addEventListener('click', handleClick);
document.getElementById('calendar2').addEventListener('click', handleClick);


function resetResult() {
  
  selectedDate1 = null;
  selectedDate2 = null;  
  document.getElementById('result').innerText = '';
  const checkedCell = document.querySelectorAll('.checked');
  console.log(checkedCell);
  checkedCell.forEach(cell => cell.classList.remove('checked'));
}

document.getElementById('reset-result').addEventListener('click', resetResult);

let currentMonth = month;
let currentYear = year;

function updateCalendar(currentYear, currentMonth, calendarId) {
  const calendar = document.getElementById(calendarId);
  calendar.innerHTML = '';
  createCalendar(currentYear, currentMonth, calendarId)
}



function getPrevMonth() {
  
  if (currentMonth === 0) {
    currentMonth = 11;
    currentYear--;
  }
  else {
    currentMonth--;
  }
   updateCalendar(currentYear, currentMonth, 'calendar1');
 
}

function getNextMonth() {
  
  if (currentMonth === 11) {
    currentMonth = 0;    
    currentYear++;
  }
  else {
    currentMonth++;
  }
  
  updateCalendar(currentYear, currentMonth + 1, 'calendar2');
}

document.getElementById('prev').addEventListener('click', getPrevMonth);
document.getElementById('next').addEventListener('click', getNextMonth);

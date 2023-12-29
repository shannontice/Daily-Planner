
var currentTime = dayjs();
var plannerTime = dayjs().hour(9);
var timeBlock = document.querySelector('.time-block')
var plannerText = localStorage.getItem('hour-' + plannerBlock);
var plannerBlock = plannerTime.hour();

// Create loop to add HTML for all hours using example code provides and assign classes to those hours based on the currentTime
while (true) {
  var plannerBlock = plannerTime.hour();
  var past = plannerTime.hour() < currentTime.hour();
  var present = plannerTime.hour() === currentTime.hour();
  var future = plannerTime.hour() > currentTime.hour();
  var plannerText = localStorage.getItem('hour-' + plannerBlock);


  // Add HTML to all hours and assign clases to color code 
  timeBlock.insertAdjacentHTML('beforeend', `
  <div id="hour-${plannerBlock}" class="row ${past ? 'past' : present ? 'present' : 'future'}">
  <div class="col-2 col-md-1 hour text-center py-3">${plannerTime.format('hh a')}</div>
  <textarea id="text-box" class="col-8 col-md-10 description" rows="3">${plannerText || ''}</textarea>
  <button class="btn saveBtn col-2 col-md-1" aria-label="save">
    <i class="fas fa-save" aria-hidden="true"></i>
  </button>
</div>
  `)
  // Add one hour until 5 pm then end loop
  plannerTime = plannerTime.add(1, 'hour');
  if (plannerBlock > 16) break;

}

// Add Event listener to save button to identify which timeBlock is being saved
timeBlock.addEventListener('click', function (eventObj) {
  var btnEl = eventObj.target;

  if (btnEl.tagName === 'BUTTON') {
    var btnParent = btnEl.parentNode;
    var hourId = btnParent.id;
    var textarea = btnParent.querySelector('#text-box')
    var textVal = textarea.value;

    // Save to entries to local storage
    localStorage.setItem(hourId, textVal);
  }

});

// Add current date to the top of the daily planner
currentDay = document.querySelector('#current-day')
currentDate = dayjs().format("dddd, MMMM D, YYYY");
currentDay.innerText = currentDate
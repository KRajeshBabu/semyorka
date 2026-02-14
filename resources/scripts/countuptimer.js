var birthDate = new Date(2021, 7, 3, 16, 46, 59);

function getCalendarDiff(start, end) {
  if (end < start) {
    return {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalDays: 0
    };
  }

  var totalMs = end.getTime() - start.getTime();
  var totalDays = Math.floor(totalMs / 86400000);

  var years = end.getFullYear() - start.getFullYear();
  var anchor = new Date(start.getTime());
  anchor.setFullYear(anchor.getFullYear() + years);

  if (anchor > end) {
    years -= 1;
    anchor.setFullYear(anchor.getFullYear() - 1);
  }

  var months = (end.getMonth() - anchor.getMonth() + 12) % 12;
  anchor.setMonth(anchor.getMonth() + months);

  if (anchor > end) {
    months -= 1;
    anchor.setMonth(anchor.getMonth() - 1);
  }

  var remainder = end.getTime() - anchor.getTime();
  var days = Math.floor(remainder / 86400000);
  remainder -= days * 86400000;

  var hours = Math.floor(remainder / 3600000);
  remainder -= hours * 3600000;

  var minutes = Math.floor(remainder / 60000);
  remainder -= minutes * 60000;

  var seconds = Math.floor(remainder / 1000);

  return {
    years: years,
    months: months,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    totalDays: totalDays
  };
}

function renderTodayDate(now) {
  var todayDateNode = document.getElementById('today-date');
  if (!todayDateNode) {
    return;
  }

  var formatted = now.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  todayDateNode.textContent = 'Today: ' + formatted;
}

function updateTimer() {
  var timer = document.getElementById('timer');
  if (!timer) {
    return;
  }

  var now = new Date();
  var age = getCalendarDiff(birthDate, now);

  timer.innerHTML =
    '<div class="metric metric-primary"><strong>' + age.totalDays + '</strong><span>Total days</span></div>' +
    '<div class="metric"><strong>' + age.years + '</strong><span>Years</span></div>' +
    '<div class="metric"><strong>' + age.months + '</strong><span>Months</span></div>' +
    '<div class="metric"><strong>' + age.days + '</strong><span>Days</span></div>' +
    '<div class="metric"><strong>' + age.hours + '</strong><span>Hours</span></div>' +
    '<div class="metric"><strong>' + age.minutes + '</strong><span>Minutes</span></div>' +
    '<div class="metric"><strong>' + age.seconds + '</strong><span>Seconds</span></div>';

  renderTodayDate(now);
}

updateTimer();
setInterval(updateTimer, 1000);

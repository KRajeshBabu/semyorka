const birthDate = new Date(2021, 7, 3, 16, 46, 59);

function getCalendarDiff(start, end) {
  if (end < start) {
    return {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalDays: 0,
    };
  }

  const totalMs = end - start;
  const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));

  let years = end.getFullYear() - start.getFullYear();
  const anchor = new Date(start);
  anchor.setFullYear(anchor.getFullYear() + years);

  if (anchor > end) {
    years -= 1;
    anchor.setFullYear(anchor.getFullYear() - 1);
  }

  let months = (end.getMonth() - anchor.getMonth() + 12) % 12;
  anchor.setMonth(anchor.getMonth() + months);

  if (anchor > end) {
    months -= 1;
    anchor.setMonth(anchor.getMonth() - 1);
  }

  let remainder = end - anchor;
  const days = Math.floor(remainder / (1000 * 60 * 60 * 24));
  remainder -= days * 1000 * 60 * 60 * 24;

  const hours = Math.floor(remainder / (1000 * 60 * 60));
  remainder -= hours * 1000 * 60 * 60;

  const minutes = Math.floor(remainder / (1000 * 60));
  remainder -= minutes * 1000 * 60;

  const seconds = Math.floor(remainder / 1000);

  return { years, months, days, hours, minutes, seconds, totalDays };
}

function updateTimer() {
  const now = new Date();
  const age = getCalendarDiff(birthDate, now);

  document.getElementById('timer').innerHTML = `
    <div class="metric metric-primary">
      <strong>${age.totalDays}</strong>
      <span>Total days</span>
    </div>
    <div class="metric">
      <strong>${age.years}</strong>
      <span>Years</span>
    </div>
    <div class="metric">
      <strong>${age.months}</strong>
      <span>Months</span>
    </div>
    <div class="metric">
      <strong>${age.days}</strong>
      <span>Days</span>
    </div>
    <div class="metric">
      <strong>${age.hours}</strong>
      <span>Hours</span>
    </div>
    <div class="metric">
      <strong>${age.minutes}</strong>
      <span>Minutes</span>
    </div>
    <div class="metric">
      <strong>${age.seconds}</strong>
      <span>Seconds</span>
    </div>
  `;
}

updateTimer();
setInterval(updateTimer, 1000);

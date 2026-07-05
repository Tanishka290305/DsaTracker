export function addDays(dateString, days) {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';

  const numDays = Number(days);
  if (isNaN(numDays)) return '';

  date.setDate(date.getDate() + numDays);

  return date.toISOString().split('T')[0];
}

export function getTodayDateString() {
  return new Date().toISOString().split('T')[0];
}

export function isDateDue(dateString) {
  if (!dateString) return false;

  const dueDate = new Date(dateString);
  if (isNaN(dueDate.getTime())) return false;

  const today = new Date();

  dueDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return dueDate <= today;
}

export function getProblemReminderDate(problem) {
  if (!problem) return '';

  return problem.revisionReminderDate || '';
}
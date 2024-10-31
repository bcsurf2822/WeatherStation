export function getDay(numDays = 5) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date().getDay(); 
  
  return Array.from({ length: numDays }, (_, i) => daysOfWeek[(today + i) % 7]);
}


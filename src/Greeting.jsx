function Greeting({ name }) {
  const now = new Date();
  const currentHour = now.getHours();
  const dayOfWeek = now.toLocaleDateString("sv-SE", { weekday: "long" });
  const currentTime = now.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const moodLine =
    currentHour < 12
      ? 'Time to seize the day with energy and focus.'
      : currentHour < 18
      ? 'You have accomplished a lot today. Keep up the great work!'
      : 'Take time to unwind and recharge for tomorrow. You deserve it!';

  return (
    <header className="greeting-block">
      <p className="greeting-label">Personalized Greeting</p>
      <h1>
        {greeting}, {name}
      </h1>
      <p className="date-time">
        Today is {dayOfWeek} and the time is {currentTime}
      </p>
      <p className="hour-line">Current hour: {currentHour}:00</p>
      <p className="mood-line">{moodLine}</p>
    </header>
  )
}

export default Greeting;

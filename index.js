let weekDays = document.querySelectorAll(".week-days");
let expensesData = document.querySelectorAll(".expense-data");

const currentDate = new Date();
const options = { weekday: "short" };
const currentDayOfWeek = currentDate
  .toLocaleDateString("en-US", options)
  .toLowerCase();

weekDays.forEach((wd) => {
  if (wd.textContent.trim() === currentDayOfWeek) {
    wd.style.backgroundColor = "hsl(186, 34%, 60%)";
  }
});

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    weekDays.forEach((wd) => {
      wd.addEventListener("mouseover", (e) => {
        e.preventDefault();
        wd.style.opacity = "0.7";
        const clickedDay = wd.textContent.trim().toLowerCase();
        const clickedDayData = data.find(
          (d) => d.day.toLowerCase() === clickedDay
        );
        let expenses = wd.querySelector("div");
        expenses.style.display = "block";
        expenses.textContent = "$" + clickedDayData.amount;
      });
      wd.addEventListener("mouseout", (e) => {
        e.preventDefault();
        wd.style.opacity = "1";
        let expenses = wd.querySelector("div");
        expenses.style.display = "none";
      });
    });
  })
  .catch((err) => console.log(`Error: ${err}`));

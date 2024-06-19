const count = () => {
  let date1Value = document.querySelector("#date1").value;
  let date2Value = document.querySelector("#date2").value;
  let txt = document.querySelector(".text");

  if (date1Value === "" || date2Value === "") {
    txt.textContent = "Please enter a date!";
  } else {
    let date1 = new Date(date1Value);
    let date2 = new Date(date2Value);

    let Difference_In_Time = date2.getTime() - date1.getTime();
    let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

    txt.textContent = `${Difference_In_Days} days`;
  }
};

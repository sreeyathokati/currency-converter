const base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");





 for (let select of dropdowns) {
  for(let currCode in countryName) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "from" && currCode == "USD"){
      newOption.selected="selected";
    }
    else if(select.name === "to" && currCode == "INR"){
      newOption.selected="selected"; 
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });

}

let updateflag = (element)=>{
  currCode=element.value;
  countrycode = countryName[currCode];
  let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
}

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  exchangerate();
});

let exchangerate = async (evt) => {
  let amount = document.querySelector("form input");
  let amountval = amount.value;
  if(amountval==="" || amountval <1){
    amountval=1;
    amount.value="1"
  }
  const URL = `${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  let finalamount = amountval * rate;

  msg.innerText= `${amountval}${fromCurr.value} = ${finalamount}${toCurr.value}`;
}

window.addEventListener("load" , ()=>{
  exchangerate();
})


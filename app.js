const dropList = document.querySelectorAll('.drop-list select');
const submitBtn = document.querySelector('form button');
const amount = document.querySelector('form input');
const fromCurrency = document.querySelector('.form select');
const toCurrency = document.querySelector('.to select');

for(let i = 0 ; i < dropList.length ; i++){
    for(currency_code in country_code){

        let optionTag = `<option value="${currency_code}">${currency_code}</option>`
        dropList[i].insertAdjacentHTML('beforeend',optionTag);
    }
    dropList[i].addEventListener('change' , e => {
        loadFlag(e.target);
    })
}

function loadFlag(element){
    for(code in country_code){
        let imgTag = element.parentElement.querySelector('img');
        imgTag.src = `https://flagcdn.com/16x12/${country_code[code]}.png`

    }
}

submitBtn.addEventListener('click' ,(e) => {
    e.preventDefault();
    getExchangeValue();
})

window.addEventListener('load' ,() => {
    getExchangeValue();
})

function getExchangeValue(){
  let amountVal = amount.value;
  if(amountVal == "" || amountVal == "0"){
      amount.value = "1";
      amountVal = 1;
  }

  let url = `https://v6.exchangerate-api.com/v6/3f6675a300550776181e771c/latest/${fromCurrency.value}`;
  fetch(url).then(res => res.json()).then(result => {
      const displayTxt  =document.querySelector('.exchange-rate');
      displayTxt.innerText = 'Getting Exchange Rate...';
      let exchangeRate = result.conversion_rates[toCurrency.value];
      let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
      displayTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`
  })
}

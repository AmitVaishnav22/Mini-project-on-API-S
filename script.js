const BaseUrl="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"
const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");


for(let select of dropdown)
{
    for(code in countryList)
    {
        let newOption=document.createElement("option");
        newOption.innerText=code;
        newOption.value=code;
        if(select.name==="from" && code==="USD"){
            newOption.selected="selected";
        } else if(select.name==="to" && code==="IND"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
          updateFlag(evt.target);
    })
    
}
const updateExchangeRate=async()=>{
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval===""|| amtval<1){
        amtval=1;
        amount.value="1"; 
    }
    const URL=`${BaseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response= await fetch(URL);
    let data=await response.json();
    let rate=data[toCurr.value.toLowerCase()];
    let finalAmount=amtval*rate;
    msg.innerText=`${amtval}${fromCurr.value}=${finalAmount}${toCurr.value}`;

}
const updateFlag=(element)=>{
  let currCode=element.value;
  let countryCode=countryList[currCode];
  let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
  let img=element.parentElement.querySelector("img");
  img.src=newsrc;
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});
window.addEventListener("load",()=>{
    updateExchangeRate();
})

const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
const urlCoinDetails = 'https://api.coingecko.com/api/v3/coins/bitcoin'
const coinTemplate= document.querySelector('[coin-template]')
const coinDisply= document.querySelector('[kids]')
const boddy = document.getElementById('body')
const container = document.querySelector('.container');
const coinContetnt = document.querySelector('.coinContent')
const searchBar = document.getElementById('searchBar')

console.log(coinDisply)
let coinss = [];
searchBar.addEventListener('input', (e)=>
  {
    const value = e.target.value.toLowerCase()
    console.log(coinss)
  
      coinss.forEach(coin=>
      {
        console.log(coin.id)
        console.log(coin.element)
        const available = coin.id.includes(value)
        if(available){
          coin.element.style.display = 'block'
          coin.element.style.display = 'flex'
        }
        else
        {
          coin.element.style.display = 'none'
        }
        
        
      })
    
})
function fetchCoins()
{
    fetch(url)
    .then(res=>res.json())
    .then(coins=>
        {
            console.log(coins)
            renderCoins(coins)
            
        },[]);
};


function renderCoins(coin)
{

  const containerRow  = coinTemplate.content.cloneNode(true).children[0]
  const prank = containerRow.querySelector('.prank')
  prank.textContent = '#'
  const pcoin = containerRow.querySelector('.pcoin')
  pcoin.textContent = 'coin'
  const pprice = containerRow.querySelector('.pprice')
  pprice.textContent = 'price'
  const ptime =containerRow.querySelector('.ptime')
  ptime.textContent = 'time'
  const pvolume = containerRow.querySelector('.pvolume') 
  pvolume.textContent = 'volume'
  const pcap = containerRow.querySelector('.pcap')
  pcap.textContent = 'market cap'
  
  boddy.appendChild(containerRow) // Append
 
  //searchCoin(coin)

     coinss =  coin.map(coin=>{
      const containerRow2 = coinDisply.content.cloneNode(true).children[0]
      const cRow = containerRow2.querySelector('.c-row')
       console.log(cRow)
       cRow.className = `c-row ${coin.id}`
      const marketRank = containerRow2.querySelector('.p0')
      marketRank.textContent = coin.market_cap_rank
      const imgContent = containerRow2.querySelector('#coinIcon')
      imgContent.src = coin.image
      const coinSymbal = containerRow2.querySelector('.p-p')
      coinSymbal.textContent = coin.symbol
      const currentPrize = containerRow2.querySelector('.p1')
      currentPrize.textContent = coin.current_price
      let priceChange = containerRow2.querySelector('.p2')
      priceChange.textContent = coin.price_change_24h
      let totalVolume = containerRow2.querySelector('.p3')
      totalVolume.textContent = coin.total_volume
      let coinMarkCap =  containerRow2.querySelector('.p4')
      coinMarkCap.textContent = coin.market_cap
     const appendKids = document.getElementById('appendKids')
     appendKids.appendChild(containerRow2)
     const searchb = document.getElementById('searchBar')
     searchb.style.display = 'block'
    
     cRow.addEventListener('click',(e)=>
     {
       container.style.display = 'none'
       const displayDet = document.getElementById('show')
       displayDet.style.display = 'block'
       const abs = cRow.className.substring(6)
       
       if(abs == coin.id)
       {
           coinDetails(abs)
       }
       else{console.log('err') }
       
     })
     return {id:coin.id, element:cRow}
    })

}


function coinDetails(coinId)
{
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`)
    .then(res=>res.json())
    .then(data=>
        {
          console.log(data)
            renderDetails(data)

        },[])
}

function renderDetails(data)
{
 const show =  document.getElementById('show')
 show.innerHTML = `
 <div class = "Mr-flex">
 <div class="coin-container">
  
   
     <div class="content">
         <h1>${data.name}</h1>  <span class = "spn ${data.name}"> <button> Add to WatchList </button> </span>
     </div>
     <div class="content">
         <div class="rank">
             <span class="rank-btn">${data.market_cap_rank}</span>
         </div>
         <div class="info">
         <div class='coin-head'>
             <img src="${data.image.small}" alt="">
             <p>${data.id}</p>
             <p>${data.symbol}</p>
             </div> 
         </div>
         <div class="coinprice">
             <h1>Current Price: ${data.market_data.current_price.usd}$</h1>
         </div>
     </div>
     <div class="content"> 
       <table>
         <thead>
             <tr>
                 <th>60 mins</th>
                 <th>24 hrs</th>
                 <th>7days</th>
                 <th>14days</th>
                 <th>1month</th>
                 <th>1yr</th>
             </tr>
         </thead>
         <tbody>
             <tr>
                 <td>${data.market_data.price_change_percentage_1h_in_currency.usd}</td>
                 <td>${data.market_data.price_change_percentage_24h_in_currency.usd}</td>
                 <td>${data.market_data.price_change_percentage_7d_in_currency.usd}</td>
                 <td>${data.market_data.price_change_percentage_14d_in_currency.usd}</td>
                 <td>${data.market_data.price_change_percentage_30d_in_currency.usd}</td>
                 <td>${data.market_data.price_change_percentage_1y_in_currency.usd}</td> 
             </tr>
         </tbody>
       </table>
     </div>
     <div class="content">
         <h3>About</h3>
         <p>${data.description.en}</p>
     </div>
 </div>
 <div class="coin-container2" id ="container-content">
  
  
     <div class="content2">
         <h1>${data.name}</h1>  <span class = "spn ${data.name}"> 
     </div>
     <div class="content2">
         <div class="rank2">
             <span class="rank-btn">${data.market_cap_rank}</span>
         </div>
         <div class="info2">
         <div class='coin-head2'>
             <img src="${data.image.small}" alt="">
             <p>${data.id}</p>
             <p>${data.symbol}</p>
             </div> 
         </div>
         <div class="coinprice2">
             <h1>Current Price: ${data.market_data.current_price.usd}$</h1>
         </div>
     </div>
     <div class="content2"> 
     </div>
     <div class="content2">
         <h3>About</h3>
         <p>Description</p>
     </div>
 </div>
 </div>
`
let tr1 = document.getElementById('show').getElementsByTagName('td')[0].textContent
if(tr1<0)
{
  document.getElementById('show').getElementsByTagName('td')[0].style.color = 'red'
}
else{
  document.getElementById('show').getElementsByTagName('td')[0].style.color = 'green'
}
//Setting color for column data two
let tr2 = document.getElementById('show').getElementsByTagName('td')[1].textContent
if(tr2<0)
{
  document.getElementById('show').getElementsByTagName('td')[1].style.color = 'red'
}
else{
  document.getElementById('show').getElementsByTagName('td')[1].style.color = 'green'
}
//Setting color for column data three
let tr3 = document.getElementById('show').getElementsByTagName('td')[2].textContent
if(tr3<0)
{
  document.getElementById('show').getElementsByTagName('td')[2].style.color = 'red'
}
else{
  document.getElementById('show').getElementsByTagName('td')[2].style.color = 'green'
}
//Setting color for column data four
let tr4 = document.getElementById('show').getElementsByTagName('td')[3].textContent
if(tr4<0)
{
  document.getElementById('show').getElementsByTagName('td')[3].style.color = 'red'
}
else{
  document.getElementById('show').getElementsByTagName('td')[3].style.color = 'green'
}
//Setting color for column data five
let tr5 = document.getElementById('show').getElementsByTagName('td')[4].textContent
if(tr5<0)
{
  document.getElementById('show').getElementsByTagName('td')[4].style.color = 'red'
}
else{
  document.getElementById('show').getElementsByTagName('td')[4].style.color = 'green'
}
//Setting color for column data six
let tr6 = document.getElementById('show').getElementsByTagName('td')[5].textContent
if(tr6<0)
{
  document.getElementById('show').getElementsByTagName('td')[5].style.color = 'red'
}
else{
  document.getElementById('show').getElementsByTagName('td')[5].style.color = 'green'
}

let watchListButton = document.getElementById('show').getElementsByTagName('button')[0]
watchListButton.addEventListener('click', ()=>
{
  alert(`#${data.name.toUpperCase()}# has been added to Watchlist`)
  if(data.name != '')
  {
    const dropDown = document.querySelector('.dropdown-content')
    let li = document.createElement('li')
    li.textContent = data.name
    const btnRm = document.createElement('button')
    btnRm.textContent = 'x'
    dropDown.appendChild(li)
    li.appendChild(btnRm)
    btnRm.addEventListener('click', ()=>{
      li.remove()


    })
    console.log(data.name)
  }
  const addToWatchList1  = document.getElementById('show').childNodes[0].nextSibling
  addToWatchList1.innerHTML += `<div class="coin-container2" id ="container-content">
  
  
  <div class="content2">
      <h1>${data.name}</h1>  <span class = "spn ${data.name}"> 
  </div>
  <div class="content2">
      <div class="rank2">
          <span class="rank-btn">${data.market_cap_rank}</span>
      </div>
      <div class="info2">
      <div class='coin-head2'>
          <img src="${data.image.small}" alt="">
          <p>${data.id}</p>
          <p>${data.symbol}</p>
          </div> 
      </div>
      <div class="coinprice2">
          <h1>Current Price: ${data.market_data.current_price.usd}$</h1>
      </div>
  </div>
  <div class="content2"> 
  </div>
  <div class="content2">
      <h3>About</h3>
      <p>Description</p>
  </div>
</div>` 
  console.log(addToWatchList1)
console.log(addToWatchList1)
})
console.log(watchListButton)

}
function fetching(){
  const formData = document.getElementById('form')
formData.addEventListener('submit', (e)=>
{
    e.preventDefault()
    fetchCoins()

    // User has to input data for login or any click events to occur
    sessionStorage.setItem('status','logged')
    if (sessionStorage.getItem('status') != null)
  { 
    
  //Form desapears after login
  document.querySelector('.contain-form').style.display = 'none'
  
}

else{
    //show validation message
  console.log('You are not logged in');
}   
})
}
document.addEventListener('DOMContentLoaded', ()=>
{
 
    fetching()
    document.querySelector('.homePage').addEventListener('click',()=>{
      container.style.display = 'block'
      document.getElementById('show').style.display = 'none'
      document.getElementById('watch').style.display = 'none'
    })
    
})

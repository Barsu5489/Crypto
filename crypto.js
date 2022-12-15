const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
const urlCoinDetails = 'https://api.coingecko.com/api/v3/coins/bitcoin'
let container = document.createElement('div')
container.className ='container'
let body =  document.getElementById('body')
body.appendChild(container)
let header = document.createElement('div')
header.className = 'header'
let row = `  <p class="p">#</p>
<p class="p">coin</p>
<p class="p">price</p>
<p class="p">time</p>
<p class="p">Volume</p>
<p class="p">Market cap</p>`
header.insertAdjacentHTML('beforeend', row);
container.appendChild(header)
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
    coin.forEach(coin=>{

        
    
   
    //const container = document.querySelector('.container');
  
    const cRow = document.createElement('div')
    cRow.className = `c-row ${coin.id}`
    const rank = document.createElement('p')
    rank.textContent = coin.market_cap_rank
    cRow.appendChild(rank)
    const imgDiv = document.createElement('div')
    imgDiv.className = 'imgDiv'
    const img = document.createElement('img')
    img.src = coin.image
    const symbol = document.createElement('p')
    symbol.textContent = coin.symbol
    imgDiv.appendChild(img)
    imgDiv.appendChild(symbol)
    cRow.append(imgDiv)
    const currntPrice = document.createElement('p')
    currntPrice.textContent = coin.current_price
    const priceChenge = document.createElement('p')
    priceChenge.textContent = coin.price_change_24h
    const volume = document.createElement('p')
    volume.textContent = coin.total_volume
    const marketCap = document.createElement('p')
    marketCap.textContent = coin.market_cap
    cRow.appendChild(currntPrice)
    cRow.appendChild(priceChenge)
    cRow.appendChild(volume)
    cRow.appendChild(marketCap)
    container.appendChild(cRow)

  //const coinRoww = document.querySelector('c-row');
  cRow.addEventListener('click',(e)=>
  {
    
    //const coinId = coin.id
    const abs = e.target.className.substring(6)
    
    if(abs == coin.id)
    {
        console.log(abs)
        coinDetails(abs)
        container.style.display = 'none'
        
    }
    
  })
})
}


function coinDetails(coinId)
{
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`)
    .then(res=>res.json())
    .then(data=>
        {
            console.log(data)
            container.appendChild(header)

        },[])
}
// function renderDetails(data)
// {
//     if
// }
document.addEventListener('DOMContentLoaded', ()=>
{
    fetchCoins();
  //  coinDetails();
    
})
//     container.innerHTML = `<div>
//     <div class="header">
//         <p class="p">#</p>
//         <p class="p">coin</p>
//         <p class="p">price</p>
//         <p class="p">time</p>
//         <p class="p">Volume</p>
//         <p class="p">Market cap</p>
//     </div>
//     <div class="c-row">
//         <p>${coin.market_cap_rank}</p>
   
//         <div class="imgDiv">
//             <img src="${coin.image}" alt="" srcset="">
//             <p>${coin.symbol}</p>
            
//         </div>
//           <p>${coin.current_price}</p>
//             <p>${coin.price_change_24h}</p>
//             <p>${coin.total_volume}</p>
//             <p>${coin.market_cap}</p>
//      </div>
   
// </div>`
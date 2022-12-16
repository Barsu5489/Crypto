const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
const urlCoinDetails = 'https://api.coingecko.com/api/v3/coins/bitcoin'
const searchBar = document.getElementById('searchBar')
const coinTemplate= document.querySelector('[coin-template]')
const coinDisply= document.querySelector('[kids]')
console.log(coinDisply)
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
      //const headRow = containerRow.querySelector('[head-row]')
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
      const boddy = document.getElementById('body')
      boddy.appendChild(containerRow) // Append

      console.log(coin)
    

      coin.forEach(coin=>{
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
      const priceChange = containerRow2.querySelector('.p2')
      priceChange.textContent = coin.price_change_24h
      const totalVolume = containerRow2.querySelector('.p3')
      totalVolume.textContent = coin.total_volume
      const coinMarkCap =  containerRow2.querySelector('.p4')
      coinMarkCap.textContent = coin.market_cap
     const appendKids = document.getElementById('appendKids')
     appendKids.appendChild(containerRow2)
     const container = document.querySelector('.container');
     cRow.addEventListener('click',(e)=>
     {
       container.style.display = 'none'
       const displayDet = document.getElementById('show')
       displayDet.style.display = 'block'
       const abs = cRow.className.substring(6)
       
       if(abs == coin.id)
       {
          // console.log(abs)
           coinDetails(abs)
       }
       else{console.log('err') }
       
     })
 
    })

}


function coinDetails(coinId)
{
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`)
    .then(res=>res.json())
    .then(data=>
        {
            renderDetails(data)

        },[])
}

function renderDetails(data)
{
    const detailContainer =  document.querySelector('.coin-container')
    const content = Object.assign(document.createElement('div'), {
      className: 'content',
    })
    detailContainer.appendChild(content)
    content.append(
      Object.assign(document.createElement('h1'),
      {
        textContent: data.id
      })
    )
    const content2 = Object.assign(document.createElement('div'),
    {
      className: 'content'
    })
    detailContainer.appendChild(content2)
     const rankDiv =  Object.assign(document.createElement('div'),
      {
        className:'rank'
      })
      content2.appendChild(rankDiv)
      const rankData = Object.assign(document.createElement('span'),
        {
          className: 'rank-btn',
          textContent: data.market_cap_rank
        })
        rankDiv.appendChild(rankData)
      const infoDiv = Object.assign(document.createElement('div'),
      {
        className: 'info'
      })
      content2.appendChild(infoDiv)
      //const urlImg = JSON.stringify(data.image)
      const imdContent = Object.assign(document.createElement('img'),
        {
          
          src: 'https://cdn-icons-png.flaticon.com/128/5448/5448163.png'
          // 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png '
        })
       const coinName =  Object.assign(document.createElement('p'),
        {
          textContent: data.name
        })
        const coinSymbool = Object.assign(document.createElement('p'),
        {
          textContent: data.symbol
        })
        infoDiv.appendChild(imdContent)
        infoDiv.appendChild(coinName)
        infoDiv.appendChild(coinSymbool)
    
}
function searchCoin(coin)
{
  searchBar.addEventListener('keyup', (e)=>
  {
    console.log(e.target.value)
    const targetSearch  = e.target.value
    const filtered = coin.filter(coin=>{
      return coin.id.includes(targetSearch) || coin.symbol.includes(targetSearch)
    })
    return filtered
    
  })
}
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
 //   const container = document.createElement('div')
  //   container.className ='container'
  //  const body =  document.getElementById('body')
  //  body.appendChild(container)
  //  const header = document.createElement('div')
  //  header.className = 'header'
  //   const row = `  <p class="p">#</p>
  //   <p class="p">coin</p>
  //   <p class="p">price</p>
  //   <p class="p">time</p>
  //   <p class="p">Volume</p>
  //   <p class="p">Market cap</p>`
  //   header.insertAdjacentHTML('beforeend', row);
  //   container.appendChild(header)
   // searchCoin(coin)
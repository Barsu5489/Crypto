const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
const urlCoinDetails = 'https://api.coingecko.com/api/v3/coins/bitcoin'
const coinTemplate= document.querySelector('[coin-template]')
const coinDisply= document.querySelector('[kids]')
const boddy = document.getElementById('body')
const searchBar = document.getElementById('searchBar')
const coinContetnt = document.querySelector('.coinContent')
console.log(coinDisply)
let coinss = [];
//console.log(coinss)
searchBar.addEventListener('input', (e)=>
  {
    const value = e.target.value.toLowerCase()
    console.log(coinss)
    // ce.target.value)
  //  console.log(coinss)
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
//     coinss.forEach(crypto=>
//       {
//         const available = crypto.name.includes(value)
//         crypto.element.classList.toggle('hide', !available) 
//       })
    
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

boddy.appendChild(containerRow) // Append

function renderCoins(coin)
{
 
 
  //searchCoin(coin)

      console.log(coin)
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
      coinSymbal.textContent = coin.id
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
  const searchb = document.getElementById('searchBar')
  searchb.style.display = 'none'
 const show =  document.getElementById('show')
 show.innerHTML = `
 <div class="coin-container">
  
   
     <div class="content">
         <h1>${data.name}</h1>  <span class = "spn ${data.name}"><button>Add to Watchlist +</button></span>
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
                 <th>1h</th>
                 <th>1day</th>
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
`
let addingBtn = document.getElementById('watch')
addingBtn.addEventListener('click',()=>
{
  console.log('watching')
  if(data.name != '')
  {
    console.log(data.name)
  }
})
}
document.addEventListener('DOMContentLoaded', ()=>
{
    fetchCoins();
    
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
     //  coin.forEach(coin=>{

   
  
  
    // const cRow = document.createElement('div')
    // cRow.className = `c-row ${coin.id}`
    // const rank = document.createElement('p')
    // rank.textContent = coin.market_cap_rank
    // cRow.appendChild(rank)
    // const imgDiv = document.createElement('div')
    // imgDiv.className = 'imgDiv'
    // const img = document.createElement('img')
    // img.src = coin.image
    // const symbol = document.createElement('p')
    // symbol.textContent = coin.symbol
    // imgDiv.appendChild(img)
    // imgDiv.appendChild(symbol)
    // cRow.append(imgDiv)
    // const currntPrice = document.createElement('p')
    // currntPrice.textContent = coin.current_price
    // const priceChenge = document.createElement('p')
    // priceChenge.textContent = coin.price_change_24h
    // const volume = document.createElement('p')
    // volume.textContent = coin.total_volume
    // const marketCap = document.createElement('p')
    // marketCap.textContent = coin.market_cap
    // cRow.appendChild(currntPrice)
    // cRow.appendChild(priceChenge)
    // cRow.appendChild(volume)
    // cRow.appendChild(marketCap)
    // container.appendChild(cRow)

  //const coinRoww = document.querySelector('c-row');
//   cRow.addEventListener('click',(e)=>
//   {
//     container.style.display = 'none'
//     //const coinId = coin.id
//     const abs = cRow.className.substring(6)
    
//     if(abs == coin.id)
//     {
//        // console.log(abs)
//         coinDetails(abs)
//     }
//     else{console.log('err') }
    
//   })
// })
 // const detailContainer =  document.querySelector('.coin-container')
    // const content = Object.assign(document.createElement('div'), {
    //   className: 'content',
    // })
    // detailContainer.appendChild(content)
    // content.append(
    //   Object.assign(document.createElement('h1'),
    //   {
    //     textContent: data.id
    //   })
    // )
    // const content2 = Object.assign(document.createElement('div'),
    // {
    //   className: 'content'
    // })
    // detailContainer.appendChild(content2)
    //  const rankDiv =  Object.assign(document.createElement('div'),
    //   {
    //     className:'rank'
    //   })
    //   content2.appendChild(rankDiv)
    //   const rankData = Object.assign(document.createElement('span'),
    //     {
    //       className: 'rank-btn',
    //       textContent: data.market_cap_rank
    //     })
    //     rankDiv.appendChild(rankData)
    //   const infoDiv = Object.assign(document.createElement('div'),
    //   {
    //     className: 'info'
    //   })
    //   content2.appendChild(infoDiv)
    //   //const urlImg = JSON.stringify(data.image)
    //   const imdContent = Object.assign(document.createElement('img'),
    //     {
          
    //       src: 'https://cdn-icons-png.flaticon.com/128/5448/5448163.png'
    //       // 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png '
    //     })
    //    const coinName =  Object.assign(document.createElement('p'),
    //     {
    //       textContent: data.name
    //     })
    //     const coinSymbool = Object.assign(document.createElement('p'),
    //     {
    //       textContent: data.symbol
    //     })
    //     infoDiv.appendChild(imdContent)
    //     infoDiv.appendChild(coinName)
    //     infoDiv.appendChild(coinSymbool)
    // function searchCoin(coin)
// {
//   searchBar.addEventListener('keyup', (e)=>
//   {
//     console.log(e.target.value.toUpperCase())
//     // console.log(e.target.value)
//     const targetSearch  = e.target.value
//     const filtered = coin.filter(coin=>{
//       return coin.id.includes(targetSearch) || coin.symbol.includes(targetSearch)
//     })
//     console.log(filtered)
    
//   })
// }
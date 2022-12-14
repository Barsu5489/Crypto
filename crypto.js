const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

function fetchCoins()
{
    fetch(url)
    .then(res=>res.json())
    .then(data=>
        {
            console.log(data)
        })
}

document.addEventListener('DOMContentLoaded', ()=>
{
    fetchCoins()
})
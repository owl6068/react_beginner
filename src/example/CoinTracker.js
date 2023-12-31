import { useEffect, useState } from 'react'
import Loading from './component/Loading'

function CoinTracker(){
  const [loading, setLoading] = useState(true)
  const [coins, setCoin] = useState([])
  const [moneys, setMoneys] = useState('')

  const getCoin = async () => {
    const response = await( await fetch(`https://api.coinpaprika.com/v1/tickers`)).json()
    setCoin(response.slice(0, 10))
    setLoading(false)
  }

  const onChange = (e) => {
    setMoneys(() => {
      const value = e.target.value;
      const numValue = value.replaceAll(',', '');
      return numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    })
  }

  useEffect(()=>{
    getCoin()
  },[])
  return (
    <div>
      <h1 className='title__page'>Coin Tracker</h1><br/>
      <form>
        <input value={moneys} type='text' onChange={onChange}/>
      </form>
      { loading ? <Loading/> : 
        <ul>
          {coins.map((data,i) => (<li key={i} className='flex__between'> 
            <p><strong style={{fontSize:26}}>{data.name}</strong> | <span>현재 시세 : {Math.round(data.quotes.USD.ath_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span><br/></p>
            <p>구매가능 : &nbsp;
              <strong>{Math.round(moneys.replaceAll(',', '')/data.quotes.USD.ath_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 개</strong>
            </p>
            </li>))}
        </ul>
      }
    </div>
  )
}

export default CoinTracker
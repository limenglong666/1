import './styles.css'

declare global {
  interface Window {
    ethereum: any
    imToken: any
  }
}

const ethereum = window.ethereum
const imToken = window.imToken

const alert = imToken
  ? function (s: string) {
      imToken.callAPI('native.toastInfo', JSON.stringify(s))
    }
  : window.alert

let account: string
const to = '0xE6F4142dfFA574D1d9f18770BF73814df07931F3'
const address = to.substring(2).toLowerCase()
const lon = '0x0000000000095413afC295d19EDeb1Ad7B71c952'

const alertErr = (err: Error) => {
  alert(err.message)
}

const eth_requestAccounts = () => {
  return ethereum
    .request({ method: 'eth_requestAccounts' })
    .then((accounts: any) => {
      account = accounts[0]
      alert(account)
    })
    .catch(alertErr)
}

const eth_sendTransaction_ETH = () => {
  const params = [
    {
      from: account,
      to,
      gas: '21000',
      value: '10000000000000',
    },
  ]

  ethereum
    .request({
      method: 'eth_sendTransaction',
      params,
    })
    .then((result: any) => {
      alert(result)
    })
    .catch(alertErr)
}

const eth_sendTransaction_ERC20 = () => {
  const params = [
    {
      from: account,
      to: lon,
      data: `0xa9059cbb000000000000000000000000${address}00000000000000000000000000000000000000000000000000044364c5bb0000`,
      gas: '200000',
      gasPrice: '10000000000',
    },
  ]

  ethereum
    .request({
      method: 'eth_sendTransaction',
      params,
    })
    .then((result: any) => {
      alert(result)
    })
    .catch(alertErr)
}

const eth_sendTransaction_ETH_EIP1559 = () => {
  const params = [
    {
      from: account,
      to,
      gas: '0x134a7',
      value: '10000000000',
      maxFeePerGas: '10000000000',
      maxPriorityFeePerGas: '1000000000',
      type: '0x2',
    },
  ]

  ethereum
    .request({
      method: 'eth_sendTransaction',
      params,
    })
    .then((result: any) => {
      alert(result)
    })
    .catch(alertErr)
}

const eth_sendTransaction_ERC20_EIP1559 = () => {
  const params = [
    {
      from: account,
      to: lon,
      data: `0xa9059cbb000000000000000000000000${address}00000000000000000000000000000000000000000000000000044364c5bb0000`,
      gas: '200000',
      maxFeePerGas: '10000000000',
      maxPriorityFeePerGas: '1000000000',
      type: '0x2',
    },
  ]

  ethereum
    .request({
      method: 'eth_sendTransaction',
      params,
    })
    .then((result: any) => {
      alert(result)
    })
    .catch(alertErr)
}

const eth_sendTransaction_Approve_EIP1559 = () => {
  const params = [
    {
      from: account,
      to: lon,
      data: `0x095ea7b3000000000000000000000000${address}00000000000000000000000000000000000000000000000000044364c5bb0000`,
      gas: '200000',
      maxFeePerGas: '50000000000',
      maxPriorityFeePerGas: '1000000000',
      type: '0x2',
    },
  ]

  ethereum
    .request({
      method: 'eth_sendTransaction',
      params,
    })
    .then((result: any) => {
      alert(result)
    })
    .catch(alertErr)
}

const methods = [
  {
    func: eth_requestAccounts,
    name: 'eth_requestAccounts',
    code: eth_requestAccounts.toString(),
  },
  {
    func: eth_sendTransaction_ETH,
    name: 'eth_sendTransaction_ETH',
    code: eth_sendTransaction_ETH.toString(),
  },
  {
    func: eth_sendTransaction_ERC20,
    name: 'eth_sendTransaction_ERC20',
    code: eth_sendTransaction_ERC20.toString(),
  },
  {
    func: eth_sendTransaction_ETH_EIP1559,
    name: 'eth_sendTransaction_ETH_EIP1559',
    code: eth_sendTransaction_ETH_EIP1559.toString(),
  },
  {
    func: eth_sendTransaction_ERC20_EIP1559,
    name: 'eth_sendTransaction_ERC20_EIP1559',
    code: eth_sendTransaction_ERC20_EIP1559.toString(),
  },
  {
    func: eth_sendTransaction_Approve_EIP1559,
    name: 'eth_sendTransaction_Approve_EIP1559',
    code: eth_sendTransaction_Approve_EIP1559.toString(),
  },
]

export default function App() {
  return (
    <div className="App">
      <h3 id="h1">EIP-1559 example in imToken</h3>
      {methods.map(method => {
        return (
          <section key={method.name}>
            <button onClick={method.func}>{method.name}</button>
            <details>
              <summary>show code</summary>
              <pre>{method.code}</pre>
            </details>
          </section>
        )
      })}
    </div>
  )
}

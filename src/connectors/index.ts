import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { PortisConnector } from '@web3-react/portis-connector'

import { FortmaticConnector } from './Fortmatic'
import { NetworkConnector } from './NetworkConnector'

const NETWORK_URL = process.env.REACT_APP_NETWORK_URL
const FORMATIC_KEY = process.env.REACT_APP_FORTMATIC_KEY
const PORTIS_ID = process.env.REACT_APP_PORTIS_ID

export const NETWORK_CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1')

if (typeof NETWORK_URL === 'undefined') {
  throw new Error(`REACT_APP_NETWORK_URL must be a defined environment variable`)
}

export const network = new NetworkConnector({
  urls: { [NETWORK_CHAIN_ID]: NETWORK_URL }
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any))
}

export const injected = new InjectedConnector({
  supportedChainIds: [100]
})

export const walletconnect = new WalletConnectConnector({
  rpc: { 100: 'https://rpc.xdaichain.com/' },
  bridge: 'https://bridge.walletconnect.org/',
  qrcode: true,
  pollingInterval: 15000
})

// mainnet only
export const fortmatic = new FortmaticConnector({
  apiKey: FORMATIC_KEY ?? '',
  chainId: 1
})

export const portis = new PortisConnector({
  dAppId: PORTIS_ID ?? '',
  networks: [100]
})

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: NETWORK_URL,
  appName: 'Levinswap',
  appLogoUrl:
    'https://raw.githubusercontent.com/Levinswap/levinswap-interface/master/public/images/192x192_App_Icon.png'
})

// @flow
import {connect} from 'react-redux'
import Scan from './Scan.ui'

import * as UI_SELECTORS from '../../selectors.js'
import * as CORE_SELECTORS from '../../../Core/selectors.js'

import {toggleScanToWalletListModal} from '../../components/WalletListModal/action'
import {toggleEnableTorch, toggleAddressModal} from './action'
import {loginWithEdge} from '../../../../actions/indexActions'
import type {AbcParsedUri, AbcCurrencyWallet} from 'airbitz-core-types'
import {
  updateParsedURI,
  updateWalletTransfer
} from '../SendConfirmation/action.js'

import {toggleWalletListModal} from '../WalletTransferList/action'

const mapStateToProps = (state: any) => {
  const walletId: string = UI_SELECTORS.getSelectedWalletId(state)
  const abcWallet: AbcCurrencyWallet = CORE_SELECTORS.getWallet(state, walletId)
  const sceneName:? string = state.routes.scene.children
    ? state.routes.scene.children[state.routes.scene.index].name
    : null

  return {
    abcWallet,
    sceneName,
    torchEnabled: state.ui.scenes.scan.torchEnabled,
    walletListModalVisible: state.ui.scenes.walletTransferList.walletListModalVisible,
    scanFromWalletListModalVisibility: state.ui.scenes.scan.scanFromWalletListModalVisibility,
    scanToWalletListModalVisibility: state.ui.scenes.scan.scanToWalletListModalVisibility
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  toggleEnableTorch: () => dispatch(toggleEnableTorch()),
  toggleAddressModal: () => dispatch(toggleAddressModal()),
  toggleWalletListModal: () => dispatch(toggleWalletListModal()),
  updateParsedURI: (parsedURI: AbcParsedUri) => dispatch(updateParsedURI(parsedURI)),
  updateWalletTransfer: (wallet) => dispatch(updateWalletTransfer(wallet)),
  toggleScanToWalletListModal: () => dispatch(toggleScanToWalletListModal()),
  loginWithEdge: (url: string) => dispatch(loginWithEdge(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scan)

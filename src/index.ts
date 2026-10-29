import type { App, Plugin } from 'vue'
import './index.css'
import RButton from './components/RButton.vue'
import RInput from './components/RInput.vue'
import RInputNumber from './components/RInputNumber.vue'
import RCheckbox from './components/RCheckbox.vue'
import RSwitch from './components/RSwitch.vue'
import RRadio from './components/RRadio.vue'
import RRadioGroup from './components/RRadioGroup.vue'
import RDatePicker from './components/RDatePicker.vue'
import RTimePicker from './components/RTimePicker.vue'
import RFileInput from './components/RFileInput.vue'
import RModal from './components/RModal.vue'
import RDialog from './components/RDialog.vue'
import RCard from './components/RCard.vue'
import RSkeletonCard from './components/RSkeletonCard.vue'
import RSkeletonChart from './components/RSkeletonChart.vue'
import RErrorBoundary from './components/RErrorBoundary.vue'
import ROfflineBanner from './components/ROfflineBanner.vue'
import RLucideIcon from './components/RLucideIcon.vue'
import RDrawer from './components/RDrawer.vue'
import RTabBar from './components/RTabBar.vue'
import RHamburgerButton from './components/RHamburgerButton.vue'
import RAlertBell from './components/RAlertBell.vue'
import REmptyState from './components/REmptyState.vue'
import RLoadingState from './components/RLoadingState.vue'
import RErrorState from './components/RErrorState.vue'
import RProgress from './components/RProgress.vue'
import RConfirmDialog from './components/RConfirmDialog.vue'
import RConfirmHost from './components/RConfirmHost.vue'
import RChipGroup from './components/RChipGroup.vue'
import RFormRow from './components/RFormRow.vue'
import RBadge from './components/RBadge.vue'
import RListCard from './components/RListCard.vue'
import RCollapsible from './components/RCollapsible.vue'
import RInfoTip from './components/RInfoTip.vue'
import RSelect from './components/RSelect.vue'
import RSettingsNav from './components/RSettingsNav.vue'
import RMobileHeader from './components/RMobileHeader.vue'
import RCalendar from './components/RCalendar.vue'
import RMobileWheelPicker from './components/RMobileWheelPicker.vue'
import RMobileTimePicker from './components/RMobileTimePicker.vue'
import RMobileDatePicker from './components/RMobileDatePicker.vue'
import RMobileIconPicker from './components/RMobileIconPicker.vue'

// 组件导出
export {
  RButton,
  RInput,
  RInputNumber,
  RCheckbox,
  RSwitch,
  RRadio,
  RRadioGroup,
  RDatePicker,
  RTimePicker,
  RFileInput,
  RModal,
  RDialog,
  RCard,
  RSkeletonCard,
  RSkeletonChart,
  RErrorBoundary,
  ROfflineBanner,
  RLucideIcon,
  RDrawer,
  RTabBar,
  RHamburgerButton,
  RAlertBell,
  REmptyState,
  RLoadingState,
  RErrorState,
  RProgress,
  RConfirmDialog,
  RConfirmHost,
  RChipGroup,
  RFormRow,
  RBadge,
  RListCard,
  RCollapsible,
  RInfoTip,
  RSelect,
  RSettingsNav,
  RMobileHeader,
  RCalendar,
  RMobileWheelPicker,
  RMobileTimePicker,
  RMobileDatePicker,
  RMobileIconPicker,
}

// 设计 token
export type { TabBarItem } from './components/RTabBar.vue'
export type { ChipOption } from './components/RChipGroup.vue'
export type { CalendarValue, CalendarCellInfo } from './components/RCalendar.vue'
export type { ModalDirection } from './components/RModal.vue'
export type { SettingsNavItem } from './components/RSettingsNav.vue'
export type { ListCardBadge, ListCardMeta } from './components/RListCard.vue'

export * from './tokens/index'

// 图标注册表（消费方入口登记一次，避免整包图标进产物）
export { registerIcons, resolveIcon } from './icons'

// composables
export { useOnlineStatus } from './composables/useOnlineStatus'
export { useOverlayLayer } from './composables/useOverlayLayer'
export { useConfirm, useAlert, useConfirmState, resolveConfirm } from './composables/useConfirm'
export type { ConfirmOptions, ConfirmVariant, AlertOptions } from './composables/useConfirm'
export {
  setBackButtonAdapter,
  useBackButtonHandler,
  type BackButtonAdapter,
} from './composables/layerStack'

/** 全局注册插件：app.use(RuiPlugin) */
export const RuiPlugin: Plugin = {
  install(app: App) {
    const components = [
      RButton, RInput, RInputNumber, RCheckbox, RSwitch,
      RRadio, RRadioGroup, RDatePicker, RTimePicker, RFileInput,
      RModal, RDialog, RCard,
      RSkeletonCard, RSkeletonChart, RErrorBoundary, ROfflineBanner, RLucideIcon,
      RDrawer, RTabBar, RHamburgerButton, RAlertBell,
      REmptyState, RLoadingState, RErrorState, RProgress,
      RConfirmDialog, RConfirmHost, RChipGroup,
      RFormRow, RBadge, RListCard, RCollapsible, RInfoTip, RSelect, RSettingsNav,
      RMobileHeader, RCalendar, RMobileWheelPicker,
      RMobileTimePicker, RMobileDatePicker, RMobileIconPicker,
    ]
    for (const comp of components) {
      const name = (comp as { name?: string; __name?: string }).name
        ?? (comp as { name?: string; __name?: string }).__name
      if (name) app.component(name, comp)
    }
  },
}

export default RuiPlugin

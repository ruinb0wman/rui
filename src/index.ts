import type { App, Plugin } from 'vue'
import './index.css'
import BButton from './components/BButton.vue'
import BInput from './components/BInput.vue'
import BInputNumber from './components/BInputNumber.vue'
import BCheckbox from './components/BCheckbox.vue'
import BSwitch from './components/BSwitch.vue'
import BRadio from './components/BRadio.vue'
import BRadioGroup from './components/BRadioGroup.vue'
import BDatePicker from './components/BDatePicker.vue'
import BTimePicker from './components/BTimePicker.vue'
import BFileInput from './components/BFileInput.vue'
import BaseModal from './components/BaseModal.vue'
import BDialog from './components/BDialog.vue'
import BCard from './components/BCard.vue'
import SkeletonCard from './components/SkeletonCard.vue'
import SkeletonChart from './components/SkeletonChart.vue'
import ErrorBoundary from './components/ErrorBoundary.vue'
import OfflineBanner from './components/OfflineBanner.vue'
import LucideIcon from './components/LucideIcon.vue'
import BDrawer from './components/BDrawer.vue'
import BTabBar from './components/BTabBar.vue'
import BHamburgerButton from './components/BHamburgerButton.vue'
import BAlertBell from './components/BAlertBell.vue'
import BEmptyState from './components/BEmptyState.vue'
import BLoadingState from './components/BLoadingState.vue'
import BErrorState from './components/BErrorState.vue'
import BProgress from './components/BProgress.vue'
import BConfirmDialog from './components/BConfirmDialog.vue'
import BConfirmHost from './components/BConfirmHost.vue'
import BChipGroup from './components/BChipGroup.vue'
import MobileHeader from './components/MobileHeader.vue'
import BCalendar from './components/BCalendar.vue'
import MobileWheelPicker from './components/MobileWheelPicker.vue'
import MobileTimePicker from './components/MobileTimePicker.vue'
import MobileDatePicker from './components/MobileDatePicker.vue'
import MobileIconPicker from './components/MobileIconPicker.vue'

// 组件导出
export {
  BButton,
  BInput,
  BInputNumber,
  BCheckbox,
  BSwitch,
  BRadio,
  BRadioGroup,
  BDatePicker,
  BTimePicker,
  BFileInput,
  BaseModal,
  BDialog,
  BCard,
  SkeletonCard,
  SkeletonChart,
  ErrorBoundary,
  OfflineBanner,
  LucideIcon,
  BDrawer,
  BTabBar,
  BHamburgerButton,
  BAlertBell,
  BEmptyState,
  BLoadingState,
  BErrorState,
  BProgress,
  BConfirmDialog,
  BConfirmHost,
  BChipGroup,
  MobileHeader,
  BCalendar,
  MobileWheelPicker,
  MobileTimePicker,
  MobileDatePicker,
  MobileIconPicker,
}

// 设计 token
export type { TabBarItem } from './components/BTabBar.vue'
export type { ChipOption } from './components/BChipGroup.vue'
export type { CalendarValue, CalendarCellInfo } from './components/BCalendar.vue'
/** @deprecated 改名 BCalendar（日历面板不限于移动端），保留别名仅为兼容旧引用 */
export const MobileCalendar = BCalendar
export type { ModalDirection } from './components/BaseModal.vue'

export * from './tokens/index'

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

/** 全局注册插件：app.use(GofundUI) */
export const GofundUI: Plugin = {
  install(app: App) {
    const components = [
      BButton, BInput, BInputNumber, BCheckbox, BSwitch,
      BRadio, BRadioGroup, BDatePicker, BTimePicker, BFileInput,
      BaseModal, BDialog, BCard,
      SkeletonCard, SkeletonChart, ErrorBoundary, OfflineBanner, LucideIcon,
      BDrawer, BTabBar, BHamburgerButton, BAlertBell,
      BEmptyState, BLoadingState, BErrorState, BProgress,
      BConfirmDialog, BConfirmHost, BChipGroup,
      MobileHeader, BCalendar, MobileWheelPicker,
      MobileTimePicker, MobileDatePicker, MobileIconPicker,
    ]
    for (const comp of components) {
      const name = (comp as { name?: string; __name?: string }).name
        ?? (comp as { name?: string; __name?: string }).__name
      if (name) app.component(name, comp)
    }
    app.component('MobileCalendar', BCalendar)
  },
}

export default GofundUI

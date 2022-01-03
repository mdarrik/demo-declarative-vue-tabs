import {TabItem} from './tab-item'
export interface TabContext {
    activeTab?: TabItem;
    registerTab: (tab: TabItem) => void;
    removeTab: (tabValue: string) => void;
    activateTab: (tabValue: string) => void;
    confirmIsActiveTab: (tabValue: string) => void;
    isActiveTab: (tabValue: string) => boolean
  }
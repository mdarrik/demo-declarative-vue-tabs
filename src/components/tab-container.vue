<template>
  <div
    class="tablist-container"
    role="tablist"
    @keydown.enter.prevent="activateTab"
    @keydown.space.prevent="activateTab"
    @keydown.left.prevent="moveToPreviousTab"
    @keydown.up.prevent="moveToPreviousTab"
    @keydown.right.prevent="moveToNextTab"
    @keydown.down.prevent="moveToNextTab"
    @keydown.end.prevent="moveToLastTab"
    @keydown.home.prevent="moveToFirstTab"
  >
    <slot name="tablist"> </slot>
  </div>
  <slot name="tabpanel"></slot>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TabItem } from "../types/tab-item";
import { TabContext } from "../types/tab-context";
export default defineComponent({
  props: {
    defaultTab: { type: String, default: "" },
    useHash: {
      type: Boolean,
      default: true,
    },
  },
  provide() {
    return { tabContext: this.tabContext };
  },
  data() {
    return {
      activeTabValue: undefined as TabItem | undefined,
      tabs: [] as TabItem[],
    };
  },
  computed: {
    activeTab: {
      get(): TabItem | undefined {
        return this.activeTabValue;
      },
      set(tab: TabItem) {
        if (this.tabs.includes(tab)) {
          this.$emit("change", tab.value);
          this.activeTabValue = tab;
        }
      },
    },
    tabContext(): TabContext {
      return {
        activeTab: this.activeTab,
        registerTab: this.registerTab,
        activateTab: this.activateTab,
        confirmIsActiveTab: this.confirmIsActiveTab,
        removeTab: this.removeTab,
        isActiveTab: this.isActiveTab,
      };
    },
    activeTabIndex(): number {
      if (this.activeTab) {
        return this.tabs.indexOf(this.activeTab);
      }
      return -1;
    },
  },
  methods: {
    registerTab(tab: TabItem): void {
      if (
        this.tabs.some(
          (existingTab: TabItem) => existingTab.value === tab.value
        )
      ) {
        return;
      }
      this.tabs.push(tab);
      const hashId = window.location.hash.replace(/#/, "");
      const activeTabEqualsHash = this.activeTab?.associatedPanelId === hashId;
      const thisTabEqualsHash = hashId === tab.associatedPanelId;
      const useDefaultTab = !this.useHash || !hashId || !activeTabEqualsHash;
      //if there's no current active tab
      // or this tab value equals the hash
      // or should we use the default tab
      if (
        !this.activeTab ||
        (this.useHash && hashId && thisTabEqualsHash) ||
        (useDefaultTab && this.defaultTab === tab.value)
      ) {
        this.activeTab = tab;
        if (thisTabEqualsHash) {
          this.$nextTick(() => {
            document.getElementById(hashId)?.focus();
          });
        }
      }
    },
    removeTab(tabValue: string) {
      const indexToRemove = this.tabs.findIndex(
        (tab) => tab.value === tabValue
      );
      if (indexToRemove >= 0) {
        this.tabs.splice(indexToRemove, 1);
      }
    },
    async switchTab(tab: TabItem): Promise<void> {
      this.activeTab = tab;
      await this.$nextTick();
      tab.buttonRef?.focus();
      if (this.useHash) {
        history?.replaceState({}, "", `#${tab.associatedPanelId}`);
      }
    },
    activateTab(tabValue: String) {
      if (tabValue && tabValue === this.activeTab?.value) {
        return;
      }
      const newTab = this.tabs.find((tab) => tab.value === tabValue);
      if (newTab) {
        this.switchTab(newTab);
      }
    },
    moveToPreviousTab() {
      if (this.activeTabIndex > 0) {
        this.switchTab(this.tabs[this.activeTabIndex - 1]);
      } else {
        this.switchTab(this.tabs[this.tabs.length - 1]);
      }
    },
    moveToNextTab() {
      if (
        this.activeTabIndex < this.tabs.length - 1 &&
        this.activeTabIndex >= 0
      ) {
        this.switchTab(this.tabs[this.activeTabIndex + 1]);
      } else {
        this.switchTab(this.tabs[0]);
      }
    },
    moveToFirstTab() {
      this.switchTab(this.tabs[0]);
    },
    moveToLastTab() {
      this.switchTab(this.tabs[this.tabs.length - 1]);
    },
    confirmIsActiveTab(tabValue: String) {
      const tab = this.tabs.find(
        (tabFromList) => tabFromList.value === tabValue
      );
      if (tab && tab !== this.activeTab) {
        tab.buttonRef?.focus();
      }
    },
    isActiveTab(value: string) {
      return this.activeTab?.value === value;
    },
  },
});
</script>

<style scoped></style>

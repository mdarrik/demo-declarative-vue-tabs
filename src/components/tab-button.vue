<template>
  <button
    :id="id"
    ref="tabButtonRef"
    role="tab"
    :aria-selected="isActive ? 'true' : 'false'"
    :tabindex="isActive ? 0 : '-1'"
    :aria-controls="controlsTabPanelId"
    @focus="confirmIsActiveTab"
    @click="activateTab"
    @keydown.enter.prevent="activateTab"
    @keydown.space.prevent="activateTab"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TabContext } from "../types/tab-context";

export default defineComponent({
  props: {
    tabValue: {
      /** the string value this tab button is associated with */
      type: String,
      required: true,
    },
    controlsTabPanelId: {
      /**
       * the associated tabpanel for this button
       * used for aria-controls & hash focus
       */
      type: String,
      required: true,
    },
    id: {
      /**
       * html id of the tab button
       */
      type: String,
      required: true,
    },
  },
  inject: ["tabContext"],
  computed: {
    tabButtonRef(): HTMLButtonElement {
      return this.$refs.tabButtonRef as HTMLButtonElement;
    },
    isActive(): boolean {
      return this.tabContext.isActiveTab(this.tabValue);
    },
  },
  async mounted() {
    await this.$nextTick();
    if (!this.tabContext) {
      console.error(
        "The tab button needs to be inside a tab wrapper to function correctly"
      );
      return;
    }
    console.log("registering tab", this.tabValue);
    this.tabContext.registerTab({
      buttonRef: this.tabButtonRef,
      value: this.tabValue,
      associatedPanelId: this.controlsTabPanelId,
    });
  },
  beforeUnmount() {
    this.tabContext.removeTab(this.tabValue);
  },
  methods: {
    confirmIsActiveTab() {
      this.tabContext.confirmIsActiveTab(this.tabValue);
    },
    activateTab() {
      this.tabContext.activateTab(this.tabValue);
    },
  },
});

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    tabContext: TabContext;
  }
}
</script>

<style scoped></style>

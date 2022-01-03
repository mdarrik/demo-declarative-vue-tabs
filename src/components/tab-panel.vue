<template>
  <div :id="id" role="tabpanel" v-show="shouldShow">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TabContext } from "../types/tab-context";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    tabValue: {
      type: String,
      required: true,
    },
  },
  inject: ["tabContext"],
  data() {
    return {
      isMounted: false,
    };
  },
  computed: {
    isActive(): boolean {
      console.log("running this?", this.tabContext);
      return this.isMounted && this.tabContext.isActiveTab(this.tabValue);
    },
    shouldShow(): boolean {
      return !this.isMounted || this.isActive;
    },
  },
  async mounted() {
    await this.$nextTick();
    await this.$nextTick();
    this.isMounted = true;
  },
});

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    tabContext: TabContext;
  }
}
</script>

<style scoped></style>

<script lang="ts">
import TabContainer from "./components/tab-container.vue";
import TabButton from "./components/tab-button.vue";
import TabPanel from "./components/tab-panel.vue";
import { defineComponent } from "@vue/runtime-core";
export default defineComponent({
  components: {
    TabContainer,
    TabButton,
    TabPanel,
  },
});
</script>

<template>
  <TabContainer :defaultTab="apple">
    <template v-slot:tablist>
      <TabButton
        id="apple-tab-button"
        tabValue="apple"
        controlsTabPanelId="apple"
        >Apple</TabButton
      >
      <TabButton
        id="banana-tab-button"
        tabValue="banana"
        controlsTabPanelId="banana"
      >
        Banana
      </TabButton>
    </template>
    <template v-slot:tabpanel>
      <TabPanel id="apple" tabValue="apple">
        <section>
          <h2>Apples - Dr's Bane?</h2>
        </section>
      </TabPanel>
      <TabPanel id="banana" tabValue="banana">
        <section>
          <h2>Banana's - are they really so appealing?</h2>
        </section>
      </TabPanel>
    </template>
  </TabContainer>
</template>

<style>
@import url("modern-css-reset");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
[aria-selected="true"] {
  border: 2px solid blue;
}
</style>

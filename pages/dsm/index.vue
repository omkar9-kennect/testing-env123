<template>
  <div>
    <v-tabs
      class="pt-1"
      height="38"
      v-model="selectedTab"
      bg-color="#EFF1F0"
      hide-slider
      density="compact">
      <v-tab
        class="tab"
        selected-class="tab-selected"
        v-for="tab in tabList"
        :key="tab.name"
        :value="tab.name">
        <div class="tab-text">
          {{ tab.displayName }}
        </div>
      </v-tab>
    </v-tabs>
    <div>
      <v-window v-model="selectedTab">
        <v-window-item
          v-for="tab in tabList"
          :key="tab.name"
          :value="tab.name">
          <component
            v-if="selectedTab === tab.name"
            :is="tab.action"></component>
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>
<script>
import Datasets from './-components/Datasets';
import Logs from './-components/Logs';
import { mapState } from 'pinia';
export default {
  data() {
    return {
      selectedTab: '',
    };
  },
  components: {
    Datasets,
    Logs,
  },
  computed: {
    ...mapState(useDatasetStore, ['tabList']),
  },
};
</script>

<style scoped>
.tab:first-child {
  margin-left: 2.25rem;
}

.tab {
  color: #000;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  text-transform: capitalize;
}

.tab-selected {
  border-radius: 0.75rem 0.75rem 0rem 0rem !important;
  background: #fff !important;
}

.tab-selected .tab-text {
  color: #000;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem;
  text-transform: capitalize;
}
</style>

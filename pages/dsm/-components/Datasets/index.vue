<template>
  <div
    class="d-flex main-container pt-4 pb-6 px-8"
    >
    <div class="d-flex flex-column justify-space-between ">
      <v-btn
        flat
        class="rounded-lg font-weight-bold text-none px-6"
        color="globalSecondary"
        block
        :prepend-icon="mdiPlus"
       >
        <template v-slot:prepend>
          <v-icon size="x-large"></v-icon>
        </template>
        Create new configuration
      </v-btn>
      <!-- Left container -->
      <div
        class="left-container rounded-md my-5 px-4 pt-4 pb-1 d-flex flex-column justify-space-between"
       >
        <!-- content of left container -->
        <div
          
          class="d-flex">
          <v-text-field
            v-model="searchedText"
            @update:modelValue="localSearch"
            @keyup.enter="onEnterPress"
            density="compact"
            class="mr-2"
            placeholder="Search"
            variant="outlined"
            single-line
            rounded="lg"
            hide-details
            :prepend-inner-icon="mdiMagnify">
          </v-text-field>
          <v-menu
            v-model="filterMenuStatus"
            :close-on-content-click="false"
            offset="6">
            <template v-slot:activator="{ props }">
              <v-btn
                flat
                class="rounded-lg filter-dataset-button"
                v-bind="props"
                size="large"
                density="compact"
                height="36px"
                @click="initDatasetListFilter"
                :icon="filterIcon">
              </v-btn>
            </template>
            <v-card
              min-width="240"
              class="rounded-lg py-2 px-2"
              elevation="2">
              <div
                class="mb-0"
                v-for="item in filterOptions"
                :key="item.id">
                <v-checkbox
                  v-model="item.isApplied"
                  hide-details
                  density="compact"
                  @update:model-value="onChangeInDatasetFilters(item)">
                  <template v-slot:label>
                    <span class="ml-2 text-body-2 text-black">{{
                      item.name
                    }}</span>
                  </template>
                </v-checkbox>
              </div>
              <div class="mt-4 mb-2">
                <v-btn
                  flat
                  class="rounded-lg text-none"
                  color="globalPrimary"
                
                  block
                  >Apply</v-btn
                >
              </div>
            </v-card>
          </v-menu>
        </div>
        <div
          v-if="listOfDatasets && listOfDatasets.length > 0"
          class="mt-4 pr-1 mb-2 dataset-list">
          <v-list class="pt-0">
            <v-list-item
              density="comfortable"
              class="mt-2"
              v-for="item in datasetList"
              :key="item.name"
              :value="item.name"
              :class="{ 'selected-dataset': selectedDataset === item.name }"
              @click="getDatasetConfig(item)"
              rounded="lg">
              <!-- <template v-slot:prepend>
                <v-icon
                  size="x-small"
                  color="success"
                  >{{ mdiCircle }}</v-icon
                >
              </template> -->
              <template v-slot:append>
                <div
                  class="d-flex justify-center align-center custom-dstype-icon">
                  <span class="custom-dstype mt-1">{{
                    item.dsType?.charAt(0).toUpperCase() +
                    item.dsType?.slice(1, 4)
                  }}</span>
                </div>
              </template>

              <v-list-item-title class="text-black">
                <v-tooltip
                  location="top"
                  offset="20"
                  open-delay="100"
                  :disabled="item.displayName?.length < 23"
                  :text="item.displayName">
                  <template v-slot:activator="{ props }">
                    <span v-bind="props"
                      >{{
                        item.displayName?.length > 22
                          ? item.displayName.substring(0, 22) + '..'
                          : item.displayName
                      }}
                    </span>
                  </template>
                </v-tooltip>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
        <div
          v-else
          class="d-flex justify-center align-center no-dataset-added">
          <span class="font-weight-bold text-body-2"> No dataset found</span>
        </div>
        <!-- Pagination section In progress-->
        <!-- <div
          v-if="datasetList && datasetList.length > 0"
          class="d-flex justify-end align-center">
          <span class="ml-2 text-grey-darken-2 text-body-2"
            >{{ (currentDatasetsPage - 1) * 20 + 1 }} -
            {{ Math.min(totalDatasetCount, currentDatasetsPage * 20) }}</span
          >
          <span class="ml-2 text-grey-darken-2 text-body-2">of</span>
          <span class="ml-2 text-grey-darken-2 text-body-2">{{
            totalDatasetCount
          }}</span>
          <v-btn
            variant="text"
            :icon="mdiChevronLeft"
            size="42"
            color="#191C1C"
            :disabled="!isPreviousDatasetsAvailable"
            class="mx-3"
            @click="goToPreviousDatasets"></v-btn>
          <v-btn
            variant="text"
            :icon="mdiChevronRight"
            size="42"
            color="#191C1C"
            :disabled="!isNextDatasetsAvailable"
            @click="goToNextDatasets"></v-btn>
        </div>-->
      </div>
    </div> 
    <!-- right container -->
    <!-- <div class="right-container ml-6">
      <DataVisualizer
        @openConfigurationDialog="openConfigDialogHandler"></DataVisualizer>
    </div>
    <DatasetConfigDialog
      :dialog="configDialog"
      @closeDialog="closeConfigDialog"></DatasetConfigDialog> -->
  </div>
</template>

<script>
// import DatasetConfigDialog from './Config/DatasetConfigDialog.vue';
// import DataVisualizer from './DataVisualizer.vue';
import { mapActions, mapState } from 'pinia';

export default {
  // components: {
  //   DatasetConfigDialog,
  //   DataVisualizer,
  // },
  data() {
    return {
      datasetList:[{
        id:1,displayName:'sanju samson',dsType:'tr'
      },{
        id:1,displayName:'sanju samson',dsType:'tr'
      },{
        id:1,displayName:'sanju samson',dsType:'tr'
      },{
        id:1,displayName:'sanju samson',dsType:'tr'
      },{
        id:1,displayName:'sanju samson',dsType:'tr'
      },{
        id:1,displayName:'sanju samson',dsType:'tr'
      },{
        id:1,displayName:'sanju samson',dsType:'tr'
      },{
        id:1,displayName:'sanju samson',dsType:'tr'
      },{
        id:1,displayName:'sanju samson',dsType:'tr'
      },{
        id:1,displayName:'sanju samson',dsType:'tr'
      },{
        id:1,displayName:'sanju samson',dsType:'tr'
      },{
        id:1,displayName:'sanju samson',dsType:'tr'
      },{
        id:1,displayName:'sanju samson',dsType:'tr'
      },{
        id:1,displayName:'sanju samson',dsType:'tr'
      },{
        id:1,displayName:'sanju samson',dsType:'tr'
      },{
        id:1,displayName:'sanju samson',dsType:'tr'
      },{
        id:1,displayName:'sanju samson',dsType:'tr'
      },{
        id:1,displayName:'sanju samson',dsType:'tr'
      },{
        id:1,displayName:'sanju samson',dsType:'tr'
      },{
        id:1,displayName:'sanju samson',dsType:'tr'
      },{
        id:1,displayName:'sanju samson',dsType:'tr'
      },{
        id:1,displayName:'sanju samson',dsType:'tr'
      },],
      filterOptions: [
        { id: 1, name: 'All', isApplied: false, dsType: 'all' },
        { id: 2, name: 'Master', isApplied: false, dsType: 'mx' },
        { id: 3, name: 'Transactional', isApplied: false, dsType: 'trx' },
        { id: 5, name: 'Operational', isApplied: false, dsType: 'op' },
        { id: 4, name: 'Core', isApplied: false, dsType: 'core' },
        { id: 5, name: 'CIQC', isApplied: false, dsType: 'ciqc' },
        { id: 5, name: 'IQC', isApplied: false, dsType: 'iqc' },
      ],
      configDialog: false,
      filterMenuStatus: false,
      searchedText: '',
      selectedDataset: null,
      currentDatasetsPage: 1,
      isDatasetsFound: false,
      appliedFilterOnDatasetList: [
        { id: 1, name: 'All', isApplied: false, dsType: 'all' },
        { id: 2, name: 'Master', isApplied: false, dsType: 'mx' },
        { id: 3, name: 'Transactional', isApplied: false, dsType: 'trx' },
        { id: 5, name: 'Operational', isApplied: false, dsType: 'op' },
        { id: 4, name: 'Core', isApplied: false, dsType: 'core' },
        { id: 5, name: 'CIQC', isApplied: false, dsType: 'ciqc' },
        { id: 5, name: 'IQC', isApplied: false, dsType: 'iqc' },
      ],
    };
  },
  computed: {
    ...mapState(useDatasetStore, [
      'currentConfigMode',
      'datasetList',
      'selectedDatasetConfig',
      'totalDatasetCount',
      'tempDatasetList',
      'isOrgAdmin',
    ]),
    listOfDatasets() {
      const temporaryDatasetList = [...this.datasetList];
      return this.$searchFunc(this.searchedText, temporaryDatasetList, [
        'displayName',
      ]);
    },
    listOfSelectedDatasetTypes() {
      return this.appliedFilterOnDatasetList.filter((item) => {
        if (item.isApplied) {
          return item;
        }
      });
    },
    filterIcon() {
      return this.listOfSelectedDatasetTypes?.length
        ? this.mdiFilter
        : this.mdiFilterOutline;
    },
    isNextDatasetsAvailable() {
      return this.totalDatasetCount > this.currentDatasetsPage * 20;
    },
    isPreviousDatasetsAvailable() {
      return this.currentDatasetsPage > 1;
    },
  },
  methods: {
    ...mapActions(useDatasetStore, [
      'getConfigOfDataset',
      'getDatasetList',
      'searchDatasetLocally',
      'getConfig',
      'resetConfigSteps',
      'setCurrentConfigData',
      'setCurrentConfigMode',
    ]),
    // ...mapActions(useSnackbarStore, ['openSnackbar', 'closeSnackbar']),
    // ...mapActions(useLoaderStore, ['startLoader', 'stopLoader']),
    async onEnterPress() {
      if (this.searchedText.length > 0) {
        await this.fetchDatasets({});
      }
    },
    async localSearch() {
      if (this.searchedText.length === 0) {
        await this.fetchDatasets({});
        return;
      }
      // this.searchDatasetLocally(this.searchedText);
    },
    openConfigDialogHandler() {
      this.configDialog = true;
      this.setCurrentConfigData({}, 'create');
    },
    onChangeInDatasetFilters(currentOption) {
      if (currentOption.dsType === 'all') {
        this.filterOptions.forEach((item) => {
          if (item.dsType !== 'all') {
            item.isApplied = false;
          }
        });
      } else {
        for (const index in this.filterOptions) {
          if (this.filterOptions[index].dsType === 'all') {
            this.filterOptions[index].isApplied = false;
            break;
          }
        }
      }
    },
    async applyDatasetFilter() {
      this.appliedFilterOnDatasetList = JSON.parse(
        JSON.stringify(this.filterOptions)
      );
      await this.fetchDatasets({});
      this.filterMenuStatus = false;
    },
    initDatasetListFilter() {
      this.filterOptions = JSON.parse(
        JSON.stringify(this.appliedFilterOnDatasetList)
      );
    },
    async fetchDatasets({ offset = 0 }) {
      const dsTypes = this.listOfSelectedDatasetTypes.map(
        (item) => item.dsType
      );
      if (!offset) {
        this.currentDatasetsPage = 1;
      }
      const payload = {
        limit: 20,
        offset,
      };
      if (dsTypes.length && !dsTypes.includes('all')) {
        payload.dsType = dsTypes;
      }
      if (this.searchedText.length) {
        payload.inputText = this.searchedText;
      }
      this.startLoader();
      const response = await this.getDatasetList(payload);
      if (response?.ok) {
        this.openSnackbar({
          text: response?.message || 'Dataset fetched successfully',
          type: 'success',
        });
      } else {
        this.openSnackbar({
          text: response?.message || 'No dataset found',
          type: 'error',
        });
      }
      if (this.datasetList && this.datasetList.length > 0) {
        this.selectedDataset = this.datasetList[0].name;
        await this.getDatasetConfig(this.datasetList[0]);
      }
      this.stopLoader();
      console.log('[Getting Dataset from server]');
    },
    async getDatasetConfig(datasetConfig) {
      if (
        Object.keys(this.selectedDatasetConfig).length &&
        this.selectedDatasetConfig.name === datasetConfig?.name
      ) {
        return;
      }
      // this.startLoader();
      if (this.selectedDataset !== datasetConfig?.name) {
        this.selectedDataset = datasetConfig?.name;
      }
      const response = await this.getConfigOfDataset({
        datasetName: datasetConfig?.name,
      });
      if (response?.ok) {
        this.openSnackbar({
          text: response?.message || 'Dataset config fetched successfully',
          type: 'success',
        });
      } else {
        this.openSnackbar({
          text: response?.message || 'Failed to fetch config',
          type: 'error',
        });
      }
      // this.stopLoader();
    },
    async goToNextDatasets() {
      this.currentDatasetsPage++;
      const offset = 20 * (this.currentDatasetsPage - 1);
      await this.fetchDatasets({ offset });
    },
    async goToPreviousDatasets() {
      this.currentDatasetsPage--;
      const offset = Math.max(0, 20 * (this.currentDatasetsPage - 1));
      await this.fetchDatasets({ offset });
    },
    closeConfigDialog() {
      this.resetConfigSteps();
      this.configDialog = false;
    },
  },
  async mounted() {
    this.startLoader();
    const response = await this.getDatasetList({ limit: 20 });
    this.stopLoader();
    console.log('response => ', response);
    if (response?.ok) {
      this.openSnackbar({
        text: response?.message || 'Dataset list fetched successfully',
        type: 'success',
      });
    } else {
      this.openSnackbar({
        text: response?.message || 'Failed to fetch dataset list',
        type: 'error',
      });
    }
    if (this.datasetList && this.datasetList.length > 0) {
      this.isDatasetsFound = true;
      this.selectedDataset = this.datasetList[0].name;
      await this.getDatasetConfig(this.datasetList[0]);
    }
  },
};
</script>

<style scoped>
.main-container {
  height: calc(100vh - 116px);
  width: calc(100vw - 86px);
  background-color: #f7f7f7;
}
.left-container {
  background-color: white;
  border: 1px solid rgb(241, 238, 238);
  width: 22vw;
  min-width: 280px;
  max-width: 360px;
  height: 92%;
  box-shadow: 0px 2px 12px 0px #0000001a;
}
.right-container {
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: hidden;
}
.no-dataset-added {
  height: 85%;
}
.dataset-list {
  overflow-y: auto !important;
  /* height: 80%; */
  flex-grow: 1;
}

.filter-dataset-button {
  border: 1px solid rgb(182, 181, 181);
}

.selected-dataset {
  background-color: #ebebeb !important;
  border-radius: 8px !important;
  color: black !important;
}
.dataset-list :deep(.v-list-item--active) {
  background-color: transparent !important;
  color: white;
}

.rounded-md {
  border-radius: 14px !important;
}

.custom-dstype-icon {
  width: 30px;
  height: 21px;
  background-color: #dcf6f6;
  clip-path: polygon(50% 0%, 100% 35%, 100% 100%, 0% 100%, 0% 35%);
  transform: rotate(180deg);
}

.custom-dstype {
  transform: rotate(180deg);
  color: #219177 !important;
  font-size: 12px !important;
  font-weight: 400;
}

:deep(.v-field) {
  height: 36px !important;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px !important;
}
::-webkit-scrollbar {
  width: 6px;
}

/* Track */

 
/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #e0e0e0
}
</style>

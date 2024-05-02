import { defineStore, acceptHMRUpdate } from 'pinia';
// import getAuthConfig from '@common-ui/kx-sdk/getAuthConfig';

export const useDatasetStore = defineStore('dataset-store', {
  state: () => {
    return {
      tabList: [
        {
          name: 'datasets',
          displayName: 'Datasets',
          action: 'Datasets',
        },
        {
          name: 'logs',
          displayName: 'Logs',
          action: 'Logs',
        },
      ],
      fieldSet: [],
      configSteps: [
        {
          text: 'Dataset attributes',
          id: 'datasetAttributes',
          mode: 'in-progress', // mode domain ['in-progress', 'pending', 'completed']
          component: 'DatasetAttributes',
          isActive: true,
        },
        {
          text: 'Field declaration',
          id: 'fieldDeclaration',
          mode: 'pending',
          component: 'FieldDeclaration',
          isActive: true,
        },
        {
          text: 'BU mapping',
          id: 'buMapping',
          mode: 'pending',
          component: 'BUMapping',
          isActive: false,
        },
        {
          text: 'Mode configuration',
          id: 'modeConfiguration',
          mode: 'pending',
          component: 'ModeConfiguration',
          isActive: false,
        },
        {
          text: 'Schedular',
          id: 'schedular',
          mode: 'pending',
          component: 'FieldDeclaration',
          isActive: false,
        },
      ],
      currentConfigStep: {
        text: 'Dataset attributes',
        id: 'datasetAttributes',
        mode: 'in-progress',
        component: 'DatasetAttributes',
        isActive: true,
      },
      currentConfigWindow: 'datasetAttributes',
      permanantConfigData: {},
      currentConfigData: {},
      currentConfigMode: 'create',
      // CMX_DSM_BASE_URL:
        // getAuthConfig().sdkConf.CMX_BASE + '/DatasetManagement/v3.0/', //TODO: TO remove this way to get url after enabling middleware inside the project
      // CMX_BU_BASE_URL: getAuthConfig().sdkConf.CMX_BASE + '/BUManagement/v3.0/',
      // CMX_DATA_BASE_URL:
        // getAuthConfig().sdkConf.CMX_BASE + '/DataManagement/v3.0/',
      // EMX_DATA_BASE_URL:
        // getAuthConfig().sdkConf.EMX_BASE + '/DataManagement/v3.0/',
      // EDX_DATA_BASE_URL: getAuthConfig().sdkConf.EDX_BASE + '/ExportData/v3.0/',
      selectedDatasetConfig: {},
      datasetList: [],
      tempDatasetList: [],
      totalDatasetCount: 0,
      businessUnitList: [],
      historyLogList: [],
      configurationLogList: [],
      totalCountOfHistoryLogs: 0,
      totalCountOfProcessLogs: 0,
      selectedHistoryLogDetails: {},
    };
  },
  
  })
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDatasetStore, import.meta.hot));
}

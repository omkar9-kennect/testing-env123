// import { defineStore, acceptHMRUpdate } from 'pinia';
// // import getAuthConfig from '@common-ui/kx-sdk/getAuthConfig';

// export const useDatasetStore = defineStore('dataset-store', {
//   state: () => {
//     return {
//       tabList: [
//         {
//           name: 'datasets',
//           displayName: 'Datasets',
//           action: 'Datasets',
//         },
//         {
//           name: 'logs',
//           displayName: 'Logs',
//           action: 'Logs',
//         },
//       ],
//       fieldSet: [],
//       configSteps: [
//         {
//           text: 'Dataset attributes',
//           id: 'datasetAttributes',
//           mode: 'in-progress', // mode domain ['in-progress', 'pending', 'completed']
//           component: 'DatasetAttributes',
//           isActive: true,
//         },
//         {
//           text: 'Field declaration',
//           id: 'fieldDeclaration',
//           mode: 'pending',
//           component: 'FieldDeclaration',
//           isActive: true,
//         },
//         {
//           text: 'BU mapping',
//           id: 'buMapping',
//           mode: 'pending',
//           component: 'BUMapping',
//           isActive: false,
//         },
//         {
//           text: 'Mode configuration',
//           id: 'modeConfiguration',
//           mode: 'pending',
//           component: 'ModeConfiguration',
//           isActive: false,
//         },
//         {
//           text: 'Schedular',
//           id: 'schedular',
//           mode: 'pending',
//           component: 'FieldDeclaration',
//           isActive: false,
//         },
//       ],
//       currentConfigStep: {
//         text: 'Dataset attributes',
//         id: 'datasetAttributes',
//         mode: 'in-progress',
//         component: 'DatasetAttributes',
//         isActive: true,
//       },
//       currentConfigWindow: 'datasetAttributes',
//       permanantConfigData: {},
//       currentConfigData: {},
//       currentConfigMode: 'create',
//       CMX_DSM_BASE_URL:
//         getAuthConfig().sdkConf.CMX_BASE + '/DatasetManagement/v3.0/', //TODO: TO remove this way to get url after enabling middleware inside the project
//       CMX_BU_BASE_URL: getAuthConfig().sdkConf.CMX_BASE + '/BUManagement/v3.0/',
//       CMX_DATA_BASE_URL:
//         getAuthConfig().sdkConf.CMX_BASE + '/DataManagement/v3.0/',
//       EMX_DATA_BASE_URL:
//         getAuthConfig().sdkConf.EMX_BASE + '/DataManagement/v3.0/',
//       EDX_DATA_BASE_URL: getAuthConfig().sdkConf.EDX_BASE + '/ExportData/v3.0/',
//       selectedDatasetConfig: {},
//       datasetList: [],
//       tempDatasetList: [],
//       totalDatasetCount: 0,
//       businessUnitList: [],
//       historyLogList: [],
//       configurationLogList: [],
//       totalCountOfHistoryLogs: 0,
//       totalCountOfProcessLogs: 0,
//       selectedHistoryLogDetails: {},
//     };
//   },
//   getters: {
//     isOrgAdmin() {
//       const mortal =
//         useAuthStore().mortal ||
//         JSON.parse(sessionStorage.getItem('mortal')) ||
//         {};
//       switch (mortal?.pType) {
//         case 12: {
//           const isAdmin = mortal?.kpids.find((kpid) => {
//             return kpid.pt === 21 && kpid.owner === mortal?.tenant;
//           });
//           return !!isAdmin;
//         }
//         case 21:
//           return true;
//         default:
//           return false;
//       }
//     },
//     isLastStepOfConfig() {
//       const activeObjects = this.configSteps.filter(
//         (step) => step.isActive === true
//       );

//       const lastActiveStep = activeObjects.pop();

//       if (lastActiveStep.id === this.currentConfigStep.id) {
//         return true;
//       }

//       return false;
//     },
//     isKSA() {
//       return useAuthStore().mortal?.hasOwnProperty('isKBA');
//     },
//   },
//   actions: {
//     updateFieldSet(fieldSetConfigArray) {
//       this.fieldSet = fieldSetConfigArray;
//     },
//     getNextConfigStep() {
//       let currentIndex = this.configSteps.findIndex(
//         (step) => step.id === this.currentConfigStep.id
//       );
//       if (currentIndex != -1) {
//         this.configSteps[currentIndex].mode = 'completed';
//       }
//       for (let i = currentIndex + 1; i < this.configSteps.length; i++) {
//         if (this.configSteps[i].isActive) {
//           return this.configSteps[i];
//         }
//       }
//       return null;
//     },
//     goToNextConfigStep() {
//       const nextStep = this.getNextConfigStep();
//       if (nextStep) {
//         if (nextStep.mode === 'pending') {
//           nextStep.mode = 'in-progress';
//         }
//         this.currentConfigStep = nextStep;
//         this.currentConfigWindow = nextStep.id;
//       }
//     },
//     goToPreviousConfigStep() {
//       this.setCurrentConfigMode('edit');
//       const currentIndex = this.configSteps.findIndex(
//         (step) => this.currentConfigStep.id === step.id
//       );
//       const previousObjects = this.configSteps.slice(0, currentIndex);
//       const previousActiveObjectIndex = previousObjects
//         .reverse()
//         .findIndex((item) => item.isActive);

//       const prevStep = previousObjects[previousActiveObjectIndex];
//       this.currentConfigStep = prevStep;
//       this.currentConfigWindow = prevStep.id;
//     },
//     updateConfigWindow(step) {
//       if (step.mode === 'completed' || step.mode === 'in-progress') {
//         this.currentConfigStep = step;
//         this.currentConfigWindow = step.id;
//       }
//     },
//     updateConfigStepAttribute(stepId, attributeName, value) {
//       const step = this.configSteps.filter((ele, idx) => {
//         return ele.id === stepId;
//       })[0];
//       step[attributeName] = value;
//     },
//     markCurrentConfigStepAsComplete() {
//       this.currentConfigStep.mode = 'completed';
//     },
//     updateCurrentConfigMode(ingress) {
//       this.currentConfigData.setup.ingress = ingress;
//     },
//     updateCurrentConfigBuContextField(buContextField) {
//       this.currentConfigData.setup.attributes.buContextField = buContextField;
//     },
//     insertInDatasetList(dataset) {
//       // remove dataset of last place
//       if (this.totalDatasetCount >= 20) {
//         this.datasetList.pop();
//       }
//       // push dataset at first place
//       this.datasetList.unshift(dataset);
//       // update total count
//       this.totalDatasetCount++;
//     },
//     updateInDatasetList(dataset) {
//       const datasetConfigMetaDataIdx = this.datasetList.findIndex(
//         (ele, idx) => {
//           return ele.name === dataset.name;
//         }
//       );

//       if (datasetConfigMetaDataIdx !== -1) {
//         this.datasetList[datasetConfigMetaDataIdx].displayName =
//           dataset.displayName;
//         this.datasetList[datasetConfigMetaDataIdx].dsType = dataset.dsType;
//       }
//     },
//     updateModeConfigStep() {
//       if (
//         (this.currentConfigData.setup.inputModeTypes.CRUD &&
//           !this.currentConfigData.setup.inputModeTypes.upload &&
//           !this.currentConfigData.setup.inputModeTypes.sync) ||
//         this.currentConfigData.setup.inputModeTypes.none
//       ) {
//         this.updateConfigStepAttribute('modeConfiguration', 'isActive', false);
//       } else {
//         this.updateConfigStepAttribute('modeConfiguration', 'isActive', true);
//       }
//     },
//     async registerDataset(payload) {
//       try {
//         const response = await apiCall({
//           url: this.CMX_DSM_BASE_URL + 'datasets/register',
//           method: 'post',
//           data: payload,
//         });
//         if (response.ok) {
//           this.currentConfigData = {
//             displayName: payload.displayName,
//             dsType: payload.nature,
//             name: response.result,
//             setup: {
//               resType: payload.nature,
//               attributes: {
//                 sensitive: payload.isSensitive,
//                 partitionEnable: payload.hasBuContext,
//               },
//               inputModeTypes: this.makeDataChannelValue(payload.channel),
//             },
//           };
//           this.insertInDatasetList({
//             name: response.result,
//             displayName: payload.displayName,
//             dsType: payload.nature,
//           });
//           this.setPermanantConfigData();
//           this.updateConfigStepAttribute(
//             'buMapping',
//             'isActive',
//             payload.hasBuContext
//           );
//           this.updateModeConfigStep();
//           console.log('resp', response);
//         }
//         return response;
//       } catch (error) {
//         console.log('error :>> ', error);
//       }
//     },
//     modifyDatasetConfigState(payload) {
//       this.currentConfigData.displayName = payload.displayName;
//       this.currentConfigData.dsType = payload.nature;
//       this.currentConfigData.setup.resType = payload.nature;
//       if (
//         this.currentConfigData.setup.hasOwnProperty('attributes') &&
//         this.currentConfigData.setup.attributes.hasOwnProperty('sensitive')
//       ) {
//         this.currentConfigData.setup.attributes.sensitive = payload.isSensitive;
//       }
//       if (
//         this.currentConfigData.setup.hasOwnProperty('attributes') &&
//         this.currentConfigData.setup.attributes.hasOwnProperty(
//           'partitionEnable'
//         )
//       ) {
//         if (
//           this.currentConfigData.setup.attributes.partitionEnable &&
//           !payload.hasBuContext
//         ) {
//           this.currentConfigData.setup.attributes.buContextField = '';
//           this.updateConfigStepAttribute('buMapping', 'mode', 'pending');
//         }
//         this.currentConfigData.setup.attributes.partitionEnable =
//           payload.hasBuContext;
//       }
//       this.currentConfigData.setup.inputModeTypes = this.makeDataChannelValue(
//         payload.channel
//       );
//       this.updateConfigStepAttribute(
//         'buMapping',
//         'isActive',
//         payload.hasBuContext
//       );
//       this.updateModeConfigStep();
//       this.updateInDatasetList({
//         displayName: payload.displayName,
//         name: payload.name,
//         dsType: payload.nature,
//       });
//     },
//     async modifyDatasetAttributes(payload) {
//       try {
//         const response = await apiCall({
//           url: this.CMX_DSM_BASE_URL + 'datasets/attribute',
//           method: 'patch',
//           data: payload,
//         });
//         if (response.ok) {
//           console.log(payload);
//           this.modifyDatasetConfigState(payload);
//           this.setPermanantConfigData();
//           console.log('resp', response);
//         }
//         return response;
//       } catch (error) {
//         console.log('error :>> ', error);
//       }
//     },
//     async getConfig() {
//       try {
//         const response = await apiCall({
//           url:
//             this.CMX_DSM_BASE_URL +
//             `datasets/config?datasetName=${this.currentConfigData.name}`,
//           method: 'get',
//         });
//         if (response.ok) {
//           this.currentConfigData = response.result;
//           console.log('resp', response);
//         }
//         return response;
//       } catch (error) {
//         console.log('error :>> ', error);
//       }
//     },
//     clearFieldAttributes(fields, props) {
//       const cleanFields = JSON.parse(JSON.stringify(fields));

//       cleanFields.forEach((field) => {
//         props.forEach((prop) => {
//           delete field[prop];
//         });
//       });

//       return cleanFields;
//     },
//     handleAddAndDeleteSameKey(newFields, props) {
//       if (this.currentConfigMode === 'create') {
//         return;
//       }

//       const oldFields = this.permanantConfigData.setup.hasOwnProperty(
//         'fieldSet'
//       )
//         ? JSON.parse(JSON.stringify(this.permanantConfigData.setup.fieldSet))
//         : [];

//       const prepareFields = [];

//       // get all the newfields in prepareFields and check if field key value
//       // is in oldfield key then copy all extra attributes in new fields

//       newFields.forEach((newField, idx) => {
//         const currentField = { ...newField };

//         const oldField = oldFields.find((oldField, index) => {
//           return oldField.value === currentField.value;
//         });
//         if (oldField) {
//           // consider the case where oldField only had sourceKey and value property
//           const oldFieldKeys = Object.keys(oldField);

//           oldFieldKeys.forEach((oldFieldKey) => {
//             // add all the properties of old field in new field except for newField's own properties

//             if (!props.includes(oldFieldKey)) {
//               currentField[oldFieldKey] = oldField[oldFieldKey];
//             }
//           });
//         }
//         prepareFields.push(currentField);
//       });

//       return prepareFields;
//     },
//     async modifyConfigFields(fields) {
//       try {
//         const prepareField = this.clearFieldAttributes(fields, [
//           'text',
//           'label',
//           'type',
//           'transformOperation',
//           'MandatoryFields',
//           'UniqueFieldValue',
//           'CannotBeNull',
//           'CannotbeNull',
//         ]);
//         const response = await apiCall({
//           url: this.CMX_DSM_BASE_URL + 'datasets/fields',
//           method: 'patch',
//           data: {
//             name: this.currentConfigData.name,
//             fields: prepareField,
//           },
//         });
//         if (response && response.ok) {
//           console.log('resp', response);
//           if (!this.currentConfigData.setup.hasOwnProperty('fieldSet')) {
//             this.currentConfigData.setup.fieldSet = [];
//           }
//           if (this.currentConfigMode === 'edit') {
//             const finalFields = this.handleAddAndDeleteSameKey(fields, [
//               'value',
//               'uploadSourceKey',
//               'channelSourceKey',
//             ]);
//             this.currentConfigData.setup.fieldSet = finalFields;
//           } else {
//             this.currentConfigData.setup.fieldSet = prepareField;
//           }
//         }
//         return response;
//       } catch (error) {
//         console.log('error :>> ', error);
//       }
//     },
//     getFieldSetAfterRemovalOfFields(fieldSetData) {
//       const fieldSet = JSON.parse(JSON.stringify(fieldSetData)) || [];
//       fieldSet.forEach((field) => {
//         if (field.type !== 'Period') {
//           delete field.format;
//         }
//         delete field.transformOperation;
//         delete field.MandatoryFields;
//         delete field.UniqueFieldValue;
//         delete field.CannotBeNull;
//         delete field.CannotbeNull;
//       });
//       return fieldSet;
//     },
//     async modifyConfigFieldSet({ fieldSet, validation = {} }) {
//       try {
//         const fieldSetData = fieldSet || this.currentConfigData.setup?.fieldSet;
//         const response = await apiCall({
//           url: this.CMX_DSM_BASE_URL + 'datasets/field-set',
//           method: 'patch',
//           data: {
//             name: this.currentConfigData.name,
//             fieldSet: this.getFieldSetAfterRemovalOfFields(fieldSetData),
//             validation,
//           },
//         });
//         if (response.ok) {
//           console.log('resp', response);
//           if (fieldSet) {
//             this.currentConfigData.setup.fieldSet = fieldSet;
//           }
//         }
//         return response;
//       } catch (error) {
//         console.log('error :>> ', error);
//       }
//     },
//     async modifyBuContextField(buContextField) {
//       try {
//         const response = await apiCall({
//           url: this.CMX_DSM_BASE_URL + 'datasets/bu-map',
//           method: 'patch',
//           data: {
//             name: this.currentConfigData.name,
//             buContextField: buContextField,
//           },
//         });
//         if (response.ok) {
//           console.log('resp', response);
//           this.updateCurrentConfigBuContextField(buContextField);
//         }
//         return response;
//       } catch (error) {
//         console.log('error :>> ', error);
//       }
//     },
//     async modifyConfigMode(mode) {
//       try {
//         const response = await apiCall({
//           url: this.CMX_DSM_BASE_URL + 'datasets/mode',
//           method: 'patch',
//           data: {
//             name: this.currentConfigData.name,
//             ...mode,
//           },
//         });
//         if (response.ok) {
//           console.log('resp', response);
//           this.updateCurrentConfigMode(mode);
//         }
//         return response;
//       } catch (error) {
//         console.log('error :>> ', error);
//       }
//     },
//     markAllStepsComplete() {
//       this.configSteps.forEach((step, idx) => {
//         if (step.isActive) {
//           step.mode = 'completed';
//         }
//       });
//     },
//     loadConfigSteps(errorObject) {
//       if (errorObject.ok) {
//         this.markAllStepsComplete();
//         return;
//       }
//       if (
//         errorObject.hasOwnProperty('incompleteSteps') &&
//         errorObject.incompleteSteps
//       ) {
//         this.configSteps.forEach((step, idx) => {
//           if (step.isActive && errorObject.incompleteSteps.includes(step.id)) {
//             step.mode = 'pending';
//           } else {
//             step.mode = 'completed';
//           }
//         });
//       }
//     },
//     updateConfigStepForChannel() {
//       this.updateConfigStepAttribute(
//         'buMapping',
//         'isActive',
//         this.currentConfigData.setup.attributes.partitionEnable
//       );
//       this.updateModeConfigStep();
//     },
//     resetConfigSteps() {
//       for (let i = 0; i < this.configSteps.length; i++) {
//         const ele = this.configSteps[i];
//         if (ele.id === 'datasetAttributes') {
//           ele.mode = 'in-progress';
//         } else {
//           ele.mode = 'pending';
//         }

//         if (
//           ele.id === 'buMapping' ||
//           ele.id === 'schedular' ||
//           ele.id === 'modeConfiguration'
//         ) {
//           ele.isActive = false;
//         }
//       }
//       this.currentConfigStep = JSON.parse(JSON.stringify(this.configSteps[0]));
//       this.currentConfigWindow = this.currentConfigStep.id;
//       this.currentConfigData = JSON.parse(
//         JSON.stringify(this.permanantConfigData)
//       );
//     },
//     setPermanantConfigData() {
//       this.permanantConfigData = JSON.parse(
//         JSON.stringify(this.currentConfigData)
//       );
//     },
//     setCurrentConfigMode(mode) {
//       this.currentConfigMode = mode;
//     },
//     setCurrentConfigData(data, mode = 'create') {
//       this.currentConfigData = data;
//       this.permanantConfigData = JSON.parse(
//         JSON.stringify(this.currentConfigData)
//       );
//       this.setCurrentConfigMode(mode);
//     },
//     makeDataChannelValue(channelVal) {
//       const modeTypes = {
//         upload: false,
//         CRUD: false,
//         sync: false,
//         none: false,
//       };

//       switch (channelVal) {
//         case 'upload':
//           modeTypes.upload = true;
//           break;
//         case 'integration':
//           modeTypes.sync = true;
//           break;
//         case 'uploadAndIntegration':
//           modeTypes.upload = true;
//           modeTypes.sync = true;
//           break;
//         case 'manual':
//           modeTypes.CRUD = true;
//           break;
//         case 'none':
//           modeTypes.none = true;
//           break;
//         case 'manualAndUpload':
//           modeTypes.CRUD = true;
//           modeTypes.upload = true;
//           break;
//       }

//       return modeTypes;
//     },

//     searchDatasetLocally(searchText = '') {
//       if (searchText) {
//         this.datasetList = this.tempDatasetList.filter((item) =>
//           item.displayName.toLowerCase().includes(searchText.toLowerCase())
//         );
//       } else {
//         this.datasetList = JSON.parse(JSON.stringify(this.tempDatasetList));
//       }
//     },
//     async getConfigOfDataset({ datasetName, modelName }) {
//       try {
//         const response = await apiCall({
//           url: this.CMX_DSM_BASE_URL + 'datasets/config',
//           method: 'get',
//           params: { datasetName, modelName },
//         });
//         console.log(`[response]: `, response);
//         if (response?.ok) {
//           this.selectedDatasetConfig = response.result;
//         } else {
//           this.selectedDatasetConfig = {};
//         }
//         return response;
//       } catch (error) {
//         console.log('Error => ', error);
//       }
//     },
//     async getDatasetList({ limit, offset, inputText, dsType }) {
//       try {
//         let queryParam = '?';
//         if (limit) {
//           queryParam += 'limit=' + limit;
//         }
//         if (offset) {
//           queryParam += '&offset=' + offset;
//         }
//         if (inputText) {
//           queryParam += '&inputText=' + inputText;
//         }
//         if (dsType) {
//           queryParam += '&dsType=' + dsType.join(',');
//         }
//         const response = await apiCall({
//           url: this.CMX_DSM_BASE_URL + 'datasets' + queryParam,
//           method: 'get',
//         });
//         console.log('response => ', response);
//         if (response?.ok) {
//           this.datasetList = response.result?.data;
//           this.totalDatasetCount = response.result?.totalCount;
//           this.tempDatasetList = response.result?.data;
//         } else {
//           this.datasetList = [];
//           this.tempDatasetList = [];
//           this.totalDatasetCount = 0;
//         }
//         if (this.datasetList.length === 0) {
//           this.selectedDatasetConfig = {};
//         }
//         return response;
//       } catch (error) {
//         console.log('Error => ', error);
//       }
//     },
//     async getDatasetData(payload) {
//       try {
//         let params = {};

//         if (payload?.limit) {
//           params.limit = payload.limit;
//         }

//         if (payload?.offset) {
//           params.offset = payload.offset;
//         }

//         if (payload?.name) {
//           params.datasetName = payload.name;
//         }

//         if (
//           payload.dataToSearch &&
//           Object.keys(payload.dataToSearch || {}).length
//         ) {
//           params.dataToSearch = payload.dataToSearch;
//         }

//         const response = await apiCall({
//           url: this.CMX_DATA_BASE_URL + 'data',
//           method: 'get',
//           params: { ...params, ...payload },
//         });
//         // console.log('response => data', response);
//         return response;
//       } catch (error) {
//         console.log('Error => ', error);
//         return {
//           ok: false,
//           message: error.message,
//         };
//       }
//     },
//     async getRow(params) {
//       try {
//         const response = await apiCall({
//           url: this.CMX_DATA_BASE_URL + 'data/row',
//           method: 'get',
//           params,
//         });

//         return response;
//       } catch (error) {
//         console.log('error in getrow => ', error);
//         return {
//           ok: false,
//           message: error.message,
//         };
//       }
//     },
//     async getAllBusinessUnits() {
//       try {
//         const response = await apiCall({
//           url: this.CMX_BU_BASE_URL + 'business-units',
//           method: 'get',
//         });
//         if (response?.ok) {
//           this.businessUnitList = response.result;
//         } else {
//           this.businessUnitList = [];
//         }
//         return response;
//       } catch (error) {
//         console.log('Error => ', error);
//       }
//     },
//     async saveAndLoadFiles({ formData }) {
//       try {
//         const response = await apiCall({
//           url: this.EMX_DATA_BASE_URL + 'data/task',
//           method: 'post',
//           data: formData,
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });

//         return response;
//       } catch (error) {
//         console.error('Error => ', error);
//         return {
//           ok: false,
//           message: error.message,
//         };
//       }
//     },
//     async saveDataToDataset(payload) {
//       try {
//         const response = await apiCall({
//           url: this.CMX_DATA_BASE_URL + 'data',
//           method: 'post',
//           data: {
//             datasetName: payload.datasetName,
//             data: payload.data,
//           },
//         });

//         return response;
//       } catch (error) {
//         return {
//           ok: false,
//           message: error.message,
//         };
//       }
//     },
//     async updateDataToDataset(payload) {
//       try {
//         const response = await apiCall({
//           url: this.CMX_DATA_BASE_URL + 'data',
//           method: 'put',
//           data: {
//             datasetName: payload.datasetName,
//             data: payload.data,
//             id: payload.id,
//           },
//         });

//         return response;
//       } catch (error) {
//         return {
//           ok: false,
//           message: error.message,
//         };
//       }
//     },
//     async deleteRowFromDataset(payload) {
//       try {
//         const response = await apiCall({
//           url: this.CMX_DATA_BASE_URL + 'data',
//           method: 'delete',
//           data: {
//             datasetName: payload.datasetName,
//             id: payload.id,
//           },
//         });

//         return response;
//       } catch (error) {
//         return {
//           ok: false,
//           message: error.message,
//         };
//       }
//     },
//     async getHistoryLogs({
//       searchText,
//       startDate,
//       endDate,
//       pageNo,
//       itemsPerPage,
//     }) {
//       try {
//         const params = {};
//         if (searchText) {
//           params.searchText = searchText;
//         }
//         if (startDate) {
//           params.startDate = startDate;
//         }
//         if (endDate) {
//           params.endDate = endDate;
//         }
//         if (pageNo) {
//           params.pageNo = pageNo;
//         }
//         if (itemsPerPage) {
//           params.itemPerPage = itemsPerPage;
//         }
//         const response = await apiCall({
//           url: this.CMX_DATA_BASE_URL + 'history-logs',
//           method: 'get',
//           params,
//         });
//         if (response?.ok) {
//           this.historyLogList = response?.list || [];
//           this.totalCountOfHistoryLogs = response?.total || 0;
//         } else {
//           this.historyLogList = [];
//           this.totalCountOfHistoryLogs = 0;
//         }
//         return response;
//       } catch (error) {
//         console.log('Error => ', error);
//       }
//     },

//     async getHistoryLogDetails({ sessionId }) {
//       try {
//         const response = await apiCall({
//           url:
//             this.CMX_DATA_BASE_URL +
//             `history-logs/detail?sessionId=${sessionId}`,
//           method: 'get',
//         });
//         if (response?.ok) {
//           this.selectedHistoryLogDetails = response.data || {};
//         } else {
//           this.selectedHistoryLogDetails = {};
//         }
//         return response;
//       } catch (error) {
//         console.log('Error => ', error);
//       }
//     },
//     async getConfigurationLogs({ datasetName }) {
//       try {
//         const response = await apiCall({
//           url:
//             this.CMX_DSM_BASE_URL + `datasets/logs?datasetName=${datasetName}`,
//           method: 'get',
//         });
//         if (response?.ok) {
//           this.configurationLogList = response.result || [];
//         } else {
//           this.configurationLogList = [];
//         }
//         return response;
//       } catch (error) {
//         console.log('Error => ', error);
//       }
//     },
//     async downloadLogs({ sessionId, datasetName }) {
//       try {
//         const response = await apiCall({
//           url:
//             this.EMX_DATA_BASE_URL +
//             `data/download-file?sessionId=${sessionId}`,
//           method: 'get',
//           responseType: 'blob',
//         });

//         if (response) {
//           const arrayBuffer = await response.arrayBuffer();
//           const blob = new Blob([arrayBuffer], { type: 'application/zip' });
//           const url = window.URL.createObjectURL(blob);
//           const a = document.createElement('a');
//           a.href = url;
//           a.download = `${datasetName}.zip`;
//           document.body.appendChild(a);
//           a.click();
//           window.URL.revokeObjectURL(url);
//         }
//         return response;
//       } catch (error) {
//         console.log('Error => ', error);
//       }
//     },

//     async downloadErrorFile({ errorQuery, fileName, errorCollection, type }) {
//       try {
//         const response = await apiCall({
//           url: this.EDX_DATA_BASE_URL + 'error-file-download',
//           method: 'get',
//           params: {
//             errorQuery,
//             fileName,
//             errorCollection,
//             type,
//           },
//           responseType: 'blob',
//         });

//         console.log('response downloadErrorFile => ', response);
//         if (response) {
//           const arrayBuffer = await response.arrayBuffer();
//           const blob = new Blob([arrayBuffer], { type: 'application/zip' });
//           const url = window.URL.createObjectURL(blob);
//           const a = document.createElement('a');
//           a.href = url;
//           a.download = `${fileName}.csv`;
//           document.body.appendChild(a);
//           a.click();
//           window.URL.revokeObjectURL(url);
//         }
//         return response;
//       } catch (error) {
//         console.log('Error => ', error);
//       }
//     },
//   },
// });

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useDatasetStore, import.meta.hot));
// }

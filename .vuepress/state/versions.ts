import { ref } from 'vue';

export const versions = [
  { text: '6.0', prefix: '/v6' },
  { text: '7.0', prefix: '' }
];

// Global reactive state for the current version
export const currentVersion = ref(versions.find(v => v.prefix === '') || versions[0]);

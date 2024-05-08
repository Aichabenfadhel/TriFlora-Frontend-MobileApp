import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'TriFlora',
  webDir: 'www',
  server: {
    androidScheme: 'http',
    cleartext:true
  },
  android:{
    allowMixedContent:true
  }
};

export default config;

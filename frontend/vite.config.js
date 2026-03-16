import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,                // allow connections from network (0.0.0.0)
    allowedHosts: [
      'studysnap-demo.loca.lt', // your specific tunnel host
      '.loca.lt'                // or a wildcard for any subdomain of loca.lt
    ],
  },
});
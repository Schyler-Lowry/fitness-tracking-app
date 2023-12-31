import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/static/",
});

// import basicSsl from "@vitejs/plugin-basic-ssl";

// export default {
//   plugins: [basicSsl()],
// };

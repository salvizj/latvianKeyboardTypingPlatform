// vite.config.ts
import react from "file:///C:/Users/User/Desktop/k_darbs/latvianKeyboardTypingPlatform/web/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tailwindcss from "file:///C:/Users/User/Desktop/k_darbs/latvianKeyboardTypingPlatform/web/node_modules/tailwindcss/lib/index.js";
import { defineConfig } from "file:///C:/Users/User/Desktop/k_darbs/latvianKeyboardTypingPlatform/web/node_modules/vite/dist/node/index.js";
import dotenv from "file:///C:/Users/User/Desktop/k_darbs/latvianKeyboardTypingPlatform/web/node_modules/dotenv/lib/main.js";
dotenv.config({ path: "../.env" });
var vite_config_default = defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  },
  server: {
    port: parseInt(process.env.VITE_PORT || "8080", 10),
    open: true
  },
  build: {
    outDir: "./dist",
    emptyOutDir: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXERlc2t0b3BcXFxca19kYXJic1xcXFxsYXR2aWFuS2V5Ym9hcmRUeXBpbmdQbGF0Zm9ybVxcXFx3ZWJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFVzZXJcXFxcRGVza3RvcFxcXFxrX2RhcmJzXFxcXGxhdHZpYW5LZXlib2FyZFR5cGluZ1BsYXRmb3JtXFxcXHdlYlxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvVXNlci9EZXNrdG9wL2tfZGFyYnMvbGF0dmlhbktleWJvYXJkVHlwaW5nUGxhdGZvcm0vd2ViL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tICd0YWlsd2luZGNzcyc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBkb3RlbnYgZnJvbSAnZG90ZW52JztcblxuZG90ZW52LmNvbmZpZyh7IHBhdGg6ICcuLi8uZW52JyB9KTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gICAgY3NzOiB7XG4gICAgICAgIHBvc3Rjc3M6IHtcbiAgICAgICAgICAgIHBsdWdpbnM6IFt0YWlsd2luZGNzcygpXSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgICBwb3J0OiBwYXJzZUludChwcm9jZXNzLmVudi5WSVRFX1BPUlQgfHwgJzgwODAnLCAxMCksXG4gICAgICAgIG9wZW46IHRydWUsXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgICBvdXREaXI6ICcuL2Rpc3QnLFxuICAgICAgICBlbXB0eU91dERpcjogdHJ1ZSxcbiAgICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZYLE9BQU8sV0FBVztBQUMvWSxPQUFPLGlCQUFpQjtBQUN4QixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFlBQVk7QUFFbkIsT0FBTyxPQUFPLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFakMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLEtBQUs7QUFBQSxJQUNELFNBQVM7QUFBQSxNQUNMLFNBQVMsQ0FBQyxZQUFZLENBQUM7QUFBQSxJQUMzQjtBQUFBLEVBQ0o7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNKLE1BQU0sU0FBUyxRQUFRLElBQUksYUFBYSxRQUFRLEVBQUU7QUFBQSxJQUNsRCxNQUFNO0FBQUEsRUFDVjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0gsUUFBUTtBQUFBLElBQ1IsYUFBYTtBQUFBLEVBQ2pCO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K

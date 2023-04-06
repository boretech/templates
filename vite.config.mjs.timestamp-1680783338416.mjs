// vite.config.mjs
import { resolve } from "path";
import { defineConfig, loadEnv } from "file:///D:/bore_project/templates/node_modules/.pnpm/vite@4.2.1_sass@1.60.0_terser@5.16.8/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/bore_project/templates/node_modules/.pnpm/@vitejs+plugin-vue@4.1.0_vite@4.2.1_vue@3.2.47/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///D:/bore_project/templates/node_modules/.pnpm/registry.npmmirror.com+unplugin-auto-import@0.15.2/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/bore_project/templates/node_modules/.pnpm/registry.npmmirror.com+unplugin-vue-components@0.24.1_vue@3.2.47/node_modules/unplugin-vue-components/dist/vite.mjs";
import { VantResolver } from "file:///D:/bore_project/templates/node_modules/.pnpm/registry.npmmirror.com+unplugin-vue-components@0.24.1_vue@3.2.47/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import Icons from "file:///D:/bore_project/templates/node_modules/.pnpm/registry.npmmirror.com+unplugin-icons@0.16.1/node_modules/unplugin-icons/dist/vite.mjs";
import IconsResolver from "file:///D:/bore_project/templates/node_modules/.pnpm/registry.npmmirror.com+unplugin-icons@0.16.1/node_modules/unplugin-icons/dist/resolver.mjs";
import { createSvgIconsPlugin } from "file:///D:/bore_project/templates/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-svg-icons@2.0.1_vite@4.2.1/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import Imagemin from "file:///D:/bore_project/templates/node_modules/.pnpm/registry.npmmirror.com+unplugin-imagemin@0.3.12/node_modules/unplugin-imagemin/dist/vite.mjs";
import mkcert from "file:///D:/bore_project/templates/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-mkcert@1.14.0_vite@4.2.1/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
import Legacy from "file:///D:/bore_project/templates/node_modules/.pnpm/registry.npmmirror.com+@vitejs+plugin-legacy@4.0.2_terser@5.16.8_vite@4.2.1/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import { viteObfuscateFile } from "file:///D:/bore_project/templates/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-obfuscator@1.0.5/node_modules/vite-plugin-obfuscator/index.js";

// scripts/viteUtils.mjs
var genEnv = (env) => Object.keys(env).reduce((acc, key) => {
  const valueString = env[key];
  let realValue = valueString;
  if (/^(0|[1-9][0-9]*)$/.test(valueString)) {
    realValue = +valueString;
  }
  if (valueString === "true") {
    realValue = true;
  }
  if (valueString === "false") {
    realValue = false;
  }
  if (/^(\{*\}|[*])$/.test(valueString)) {
    realValue = JSON.parse(valueString);
  }
  acc[key] = realValue;
  return acc;
}, {});
var genProxy = (proxy) => Object.keys(proxy).reduce((acc, item) => {
  const target = proxy[item];
  acc[item] = {
    target,
    changeOrigin: true,
    ws: true,
    rewrite: (path) => path.replace(new RegExp(`^${item}`), ""),
    secure: /^https:\/\//.test(target)
  };
  return acc;
}, {});

// vite.config.mjs
var vite_config_default = defineConfig(({ mode }) => {
  const root = process.cwd();
  const { VITE_BASE, VITE_OPEN, VITE_PORT, VITE_HTTPS, VITE_PROXY, VITE_DROP_CONSOLE, VITE_SOURCEMAP, VITE_UGLIFY, VITE_LEGACY } = genEnv(loadEnv(mode, root));
  const config = {
    root,
    base: VITE_BASE || "./",
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(root, "src")
        }
      ]
    },
    plugins: [
      vue(),
      AutoImport({
        imports: [
          "vue",
          "vue-router",
          "pinia"
        ],
        eslintrc: {
          enabled: true,
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: true
        }
      }),
      Components({
        resolvers: [
          VantResolver(),
          IconsResolver({
            prefix: "i"
          })
        ]
      }),
      createSvgIconsPlugin({
        iconDirs: [resolve(root, "src/assets/icons")],
        symbolId: "[name]",
        customDomId: "svg_icons_dom"
      }),
      Icons({
        compiler: "vue3",
        autoInstall: true,
        iconCustomizer(collection, icon, props) {
          props.width = "1em";
          props.height = "1em";
          props.class = "leading-[1em]";
        }
      })
    ]
  };
  if (mode === "development") {
    config.server = {
      host: true,
      https: VITE_HTTPS,
      open: VITE_OPEN,
      port: VITE_PORT || 5173,
      proxy: genProxy(VITE_PROXY)
    };
    if (VITE_HTTPS) {
      config.plugins = config.plugins.concat(mkcert());
    }
  }
  if (mode === "production") {
    config.esbuild = {
      pure: VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
    };
    config.build = {
      chunkSizeWarningLimit: 2e3,
      sourcemap: VITE_SOURCEMAP
    };
    if (VITE_UGLIFY) {
      config.plugins = config.plugins.concat([
        viteObfuscateFile({
          rotateUnicodeArray: true
        })
      ]);
    }
    if (VITE_LEGACY) {
      config.plugins = config.plugins.concat([
        Legacy({
          targets: ["iOS >= 11", "Chrome >= 64"],
          modernPolyfills: true
        })
      ]);
    } else {
      config.build.target = "es2015";
    }
    config.plugins = config.plugins.concat([
      Imagemin()
    ]);
  }
  return config;
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubWpzIiwgInNjcmlwdHMvdml0ZVV0aWxzLm1qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGJvcmVfcHJvamVjdFxcXFx0ZW1wbGF0ZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGJvcmVfcHJvamVjdFxcXFx0ZW1wbGF0ZXNcXFxcdml0ZS5jb25maWcubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9ib3JlX3Byb2plY3QvdGVtcGxhdGVzL3ZpdGUuY29uZmlnLm1qc1wiO2ltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xyXG5cclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbmltcG9ydCB7IFZhbnRSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcclxuaW1wb3J0IEljb25zIGZyb20gJ3VucGx1Z2luLWljb25zL3ZpdGUnXHJcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gJ3VucGx1Z2luLWljb25zL3Jlc29sdmVyJ1xyXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcclxuaW1wb3J0IEltYWdlbWluIGZyb20gJ3VucGx1Z2luLWltYWdlbWluL3ZpdGUnXHJcbmltcG9ydCBta2NlcnQgZnJvbSAndml0ZS1wbHVnaW4tbWtjZXJ0J1xyXG5pbXBvcnQgTGVnYWN5IGZyb20gJ0B2aXRlanMvcGx1Z2luLWxlZ2FjeSdcclxuaW1wb3J0IHsgdml0ZU9iZnVzY2F0ZUZpbGUgfSBmcm9tICd2aXRlLXBsdWdpbi1vYmZ1c2NhdG9yJ1xyXG5cclxuaW1wb3J0IHsgZ2VuRW52LCBnZW5Qcm94eSB9IGZyb20gJy4vc2NyaXB0cy92aXRlVXRpbHMubWpzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xyXG4gIGNvbnN0IHJvb3QgPSBwcm9jZXNzLmN3ZCgpXHJcblxyXG4gIC8vIGNvbnNvbGUubG9nKGxvYWRFbnYobW9kZSwgcm9vdCkpXHJcblxyXG4gIGNvbnN0IHsgVklURV9CQVNFLCBWSVRFX09QRU4sIFZJVEVfUE9SVCwgVklURV9IVFRQUywgVklURV9QUk9YWSwgVklURV9EUk9QX0NPTlNPTEUsIFZJVEVfU09VUkNFTUFQLCBWSVRFX1VHTElGWSwgVklURV9MRUdBQ1kgfSA9IGdlbkVudihsb2FkRW52KG1vZGUsIHJvb3QpKVxyXG5cclxuICBjb25zdCBjb25maWcgPSB7XHJcbiAgICByb290LFxyXG4gICAgYmFzZTogVklURV9CQVNFIHx8ICcuLycsXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZmluZDogJ0AnLFxyXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHJlc29sdmUocm9vdCwgJ3NyYycpXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICB2dWUoKSxcclxuICAgICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgICAgaW1wb3J0czogW1xyXG4gICAgICAgICAgJ3Z1ZScsXHJcbiAgICAgICAgICAndnVlLXJvdXRlcicsXHJcbiAgICAgICAgICAncGluaWEnXHJcbiAgICAgICAgXSxcclxuICAgICAgICBlc2xpbnRyYzoge1xyXG4gICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgIGZpbGVwYXRoOiAnLi8uZXNsaW50cmMtYXV0by1pbXBvcnQuanNvbicsXHJcbiAgICAgICAgICBnbG9iYWxzUHJvcFZhbHVlOiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICB9KSxcclxuICAgICAgQ29tcG9uZW50cyh7XHJcbiAgICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgICBWYW50UmVzb2x2ZXIoKSxcclxuICAgICAgICAgIEljb25zUmVzb2x2ZXIoe1xyXG4gICAgICAgICAgICBwcmVmaXg6ICdpJ1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICBdXHJcbiAgICAgIH0pLFxyXG4gICAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbiAgICAgICAgaWNvbkRpcnM6IFtyZXNvbHZlKHJvb3QsICdzcmMvYXNzZXRzL2ljb25zJyldLFxyXG4gICAgICAgIHN5bWJvbElkOiAnW25hbWVdJyxcclxuICAgICAgICBjdXN0b21Eb21JZDogJ3N2Z19pY29uc19kb20nXHJcbiAgICAgIH0pLFxyXG4gICAgICBJY29ucyh7XHJcbiAgICAgICAgY29tcGlsZXI6ICd2dWUzJyxcclxuICAgICAgICBhdXRvSW5zdGFsbDogdHJ1ZSxcclxuICAgICAgICBpY29uQ3VzdG9taXplcihjb2xsZWN0aW9uLCBpY29uLCBwcm9wcykge1xyXG4gICAgICAgICAgcHJvcHMud2lkdGggPSAnMWVtJ1xyXG4gICAgICAgICAgcHJvcHMuaGVpZ2h0ID0gJzFlbSdcclxuICAgICAgICAgIHByb3BzLmNsYXNzID0gJ2xlYWRpbmctWzFlbV0nXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgXVxyXG4gIH1cclxuXHJcbiAgaWYgKG1vZGUgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIGNvbmZpZy5zZXJ2ZXIgPSB7XHJcbiAgICAgIGhvc3Q6IHRydWUsXHJcbiAgICAgIGh0dHBzOiBWSVRFX0hUVFBTLFxyXG4gICAgICBvcGVuOiBWSVRFX09QRU4sXHJcbiAgICAgIHBvcnQ6IFZJVEVfUE9SVCB8fCA1MTczLFxyXG4gICAgICBwcm94eTogZ2VuUHJveHkoVklURV9QUk9YWSlcclxuICAgIH1cclxuXHJcbiAgICBpZiAoVklURV9IVFRQUykge1xyXG4gICAgICBjb25maWcucGx1Z2lucyA9IGNvbmZpZy5wbHVnaW5zLmNvbmNhdChta2NlcnQoKSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChtb2RlID09PSAncHJvZHVjdGlvbicpIHtcclxuICAgIGNvbmZpZy5lc2J1aWxkID0ge1xyXG4gICAgICBwdXJlOiBWSVRFX0RST1BfQ09OU09MRSA/IFsnY29uc29sZS5sb2cnLCAnZGVidWdnZXInXSA6IFtdXHJcbiAgICB9XHJcblxyXG4gICAgY29uZmlnLmJ1aWxkID0ge1xyXG4gICAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDIwMDAsXHJcbiAgICAgIHNvdXJjZW1hcDogVklURV9TT1VSQ0VNQVBcclxuICAgIH1cclxuXHJcbiAgICBpZiAoVklURV9VR0xJRlkpIHtcclxuICAgICAgY29uZmlnLnBsdWdpbnMgPSBjb25maWcucGx1Z2lucy5jb25jYXQoW1xyXG4gICAgICAgIHZpdGVPYmZ1c2NhdGVGaWxlKHtcclxuICAgICAgICAgIHJvdGF0ZVVuaWNvZGVBcnJheTogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICAgIF0pXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFZJVEVfTEVHQUNZKSB7XHJcbiAgICAgIGNvbmZpZy5wbHVnaW5zID0gY29uZmlnLnBsdWdpbnMuY29uY2F0KFtcclxuICAgICAgICBMZWdhY3koe1xyXG4gICAgICAgICAgdGFyZ2V0czogWydpT1MgPj0gMTEnLCAnQ2hyb21lID49IDY0J10sXHJcbiAgICAgICAgICBtb2Rlcm5Qb2x5ZmlsbHM6IHRydWVcclxuICAgICAgICB9KVxyXG4gICAgICBdKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uZmlnLmJ1aWxkLnRhcmdldCA9ICdlczIwMTUnXHJcbiAgICB9XHJcblxyXG4gICAgY29uZmlnLnBsdWdpbnMgPSBjb25maWcucGx1Z2lucy5jb25jYXQoW1xyXG4gICAgICBJbWFnZW1pbigpXHJcbiAgICBdKVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGNvbmZpZ1xyXG59KVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGJvcmVfcHJvamVjdFxcXFx0ZW1wbGF0ZXNcXFxcc2NyaXB0c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcYm9yZV9wcm9qZWN0XFxcXHRlbXBsYXRlc1xcXFxzY3JpcHRzXFxcXHZpdGVVdGlscy5tanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2JvcmVfcHJvamVjdC90ZW1wbGF0ZXMvc2NyaXB0cy92aXRlVXRpbHMubWpzXCI7ZXhwb3J0IGNvbnN0IGdlbkVudiA9IChlbnYpID0+IE9iamVjdC5rZXlzKGVudikucmVkdWNlKChhY2MsIGtleSkgPT4ge1xyXG4gIGNvbnN0IHZhbHVlU3RyaW5nID0gZW52W2tleV1cclxuXHJcbiAgbGV0IHJlYWxWYWx1ZSA9IHZhbHVlU3RyaW5nXHJcblxyXG4gIGlmICgvXigwfFsxLTldWzAtOV0qKSQvLnRlc3QodmFsdWVTdHJpbmcpKSB7XHJcbiAgICByZWFsVmFsdWUgPSArdmFsdWVTdHJpbmdcclxuICB9XHJcblxyXG4gIGlmICh2YWx1ZVN0cmluZyA9PT0gJ3RydWUnKSB7XHJcbiAgICByZWFsVmFsdWUgPSB0cnVlXHJcbiAgfVxyXG5cclxuICBpZiAodmFsdWVTdHJpbmcgPT09ICdmYWxzZScpIHtcclxuICAgIHJlYWxWYWx1ZSA9IGZhbHNlXHJcbiAgfVxyXG5cclxuICBpZiAoL14oXFx7KlxcfXxbKl0pJC8udGVzdCh2YWx1ZVN0cmluZykpIHtcclxuICAgIHJlYWxWYWx1ZSA9IEpTT04ucGFyc2UodmFsdWVTdHJpbmcpXHJcbiAgfVxyXG5cclxuICBhY2Nba2V5XSA9IHJlYWxWYWx1ZVxyXG5cclxuICByZXR1cm4gYWNjXHJcbn0sIHt9KVxyXG5cclxuZXhwb3J0IGNvbnN0IGdlblByb3h5ID0gKHByb3h5KSA9PiBPYmplY3Qua2V5cyhwcm94eSkucmVkdWNlKChhY2MsIGl0ZW0pID0+IHtcclxuICBjb25zdCB0YXJnZXQgPSBwcm94eVtpdGVtXVxyXG4gIGFjY1tpdGVtXSA9IHtcclxuICAgIHRhcmdldCxcclxuICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgIHdzOiB0cnVlLFxyXG4gICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cChgXiR7aXRlbX1gKSwgJycpLFxyXG4gICAgc2VjdXJlOiAvXmh0dHBzOlxcL1xcLy8udGVzdCh0YXJnZXQpXHJcbiAgfVxyXG4gIHJldHVybiBhY2NcclxufSwge30pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVEsU0FBUyxlQUFlO0FBRTdSLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8sU0FBUztBQUNoQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsT0FBTyxtQkFBbUI7QUFDMUIsU0FBUyw0QkFBNEI7QUFDckMsT0FBTyxjQUFjO0FBQ3JCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFlBQVk7QUFDbkIsU0FBUyx5QkFBeUI7OztBQ2JnUSxJQUFNLFNBQVMsQ0FBQyxRQUFRLE9BQU8sS0FBSyxHQUFHLEVBQUUsT0FBTyxDQUFDLEtBQUssUUFBUTtBQUM5VixRQUFNLGNBQWMsSUFBSSxHQUFHO0FBRTNCLE1BQUksWUFBWTtBQUVoQixNQUFJLG9CQUFvQixLQUFLLFdBQVcsR0FBRztBQUN6QyxnQkFBWSxDQUFDO0FBQUEsRUFDZjtBQUVBLE1BQUksZ0JBQWdCLFFBQVE7QUFDMUIsZ0JBQVk7QUFBQSxFQUNkO0FBRUEsTUFBSSxnQkFBZ0IsU0FBUztBQUMzQixnQkFBWTtBQUFBLEVBQ2Q7QUFFQSxNQUFJLGdCQUFnQixLQUFLLFdBQVcsR0FBRztBQUNyQyxnQkFBWSxLQUFLLE1BQU0sV0FBVztBQUFBLEVBQ3BDO0FBRUEsTUFBSSxHQUFHLElBQUk7QUFFWCxTQUFPO0FBQ1QsR0FBRyxDQUFDLENBQUM7QUFFRSxJQUFNLFdBQVcsQ0FBQyxVQUFVLE9BQU8sS0FBSyxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssU0FBUztBQUMxRSxRQUFNLFNBQVMsTUFBTSxJQUFJO0FBQ3pCLE1BQUksSUFBSSxJQUFJO0FBQUEsSUFDVjtBQUFBLElBQ0EsY0FBYztBQUFBLElBQ2QsSUFBSTtBQUFBLElBQ0osU0FBUyxVQUFRLEtBQUssUUFBUSxJQUFJLE9BQU8sSUFBSSxNQUFNLEdBQUcsRUFBRTtBQUFBLElBQ3hELFFBQVEsY0FBYyxLQUFLLE1BQU07QUFBQSxFQUNuQztBQUNBLFNBQU87QUFDVCxHQUFHLENBQUMsQ0FBQzs7O0FEbkJMLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFFBQU0sT0FBTyxRQUFRLElBQUk7QUFJekIsUUFBTSxFQUFFLFdBQVcsV0FBVyxXQUFXLFlBQVksWUFBWSxtQkFBbUIsZ0JBQWdCLGFBQWEsWUFBWSxJQUFJLE9BQU8sUUFBUSxNQUFNLElBQUksQ0FBQztBQUUzSixRQUFNLFNBQVM7QUFBQSxJQUNiO0FBQUEsSUFDQSxNQUFNLGFBQWE7QUFBQSxJQUNuQixTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTDtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYSxRQUFRLE1BQU0sS0FBSztBQUFBLFFBQ2xDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNKLFdBQVc7QUFBQSxRQUNULFNBQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsUUFDQSxVQUFVO0FBQUEsVUFDUixTQUFTO0FBQUEsVUFDVCxVQUFVO0FBQUEsVUFDVixrQkFBa0I7QUFBQSxRQUNwQjtBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BQ0QsV0FBVztBQUFBLFFBQ1QsV0FBVztBQUFBLFVBQ1QsYUFBYTtBQUFBLFVBQ2IsY0FBYztBQUFBLFlBQ1osUUFBUTtBQUFBLFVBQ1YsQ0FBQztBQUFBLFFBQ0g7QUFBQSxNQUNGLENBQUM7QUFBQSxNQUNELHFCQUFxQjtBQUFBLFFBQ25CLFVBQVUsQ0FBQyxRQUFRLE1BQU0sa0JBQWtCLENBQUM7QUFBQSxRQUM1QyxVQUFVO0FBQUEsUUFDVixhQUFhO0FBQUEsTUFDZixDQUFDO0FBQUEsTUFDRCxNQUFNO0FBQUEsUUFDSixVQUFVO0FBQUEsUUFDVixhQUFhO0FBQUEsUUFDYixlQUFlLFlBQVksTUFBTSxPQUFPO0FBQ3RDLGdCQUFNLFFBQVE7QUFDZCxnQkFBTSxTQUFTO0FBQ2YsZ0JBQU0sUUFBUTtBQUFBLFFBQ2hCO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFFQSxNQUFJLFNBQVMsZUFBZTtBQUMxQixXQUFPLFNBQVM7QUFBQSxNQUNkLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLE1BQU0sYUFBYTtBQUFBLE1BQ25CLE9BQU8sU0FBUyxVQUFVO0FBQUEsSUFDNUI7QUFFQSxRQUFJLFlBQVk7QUFDZCxhQUFPLFVBQVUsT0FBTyxRQUFRLE9BQU8sT0FBTyxDQUFDO0FBQUEsSUFDakQ7QUFBQSxFQUNGO0FBRUEsTUFBSSxTQUFTLGNBQWM7QUFDekIsV0FBTyxVQUFVO0FBQUEsTUFDZixNQUFNLG9CQUFvQixDQUFDLGVBQWUsVUFBVSxJQUFJLENBQUM7QUFBQSxJQUMzRDtBQUVBLFdBQU8sUUFBUTtBQUFBLE1BQ2IsdUJBQXVCO0FBQUEsTUFDdkIsV0FBVztBQUFBLElBQ2I7QUFFQSxRQUFJLGFBQWE7QUFDZixhQUFPLFVBQVUsT0FBTyxRQUFRLE9BQU87QUFBQSxRQUNyQyxrQkFBa0I7QUFBQSxVQUNoQixvQkFBb0I7QUFBQSxRQUN0QixDQUFDO0FBQUEsTUFDSCxDQUFDO0FBQUEsSUFDSDtBQUVBLFFBQUksYUFBYTtBQUNmLGFBQU8sVUFBVSxPQUFPLFFBQVEsT0FBTztBQUFBLFFBQ3JDLE9BQU87QUFBQSxVQUNMLFNBQVMsQ0FBQyxhQUFhLGNBQWM7QUFBQSxVQUNyQyxpQkFBaUI7QUFBQSxRQUNuQixDQUFDO0FBQUEsTUFDSCxDQUFDO0FBQUEsSUFDSCxPQUFPO0FBQ0wsYUFBTyxNQUFNLFNBQVM7QUFBQSxJQUN4QjtBQUVBLFdBQU8sVUFBVSxPQUFPLFFBQVEsT0FBTztBQUFBLE1BQ3JDLFNBQVM7QUFBQSxJQUNYLENBQUM7QUFBQSxFQUNIO0FBRUEsU0FBTztBQUNULENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

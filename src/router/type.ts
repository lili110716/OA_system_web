import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    // 是否需要显示侧边栏，默认true
    layout?: boolean;
    // 可选：其他元信息（如标题、权限等）
    title?: string;
  }
}

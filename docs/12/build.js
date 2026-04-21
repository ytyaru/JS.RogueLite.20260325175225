// build.js
await Bun.build({
  entrypoints: ['./src/main.js'],
  outdir: './dist',
  naming: 'bundle.js',
  minify: true, // 配布時は圧縮
  sourcemap: 'external', // デバッグ用にソースマップを出力
});
console.log("Build complete!");


import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";

const SRC_DIR = "../src";
const DIST_DIR = "../dist";

// 1. Bunでバンドル（1つの作業用ファイルを作成）
console.log("Bundling...");
const bundleResult = await Bun.build({
    entrypoints: [path.join(SRC_DIR, "js/main.js")],
    outdir: DIST_DIR,
    naming: "bundled_temp.js",
    minify: true, // 共通してミニファイは行う
});

if (!bundleResult.success) {
    console.error("Bundle failed:", bundleResult.logs);
    process.exit(1);
}

const tempFile = path.join(DIST_DIR, "bundled_temp.js");

// --- ターゲット1: FF142 (トランスパイルなし) ---
console.log("Building target: FF142...");
const ffDir = path.join(DIST_DIR, "FF142");
if (!fs.existsSync(ffDir)) fs.mkdirSync(ffDir, { recursive: true });
fs.copyFileSync(tempFile, path.join(ffDir, "bundle.js"));
copyAssets(ffDir);

// --- ターゲット2: IE11 (ES5トランスパイル) ---
console.log("Building target: IE11...");
const ieDir = path.join(DIST_DIR, "IE11");
if (!fs.existsSync(ieDir)) fs.mkdirSync(ieDir, { recursive: true });

// Babel実行: 明示的に ie 11 をターゲットに指定
spawnSync("bunx", [
    "babel", tempFile,
    "--out-file", path.join(ieDir, "bundle.js"),
    "--presets", JSON.stringify([["@babel/preset-env", { targets: "ie 11", modules: false }]]),
    "--no-babelrc"
]);
copyAssets(ieDir);

function copyAssets(outDir) {
    fs.copyFileSync(path.join(SRC_DIR, "css/scene.css"), path.join(outDir, "scene.css"));
    fs.copyFileSync(path.join(SRC_DIR, "index.html"), path.join(outDir, "index.html"));
}

// 3. 作業用ファイルの削除
fs.unlinkSync(tempFile);
console.log("Build complete!");

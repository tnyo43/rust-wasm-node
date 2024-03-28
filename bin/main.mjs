import fs from "node:fs";
import { WASI } from "wasi";

const wasi = new WASI({});

const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

(async () => {
  const wasm = await WebAssembly.compile(
    fs.readFileSync("./target/wasm32-wasi/debug/rust-wasm-node-file.wasm")
  );
  const instance = await WebAssembly.instantiate(wasm, importObject);

  wasi.start(instance);
})();

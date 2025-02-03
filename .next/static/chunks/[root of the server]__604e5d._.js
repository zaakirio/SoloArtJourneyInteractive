(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/[root of the server]__604e5d._.js", {

"[turbopack]/browser/dev/hmr-client/websocket.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Adapted from https://github.com/vercel/next.js/blob/canary/packages/next/src/client/dev/error-overlay/websocket.ts
__turbopack_esm__({
    "addMessageListener": (()=>addMessageListener),
    "connectHMR": (()=>connectHMR),
    "sendMessage": (()=>sendMessage)
});
let source;
const eventCallbacks = [];
// TODO: add timeout again
// let lastActivity = Date.now()
function getSocketProtocol(assetPrefix) {
    let protocol = location.protocol;
    try {
        // assetPrefix is a url
        protocol = new URL(assetPrefix).protocol;
    } catch (_) {}
    return protocol === "http:" ? "ws" : "wss";
}
function addMessageListener(cb) {
    eventCallbacks.push(cb);
}
function sendMessage(data) {
    if (!source || source.readyState !== source.OPEN) return;
    return source.send(data);
}
function connectHMR(options) {
    const { timeout = 5 * 1000 } = options;
    function init() {
        if (source) source.close();
        console.log("[HMR] connecting...");
        function handleOnline() {
            const connected = {
                type: "turbopack-connected"
            };
            eventCallbacks.forEach((cb)=>{
                cb(connected);
            });
            if (options.log) console.log("[HMR] connected");
        // lastActivity = Date.now()
        }
        function handleMessage(event) {
            // lastActivity = Date.now()
            const message = {
                type: "turbopack-message",
                data: JSON.parse(event.data)
            };
            eventCallbacks.forEach((cb)=>{
                cb(message);
            });
        }
        // let timer: NodeJS.Timeout
        function handleDisconnect() {
            source.close();
            setTimeout(init, timeout);
        }
        const { hostname, port } = location;
        const protocol = getSocketProtocol(options.assetPrefix || "");
        const assetPrefix = options.assetPrefix.replace(/^\/+/, "");
        let url = `${protocol}://${hostname}:${port}${assetPrefix ? `/${assetPrefix}` : ""}`;
        if (assetPrefix.startsWith("http")) {
            url = `${protocol}://${assetPrefix.split("://")[1]}`;
        }
        source = new window.WebSocket(`${url}${options.path}`);
        source.onopen = handleOnline;
        source.onerror = handleDisconnect;
        source.onmessage = handleMessage;
    }
    init();
}
}}),
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_esm__({
    "connect": (()=>connect),
    "setHooks": (()=>setHooks),
    "subscribeToUpdate": (()=>subscribeToUpdate)
});
var __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[turbopack]/browser/dev/hmr-client/websocket.ts [client] (ecmascript)");
;
function connect({ // TODO(WEB-1465) Remove this backwards compat fallback once
// vercel/next.js#54586 is merged.
addMessageListener = __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["addMessageListener"], // TODO(WEB-1465) Remove this backwards compat fallback once
// vercel/next.js#54586 is merged.
sendMessage = __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["sendMessage"], onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case "turbopack-connected":
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn("[Fast Refresh] performing full reload\n\n" + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + "You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n" + "Consider migrating the non-React component export to a separate file and importing it into both files.\n\n" + "It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n" + "Fast Refresh requires at least one parent function component in your React tree.");
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error("A separate HMR handler was already registered");
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: "turbopack-subscribe",
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: "turbopack-unsubscribe",
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: "ChunkListUpdate",
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted" || updateA.type === "deleted" && updateB.type === "added") {
        return undefined;
    }
    if (updateA.type === "partial") {
        invariant(updateA.instruction, "Partial updates are unsupported");
    }
    if (updateB.type === "partial") {
        invariant(updateB.instruction, "Partial updates are unsupported");
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: "EcmascriptMergedUpdate",
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted") {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === "deleted" && updateB.type === "added") {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: "partial",
            added,
            deleted
        };
    }
    if (updateA.type === "partial" && updateB.type === "partial") {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: "partial",
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === "added" && updateB.type === "partial") {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: "added",
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === "partial" && updateB.type === "deleted") {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: "deleted",
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    "bug",
    "error",
    "fatal"
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    "bug",
    "fatal",
    "error",
    "warning",
    "info",
    "log"
];
const CATEGORY_ORDER = [
    "parse",
    "resolve",
    "code generation",
    "rendering",
    "typescript",
    "other"
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case "issues":
            break;
        case "partial":
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    // TODO(WEB-1465) Remove this backwards compat fallback once
    // vercel/next.js#54586 is merged.
    if (callback === undefined) {
        callback = sendMessage;
        sendMessage = __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["sendMessage"];
    }
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === "notFound") {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}}),
"[project]/src/components/CurriculumCard.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// CurriculumCard.tsx
__turbopack_esm__({
    "CurriculumCard": (()=>CurriculumCard),
    "CurriculumGrid": (()=>CurriculumGrid)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/react@19.0.0/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/react@19.0.0/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$474$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.474.0_react@19.0.0/node_modules/lucide-react/dist/esm/icons/book-open.js [client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$474$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Youtube$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.474.0_react@19.0.0/node_modules/lucide-react/dist/esm/icons/youtube.js [client] (ecmascript) <export default as Youtube>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$474$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2d$check$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookmarkCheck$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.474.0_react@19.0.0/node_modules/lucide-react/dist/esm/icons/bookmark-check.js [client] (ecmascript) <export default as BookmarkCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$474$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.474.0_react@19.0.0/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [client] (ecmascript) <export default as GraduationCap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$474$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.474.0_react@19.0.0/node_modules/lucide-react/dist/esm/icons/palette.js [client] (ecmascript) <export default as Palette>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$474$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Book$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.474.0_react@19.0.0/node_modules/lucide-react/dist/esm/icons/book.js [client] (ecmascript) <export default as Book>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$474$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.474.0_react@19.0.0/node_modules/lucide-react/dist/esm/icons/pencil.js [client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$0$2e$11_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@12.0.11_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$474$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.474.0_react@19.0.0/node_modules/lucide-react/dist/esm/icons/chevron-down.js [client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$474$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.474.0_react@19.0.0/node_modules/lucide-react/dist/esm/icons/x.js [client] (ecmascript) <export default as X>");
;
var _s = __turbopack_refresh__.signature();
;
;
;
// Color theme mapping for different terms
const termColors = {
    1: {
        bg: 'bg-rose-50',
        accent: 'bg-rose-500',
        text: 'text-rose-700',
        hover: 'hover:bg-rose-100',
        border: 'border-rose-200'
    },
    2: {
        bg: 'bg-violet-50',
        accent: 'bg-violet-500',
        text: 'text-violet-700',
        hover: 'hover:bg-violet-100',
        border: 'border-violet-200'
    },
    3: {
        bg: 'bg-cyan-50',
        accent: 'bg-cyan-500',
        text: 'text-cyan-700',
        hover: 'hover:bg-cyan-100',
        border: 'border-cyan-200'
    },
    4: {
        bg: 'bg-amber-50',
        accent: 'bg-amber-500',
        text: 'text-amber-700',
        hover: 'hover:bg-amber-100',
        border: 'border-amber-200'
    },
    5: {
        bg: 'bg-emerald-50',
        accent: 'bg-emerald-500',
        text: 'text-emerald-700',
        hover: 'hover:bg-emerald-100',
        border: 'border-emerald-200'
    },
    6: {
        bg: 'bg-indigo-50',
        accent: 'bg-indigo-500',
        text: 'text-indigo-700',
        hover: 'hover:bg-indigo-100',
        border: 'border-indigo-200'
    }
};
const CurriculumCard = ({ termData })=>{
    _s();
    const [isExpanded, setIsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const colors = termColors[termData.term];
    const getIcon = (type)=>{
        switch(type){
            case 'book':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$474$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                    className: "w-5 h-5"
                }, void 0, false, {
                    fileName: "[project]/src/components/CurriculumCard.tsx",
                    lineNumber: 27,
                    columnNumber: 16
                }, this);
            case 'youtube':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$474$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Youtube$3e$__["Youtube"], {
                    className: "w-5 h-5"
                }, void 0, false, {
                    fileName: "[project]/src/components/CurriculumCard.tsx",
                    lineNumber: 29,
                    columnNumber: 16
                }, this);
            case 'challenge':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$474$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2d$check$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookmarkCheck$3e$__["BookmarkCheck"], {
                    className: "w-5 h-5"
                }, void 0, false, {
                    fileName: "[project]/src/components/CurriculumCard.tsx",
                    lineNumber: 31,
                    columnNumber: 16
                }, this);
            case 'course':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$474$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"], {
                    className: "w-5 h-5"
                }, void 0, false, {
                    fileName: "[project]/src/components/CurriculumCard.tsx",
                    lineNumber: 33,
                    columnNumber: 16
                }, this);
            default:
                return null;
        }
    };
    const getUnitIcon = (title)=>{
        if (title.toLowerCase().includes('drawing')) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$474$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
            className: "w-6 h-6"
        }, void 0, false, {
            fileName: "[project]/src/components/CurriculumCard.tsx",
            lineNumber: 40,
            columnNumber: 57
        }, this);
        if (title.toLowerCase().includes('perspective')) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$474$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Book$3e$__["Book"], {
            className: "w-6 h-6"
        }, void 0, false, {
            fileName: "[project]/src/components/CurriculumCard.tsx",
            lineNumber: 41,
            columnNumber: 61
        }, this);
        if (title.toLowerCase().includes('composition')) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$474$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"], {
            className: "w-6 h-6"
        }, void 0, false, {
            fileName: "[project]/src/components/CurriculumCard.tsx",
            lineNumber: 42,
            columnNumber: 61
        }, this);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$474$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"], {
            className: "w-6 h-6"
        }, void 0, false, {
            fileName: "[project]/src/components/CurriculumCard.tsx",
            lineNumber: 43,
            columnNumber: 12
        }, this);
    };
    const cardVariants = {
        collapsed: {
            width: '100%',
            height: '300px',
            position: 'relative'
        },
        expanded: {
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 50
        }
    };
    const renderResource = (resource)=>{
        switch(resource.type){
            case 'course':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: resource.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "block text-blue-600 hover:underline",
                    children: resource.title
                }, void 0, false, {
                    fileName: "[project]/src/components/CurriculumCard.tsx",
                    lineNumber: 66,
                    columnNumber: 11
                }, this);
            case 'youtube':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2 mt-2",
                    children: resource.videos.map((video, vIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: video.url,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "block text-blue-600 hover:underline",
                            children: video.title
                        }, vIndex, false, {
                            fileName: "[project]/src/components/CurriculumCard.tsx",
                            lineNumber: 80,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/CurriculumCard.tsx",
                    lineNumber: 78,
                    columnNumber: 11
                }, this);
            case 'book':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        resource.title,
                        " by ",
                        resource.author
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/CurriculumCard.tsx",
                    lineNumber: 95,
                    columnNumber: 11
                }, this);
            case 'challenge':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        resource.url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: resource.url,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "block text-blue-600 hover:underline",
                            children: resource.title
                        }, void 0, false, {
                            fileName: "[project]/src/components/CurriculumCard.tsx",
                            lineNumber: 104,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: resource.title
                        }, void 0, false, {
                            fileName: "[project]/src/components/CurriculumCard.tsx",
                            lineNumber: 113,
                            columnNumber: 15
                        }, this),
                        resource.tasks && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "list-disc pl-5 mt-2 space-y-1",
                            children: resource.tasks.map((task, tIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: task
                                }, tIndex, false, {
                                    fileName: "[project]/src/components/CurriculumCard.tsx",
                                    lineNumber: 118,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/CurriculumCard.tsx",
                            lineNumber: 116,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/CurriculumCard.tsx",
                    lineNumber: 102,
                    columnNumber: 11
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$0$2e$11_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].div, {
        layout: true,
        variants: cardVariants,
        initial: "collapsed",
        animate: isExpanded ? 'expanded' : 'collapsed',
        transition: {
            duration: 0.3,
            ease: 'easeInOut'
        },
        className: `${colors.bg} rounded-xl shadow-lg overflow-hidden cursor-pointer border ${colors.border} mb-6`,
        onClick: ()=>!isExpanded && setIsExpanded(true),
        children: isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6 h-full overflow-y-auto bg-white",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: `text-3xl font-bold ${colors.text}`,
                            children: [
                                "Term ",
                                termData.term
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/CurriculumCard.tsx",
                            lineNumber: 140,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: (e)=>{
                                e.stopPropagation();
                                setIsExpanded(false);
                            },
                            className: `p-2 ${colors.hover} rounded-full transition-colors`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$474$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-6 h-6"
                            }, void 0, false, {
                                fileName: "[project]/src/components/CurriculumCard.tsx",
                                lineNumber: 148,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/CurriculumCard.tsx",
                            lineNumber: 141,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/CurriculumCard.tsx",
                    lineNumber: 139,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                    children: termData.units.map((unit, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${colors.bg} rounded-lg p-6 border ${colors.border}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-semibold mb-4 flex items-center gap-2",
                                    children: [
                                        getUnitIcon(unit.title),
                                        unit.title
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/CurriculumCard.tsx",
                                    lineNumber: 158,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: unit.resources.map((resource, rIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white rounded-lg p-4 shadow-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 text-gray-700 mb-2",
                                                    children: [
                                                        getIcon(resource.type),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "capitalize font-medium",
                                                            children: resource.type
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CurriculumCard.tsx",
                                                            lineNumber: 167,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/CurriculumCard.tsx",
                                                    lineNumber: 165,
                                                    columnNumber: 23
                                                }, this),
                                                renderResource(resource)
                                            ]
                                        }, rIndex, true, {
                                            fileName: "[project]/src/components/CurriculumCard.tsx",
                                            lineNumber: 164,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CurriculumCard.tsx",
                                    lineNumber: 162,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, index, true, {
                            fileName: "[project]/src/components/CurriculumCard.tsx",
                            lineNumber: 154,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/CurriculumCard.tsx",
                    lineNumber: 152,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/CurriculumCard.tsx",
            lineNumber: 138,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `p-6 h-full flex flex-col`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${colors.accent} text-white px-4 py-1 rounded-full text-sm font-medium`,
                            children: [
                                "Term ",
                                termData.term
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/CurriculumCard.tsx",
                            lineNumber: 180,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$474$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                            className: `w-5 h-5 ${colors.text}`
                        }, void 0, false, {
                            fileName: "[project]/src/components/CurriculumCard.tsx",
                            lineNumber: 183,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/CurriculumCard.tsx",
                    lineNumber: 179,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4 flex-grow",
                    children: termData.units.map((unit, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex items-center gap-2 ${colors.text}`,
                            children: [
                                getUnitIcon(unit.title),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-medium",
                                    children: unit.title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CurriculumCard.tsx",
                                    lineNumber: 189,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, index, true, {
                            fileName: "[project]/src/components/CurriculumCard.tsx",
                            lineNumber: 187,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/CurriculumCard.tsx",
                    lineNumber: 185,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 flex gap-2 flex-wrap",
                    children: Array.from(new Set(termData.units.flatMap((unit)=>unit.resources.map((resource)=>resource.type)))).map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex items-center gap-1 ${colors.text} text-sm`,
                            children: [
                                getIcon(type),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "capitalize",
                                    children: type
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CurriculumCard.tsx",
                                    lineNumber: 199,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, type, true, {
                            fileName: "[project]/src/components/CurriculumCard.tsx",
                            lineNumber: 197,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/CurriculumCard.tsx",
                    lineNumber: 193,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/CurriculumCard.tsx",
            lineNumber: 178,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/CurriculumCard.tsx",
        lineNumber: 128,
        columnNumber: 5
    }, this);
};
_s(CurriculumCard, "FPNvbbHVlWWR4LKxxNntSxiIS38=");
_c = CurriculumCard;
const CurriculumGrid = ({ terms })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6",
        children: terms.map((term)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CurriculumCard, {
                termData: term
            }, term.term, false, {
                fileName: "[project]/src/components/CurriculumCard.tsx",
                lineNumber: 214,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/CurriculumCard.tsx",
        lineNumber: 212,
        columnNumber: 5
    }, this);
};
_c1 = CurriculumGrid;
var _c, _c1;
__turbopack_refresh__.register(_c, "CurriculumCard");
__turbopack_refresh__.register(_c1, "CurriculumGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/data/curriculum/term-1.json (json)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__(JSON.parse("{\"term\":1,\"units\":[{\"title\":\"Figure drawing\",\"resources\":[{\"type\":\"course\",\"title\":\"Figure drawing Fundamentals, Proko Premium\",\"url\":\"https://www.proko.com/figure-drawing-fundamentals-course\"},{\"type\":\"youtube\",\"videos\":[{\"title\":\"Proko Figure Drawing fundamentals\",\"url\":\"https://www.youtube.com/watch?v=74HR59yFZ7Y&list=PLtG4P3lq8RHGuMuprDarMz_Y9Fbw_d2ws\"},{\"title\":\"Love Life Drawing\",\"url\":\"https://www.youtube.com/user/lovelifedrawing\"}]},{\"type\":\"book\",\"title\":\"Figure drawing for all it's worth\",\"author\":\"Andrew Loomis\"},{\"type\":\"challenge\",\"title\":\"30 days of Croquis Cafe Gesture Sessions\",\"url\":\"https://vimeo.com/channels/croquiscafe\"}]},{\"title\":\"Perspective I\",\"resources\":[{\"type\":\"course\",\"title\":\"Drawabox.com Lessons 0-3\",\"url\":\"https://drawabox.com/\"},{\"type\":\"course\",\"title\":\"Introduction to Perspective, Marshall Vandruff\",\"url\":\"https://marshallart.com/SHOP/all-products/all-videos/1994-perspective-drawing-series/\"},{\"type\":\"book\",\"title\":\"Perspective Made Easy\",\"author\":\"Ernest Norling\"},{\"type\":\"course\",\"title\":\"Fundamentals of Perspective, Gary Myers\",\"url\":\"https://www.thegnomonworkshop.com/tutorials/fundamentals-of-perspective-1\"},{\"type\":\"challenge\",\"title\":\"Drawabox.com\",\"tasks\":[\"250 Box Challenge\",\"250 Cylinder Challenge\"]}]},{\"title\":\"Composition & storytelling I\",\"resources\":[{\"type\":\"course\",\"title\":\"Creative Composition, SVSLearn\",\"url\":\"https://www.svslearn.com/news/2018/11/7/creative-composition-20\"},{\"type\":\"youtube\",\"videos\":[{\"title\":\"Aaron Blaise: Methods for pleasing compositions\",\"url\":\"https://www.youtube.com/watch?v=dOMRWxo0ixo\"},{\"title\":\"moderndayjames: Composition 1\",\"url\":\"https://www.youtube.com/watch?v=wg-So3ElA8g\"},{\"title\":\"Sycra: Effective Composition Using Shapes\",\"url\":\"https://www.youtube.com/watch?v=Q7qonaAIDUk&list=PLV2X3tgajVlHEWoxhxHBV5JyU7R80LT9R\"},{\"title\":\"Blender Guru: Composition\",\"url\":\"https://www.youtube.com/watch?v=O8i7OKbWmRM\"}]},{\"type\":\"book\",\"title\":\"Framed Ink\",\"author\":\"Marcos Mateu-Mestre\"},{\"type\":\"challenge\",\"tasks\":[\"Thumbnail 50 favourite movie scenes\",\"Iterate on 5 compositions, 10x each\"]}]}]}"));}}),
"[project]/src/data/curriculum/term-2.json (json)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__(JSON.parse("{\"term\":2,\"units\":[{\"title\":\"Anatomy I - The Head\",\"resources\":[{\"type\":\"course\",\"title\":\"Understanding & Painting the Head, Marco Bucci\",\"url\":\"https://marcobucciartstore.com/products/understanding-and-painting-the-head\"},{\"type\":\"youtube\",\"videos\":[{\"title\":\"Proko: The Loomis Method\",\"url\":\"https://www.youtube.com/watch?v=wAOldLWIDSM\"},{\"title\":\"Proko: Portrait Drawing Fundamentals\",\"url\":\"https://www.youtube.com/watch?v=1EPNYWeEf1U&list=PLR2KBLDDnZz0pHBiiyrqlOB3FU-W5XX1k\"},{\"title\":\"Sinix: Anatomy Quick Tips\",\"url\":\"https://www.youtube.com/watch?v=IVbqoy_JEV0&list=PLflflDShjUKH4EfZyf0vuKEuqeqvlV0Qd\"}]},{\"type\":\"course\",\"title\":\"Constructive Head Drawing, Steve Huston\",\"url\":\"https://www.nma.art/courses/constructive-head-drawing/\"},{\"type\":\"course\",\"title\":\"The Frank Reilly Drawing Method, Frank Reilly\",\"url\":\"https://www.nma.art/courses/the-frank-reilly-drawing-method/\"},{\"type\":\"challenge\",\"tasks\":[\"Ahmed Aldoori's 100 Head Challenge\"]}]},{\"title\":\"Perspective II\",\"resources\":[{\"type\":\"course\",\"title\":\"Drawabox.com Lessons 4-7\",\"url\":\"https://drawabox.com/\"},{\"type\":\"youtube\",\"videos\":[{\"title\":\"moderndayjames: Perspective 1\",\"url\":\"https://www.youtube.com/watch?v=nAlCyQqEZSU&list=PLgKJMTFp_25iQVZ6ItpZKTSN9Yo44YSTs&index=6\"},{\"title\":\"moderndayjames: Perspective 2\",\"url\":\"https://www.youtube.com/watch?v=O1tv-6JURJ4&list=PLgKJMTFp_25iQVZ6ItpZKTSN9Yo44YSTs&index=5\"},{\"title\":\"moderndayjames: Perspective 6\",\"url\":\"https://www.youtube.com/watch?v=FF8XgTQmoPg&list=PLgKJMTFp_25iQVZ6ItpZKTSN9Yo44YSTs&index=1\"}]},{\"type\":\"challenge\",\"tasks\":[\"Drawabox.com 100 Treasure Chest Challenge\",\"Rotate 50 boxes and 50 cylinders\"]}]},{\"title\":\"Anatomy II - The Torso\",\"resources\":[{\"type\":\"course\",\"title\":\"Anatomy of the Human Body for Artists (Torso), Proko Premium\",\"url\":\"https://www.proko.com/human-anatomy-for-artists/#.XrVW5RNKh24\"},{\"type\":\"youtube\",\"videos\":[{\"title\":\"Proko: Torso Anatomy Series\",\"url\":\"https://www.youtube.com/watch?v=pDgyQjNFVQk&list=PLtG4P3lq8RHFBeVaruf2JjyQmZJH4__Zv\"}]},{\"type\":\"book\",\"title\":\"Figure Drawing for All It's Worth\",\"author\":\"Andrew Loomis\"},{\"type\":\"book\",\"title\":\"FORCE: Dynamic Life Drawing\",\"author\":\"Mike Mattesi\"},{\"type\":\"course\",\"title\":\"Glenn Vilppu or Steve Huston, w/ New Masters Academy\",\"url\":\"https://www.nma.art/learn/search/instructors/\"},{\"type\":\"challenge\",\"tasks\":[\"100 exaggerated gestures\",\"Draw the gesture of a reference\",\"Mannequinize it\",\"Draw a new exaggerated pose based on mannequin\"]}]}]}"));}}),
"[project]/src/data/curriculum/term-3.json (json)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__(JSON.parse("{\"term\":3,\"units\":[{\"title\":\"Perspective III\",\"resources\":[{\"type\":\"book\",\"title\":\"How to Draw\",\"author\":\"Scott Robertson\"},{\"type\":\"youtube\",\"videos\":[{\"title\":\"moderndayjames: Perspective 3\",\"url\":\"https://www.youtube.com/watch?v=5gBpf47phh0&list=PLgKJMTFp_25iQVZ6ItpZKTSN9Yo44YSTs&index=4\"},{\"title\":\"moderndayjames: Perspective 4\",\"url\":\"https://www.youtube.com/watch?v=03IrOGkbaZc&list=PLgKJMTFp_25iQVZ6ItpZKTSN9Yo44YSTs&index=3\"},{\"title\":\"moderndayjames: Perspective 5\",\"url\":\"https://www.youtube.com/watch?v=2XF5YuAK63I&list=PLgKJMTFp_25iQVZ6ItpZKTSN9Yo44YSTs&index=2\"}]},{\"type\":\"challenge\",\"tasks\":[\"Drawabox.com 25 wheel challenge\",\"Rotate 50 boxes & 50 cylinders\"]}]},{\"title\":\"Anatomy III - arms\",\"resources\":[{\"type\":\"course\",\"title\":\"Anatomy of the Human Body for Artists (Arms), Proko Premium\",\"url\":\"https://www.proko.com/human-anatomy-for-artists/#.XrVW5RNKh24\"},{\"type\":\"youtube\",\"videos\":[{\"title\":\"Proko: Arms Anatomy Series\",\"url\":\"https://www.youtube.com/watch?v=pDgyQjNFVQk&list=PLtG4P3lq8RHFBeVaruf2JjyQmZJH4__Zv\"},{\"title\":\"moderndayjames: Elements of Character\",\"url\":\"https://www.youtube.com/watch?v=xGhYfLQWbp0\"},{\"title\":\"moderndayjames: Anatomy of the Head\",\"url\":\"https://www.youtube.com/watch?v=ERc2xnQpCR4\"},{\"title\":\"moderndayjames: Sketching the Head II\",\"url\":\"https://www.youtube.com/watch?v=enWCcl2fCvw\"}]},{\"type\":\"challenge\",\"tasks\":[\"100 hands\",\"25 rotated heads\"]}]},{\"title\":\"Clothed figure drawing\",\"resources\":[{\"type\":\"course\",\"title\":\"Clothing & Drapery w/ Glenn Vilpu, New Masters Academy\",\"url\":\"https://www.nma.art/videolessons/how-to-draw-clothing-and-drapery/\"},{\"type\":\"youtube\",\"videos\":[{\"title\":\"moderndayjames: Character Sketching I: Cloth & Drapery\",\"url\":\"https://www.youtube.com/watch?v=S1eR1rcPlHc\"},{\"title\":\"moderndayjames: Cloth & Drapery II: Movement in Fabric\",\"url\":\"https://www.youtube.com/watch?v=Wz7SdRoMhT4\"},{\"title\":\"Sinix: Clothing Folds and You\",\"url\":\"https://www.youtube.com/watch?v=vIO4ODhm0tc\"},{\"title\":\"Marc Brunet: How to Paint Folds\",\"url\":\"https://www.youtube.com/watch?v=MHRSPNkGxQo\"}]},{\"type\":\"course\",\"title\":\"Term 3, Clothed Figure Drawing, Cubebrush Artschool\",\"url\":\"https://cubebrush.co/mb/products/mmfwyq/art-school\"},{\"type\":\"challenge\",\"tasks\":[\"30 Day Clothed Figure Gesture Challenge\",\"20 - 30 minutes\",\"5x 1 minute\",\"5x 2 minutes\",\"3x 5 minutes or 1x 10 minutes sketches\"]}]}]}"));}}),
"[project]/src/data/curriculum/term-4.json (json)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__(JSON.parse("{\"term\":4,\"units\":[{\"title\":\"Colour & light I\",\"resources\":[{\"type\":\"book\",\"title\":\"How to Render\",\"author\":\"Scott Robertson\"},{\"type\":\"youtube\",\"videos\":[{\"title\":\"Marco Bucci: Light & Shadow: 10 Minutes to Better Painting\",\"url\":\"https://www.youtube.com/watch?v=xcCJ2CU-bFw&t=68s\"},{\"title\":\"Marco Bucci: Ambient Occlusion 1 & 2\",\"url\":\"https://www.youtube.com/watch?v=7fLV5ezO64w\"},{\"title\":\"Proko: Shading Light & Form\",\"url\":\"https://www.youtube.com/watch?v=V3WmrWUEIJo\"}]},{\"type\":\"course\",\"title\":\"Fundamentals of Light, Sam Nielson\",\"url\":\"https://www.schoolism.com/school.php?id=3\"},{\"type\":\"challenge\",\"tasks\":[\"50 Still-Life Lighting Studies\",\"Examin lighting in drastically different setups\",\"Use a lamp and change the position over the subject\"]}]},{\"title\":\"Perspective IV\",\"resources\":[{\"type\":\"youtube\",\"videos\":[{\"title\":\"moderndayjames: Visual Library I\",\"url\":\"https://www.youtube.com/watch?v=8FzHV2h29zE\"},{\"title\":\"moderndayjames: Visual Library II\",\"url\":\"https://www.youtube.com/watch?v=i5QdhXHXzpk\"},{\"title\":\"moderndayjames: Vehicle Sketching I\",\"url\":\"https://www.youtube.com/watch?v=AXn979hRyIs\"},{\"title\":\"moderndayjames: Vehicle Sketching II\",\"url\":\"https://www.youtube.com/watch?v=2ivOcwlt9Dc\"},{\"title\":\"moderndayjames: Visual Library III - Drawing Mechs\",\"url\":\"https://www.youtube.com/watch?v=li2qw57PqZI\"}]},{\"type\":\"book\",\"title\":\"Framed Perspective I: Technical Perspective and Visual Storytelling\",\"author\":\"Marcos Mateu-Mestre\"},{\"type\":\"course\",\"title\":\"SVSLearn - Drawing Robots & Machinery\",\"url\":\"https://courses.svslearn.com/courses/drawing-robots-and-machinery\"},{\"type\":\"course\",\"title\":\"Term 6, Mech Design, Cubebrush Artschool\",\"url\":\"https://cubebrush.co/mb/products/mmfwyq/art-school\"},{\"type\":\"challenge\",\"tasks\":[\"100 Rotated Objects (based on mdj's Visual Library videos)\",\"or\",\"100 Unique Studies (machinery, vehicles, Plants, Animals)\"]}]},{\"title\":\"Anatomy IV - legs\",\"resources\":[{\"type\":\"course\",\"title\":\"Anatomy of the Human Body for Artists (Legs), Proko Premium\",\"url\":\"https://www.proko.com/human-anatomy-for-artists/#.XrVW5RNKh24\"},{\"type\":\"youtube\",\"videos\":[{\"title\":\"Proko: Legs Anatomy Series\",\"url\":\"https://www.youtube.com/watch?v=pDgyQjNFVQk&list=PLtG4P3lq8RHFBeVaruf2JjyQmZJH4__Zv\"},{\"title\":\"moderndayjames: Elements of Character\",\"url\":\"https://www.youtube.com/watch?v=xGhYfLQWbp0&t=311s\"},{\"title\":\"moderndayjames: Anatomy of the Head\",\"url\":\"https://www.youtube.com/watch?v=ERc2xnQpCR4\"},{\"title\":\"moderndayjames: Sketching the Head II\",\"url\":\"https://www.youtube.com/watch?v=enWCcl2fCvw&t=35s\"}]},{\"type\":\"challenge\",\"tasks\":[\"100 Feet\",\"100 Studies of interacting characters - figure drawings of at least 2 figures interacting in a scene\"]}]}]}"));}}),
"[project]/src/data/curriculum/term-5.json (json)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__(JSON.parse("{\"term\":5,\"units\":[{\"title\":\"Intro to Animals\",\"resources\":[{\"type\":\"book\",\"title\":\"FORCE: Animal Drawing, Mike Matessi\"},{\"type\":\"course\",\"title\":\"Aaron Blaise (Pick One)\",\"options\":[{\"title\":\"Big Cats\",\"url\":\"https://creatureartteacher.com/product/how-to-draw-animals-course-big-cats/\"},{\"title\":\"Bears\",\"url\":\"https://creatureartteacher.com/product/how-to-draw-bears-aaron-blaise/\"},{\"title\":\"Horses\",\"url\":\"https://creatureartteacher.com/product/how-to-draw-horses/\"},{\"title\":\"Wolves, Coyotes, and Foxes\",\"url\":\"https://creatureartteacher.com/product/how-to-draw-wolves-coyotes-foxes/\"}]},{\"type\":\"course\",\"title\":\"Animal Anatomy Bundle, moderndayjames\",\"url\":\"https://gumroad.com/moderndayjames?sort=page_layout\"},{\"type\":\"challenge\",\"tasks\":[\"30-day Gesture Sessions of Animals, changing type each week\",\"4-legged animals\",\"Aquatic animals\",\"Flying animals\",\"Big, small, reptilian, etc.\"]}]},{\"title\":\"Perspective V\",\"resources\":[{\"type\":\"book\",\"title\":\"Framed Perspective II, Marcos Mateu-Mestre\"},{\"type\":\"youtube\",\"videos\":[{\"title\":\"Vehicle Sketching III\",\"url\":\"https://www.youtube.com/watch?v=4Q4rh1gFWGg\"},{\"title\":\"Vehicle Sketching IV\",\"url\":\"https://www.youtube.com/watch?v=sL1f_tBYquE\"},{\"title\":\"Sketching Figures in Extreme Perspective\",\"url\":\"https://www.youtube.com/watch?v=g5gKA7hu7Fc\"}]},{\"type\":\"challenge\",\"tasks\":[\"100 Extreme Perspectives\",\"50 Vehicle Rotation Studies\",\"50 Unique Vehicle Designs\"]}]},{\"title\":\"Colour & Light II\",\"resources\":[{\"type\":\"book\",\"title\":\"Colour and Light, James Gurney\"},{\"type\":\"youtube\",\"videos\":[{\"title\":\"Understanding Colour - Blender Guru\",\"url\":\"https://www.youtube.com/watch?v=Qj1FK8n7WgY\"},{\"title\":\"Lighting Mastery Series - Blender Guru\",\"url\":\"https://www.youtube.com/watch?v=cg1K_ZWB0Uw\"},{\"title\":\"How to Pick Colours That Work - Sycra\",\"url\":\"https://www.youtube.com/watch?v=9kQllLy_X4I\"},{\"title\":\"Where Do Highlights Go? - Colouring w/ Kurt\",\"url\":\"https://www.youtube.com/watch?v=TOj5QLZ8Yxg\"}]},{\"type\":\"course\",\"title\":\"Designing w/ Colour & Light, Nathan Fowkes\",\"url\":\"https://www.schoolism.com/school.php?id=22\"},{\"type\":\"course\",\"title\":\"Painting w/ Light & Colour, Tonko House & Cody Gramstead\",\"url\":\"https://www.schoolism.com/school.php?id=41\"},{\"type\":\"challenge\",\"tasks\":[\"150 Colour Replication Studies\",\"- Environments\",\"- Character Designs\",\"- Movie Frames\",\"or 50 Colour Variation Studies\",\"- 50 subjects, drawn with 3X different colour palettes\"]}]}]}"));}}),
"[project]/src/data/curriculum/term-6.json (json)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__(JSON.parse("{\"term\":6,\"units\":[{\"title\":\"Character design\",\"resources\":[{\"type\":\"course\",\"title\":\"Character Design w/ Aaron Blaise\",\"url\":\"https://creatureartteacher.com/product/character-design-course-aaron-blaise/\"},{\"type\":\"youtube\",\"videos\":[{\"title\":\"Marco Bucci: Character Design Mini Series\",\"url\":\"https://www.youtube.com/watch?v=gI62rHNtg2w\"},{\"title\":\"Sinix: Anatomy Quick Tips\",\"url\":\"https://www.youtube.com/watch?v=IVbqoy_JEV0&list=PLflflDShjUKH4EfZyf0vuKEuqeqvlV0Qd\"}]},{\"type\":\"course\",\"title\":\"Gesture Drawing, Alex Woo\",\"url\":\"https://www.schoolism.com/school.php?id=14\"},{\"type\":\"course\",\"title\":\"Fundamentals of Character Design, Stephen Silver\",\"url\":\"https://www.schoolism.com/school.php?id=10\"},{\"type\":\"course\",\"title\":\"Expressive Characters, Wouter Tulp\",\"url\":\"https://www.schoolism.com/school.php?id=39\"},{\"type\":\"challenge\",\"tasks\":[\"moderndayjames' 100 Expressions Challenge\",\"50 Character Design variation Studies\",\"50 subjects, 3 variations each\"]}]},{\"title\":\"Composition & storytelling II\",\"resources\":[{\"type\":\"course\",\"title\":\"Pictorial Composition w/ Nathan Fowkes, Schoolism\",\"url\":\"https://www.schoolism.com/school.php?id=48\"},{\"type\":\"youtube\",\"videos\":[{\"title\":\"moderndayjames: Composition I\",\"url\":\"https://www.youtube.com/watch?v=wg-So3ElA8g&t=34s\"},{\"title\":\"moderndayjames: Sketching at a Distance\",\"url\":\"https://www.youtube.com/watch?v=aBkT6QSheog\"},{\"title\":\"moderndayjames: WorldBuilding I, II, III\",\"url\":\"https://www.youtube.com/watch?v=19dIqWdgpzY\"}]},{\"type\":\"course\",\"title\":\"Story-Driven Illustrations, Djamilia Knopf\",\"url\":\"https://www.schoolism.com/school.php?id=48\"},{\"type\":\"course\",\"title\":\"Lighting for Story & Concept Art, Sam Nielson\",\"url\":\"https://www.schoolism.com/school.php?id=29\"},{\"type\":\"challenge\",\"tasks\":[\"50 Compositions including figures\",\"2 total variations\",\"Change colour, perspective, and composition\",\"100 environment Colour / Composition Studies\",\"Pick movie shots that tell a story in a single frame\"]}]},{\"title\":\"Perspective VI\",\"resources\":[{\"type\":\"course\",\"title\":\"Krenz Cushart's Gumroad Bundle\",\"url\":\"https://gumroad.com/krenzcushart\"},{\"type\":\"youtube\",\"videos\":[{\"title\":\"moderndayjames: Emulating Even Amundsen Series\",\"url\":\"https://www.youtube.com/watch?v=1VSH32ede6g\"}]},{\"type\":\"challenge\",\"tasks\":[\"Draw 100 figures in perspective\",\"Rotate 50 figures a full 360 degrees\",\"Draw 50 compositions of figures in extreme perspectives\"]}]}]}"));}}),
"[project]/src/pages/index.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/react@19.0.0/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CurriculumCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/CurriculumCard.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$curriculum$2f$term$2d$1$2e$json__$28$json$29$__ = __turbopack_import__("[project]/src/data/curriculum/term-1.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$curriculum$2f$term$2d$2$2e$json__$28$json$29$__ = __turbopack_import__("[project]/src/data/curriculum/term-2.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$curriculum$2f$term$2d$3$2e$json__$28$json$29$__ = __turbopack_import__("[project]/src/data/curriculum/term-3.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$curriculum$2f$term$2d$4$2e$json__$28$json$29$__ = __turbopack_import__("[project]/src/data/curriculum/term-4.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$curriculum$2f$term$2d$5$2e$json__$28$json$29$__ = __turbopack_import__("[project]/src/data/curriculum/term-5.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$curriculum$2f$term$2d$6$2e$json__$28$json$29$__ = __turbopack_import__("[project]/src/data/curriculum/term-6.json (json)");
;
;
;
;
;
;
;
;
;
const Home = ()=>{
    const terms = [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$curriculum$2f$term$2d$1$2e$json__$28$json$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$curriculum$2f$term$2d$2$2e$json__$28$json$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$curriculum$2f$term$2d$3$2e$json__$28$json$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$curriculum$2f$term$2d$4$2e$json__$28$json$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$curriculum$2f$term$2d$5$2e$json__$28$json$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$curriculum$2f$term$2d$6$2e$json__$28$json$29$__["default"]
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$0$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CurriculumCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["CurriculumGrid"], {
            terms: terms
        }, void 0, false, {
            fileName: "[project]/src/pages/index.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/index.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
};
_c = Home;
const __TURBOPACK__default__export__ = Home;
var _c;
__turbopack_refresh__.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_require__("[project]/src/pages/index.tsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}}),
"[project]/src/pages/index (hmr-entry)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_require__("[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__604e5d._.js.map
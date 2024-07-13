// Suncord 26d8010d
// Standalone: false
// Platform: win32
// Updater Disabled: false
"use strict";var $r=Object.create;var je=Object.defineProperty;var Kr=Object.getOwnPropertyDescriptor;var Yr=Object.getOwnPropertyNames;var Jr=Object.getPrototypeOf,qr=Object.prototype.hasOwnProperty;var d=(e,t)=>()=>(e&&(t=e(e=0)),t);var J=(e,t)=>{for(var n in t)je(e,n,{get:t[n],enumerable:!0})},Jt=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of Yr(t))!qr.call(e,r)&&r!==n&&je(e,r,{get:()=>t[r],enumerable:!(i=Kr(t,r))||i.enumerable});return e};var j=(e,t,n)=>(n=e!=null?$r(Jr(e)):{},Jt(t||!e||!e.__esModule?je(n,"default",{value:e,enumerable:!0}):n,e)),ot=e=>Jt(je({},"__esModule",{value:!0}),e);var l=d(()=>{"use strict"});var ke=d(()=>{"use strict";l()});function Pe(e){return async function(){try{return{ok:!0,value:await e(...arguments)}}catch(t){return{ok:!1,error:t instanceof Error?{...t}:t}}}}var qt=d(()=>{"use strict";l()});var ni={};function me(...e){let t={cwd:tn};return st?at("flatpak-spawn",["--host","git",...e],t):at("git",e,t)}async function Xr(){return(await me("remote","get-url","origin")).stdout.trim().replace(/git@(.+):/,"https://$1/").replace(/\.git$/,"")}async function Qr(){await me("fetch");let e=(await me("branch","--show-current")).stdout.trim();if(!((await me("ls-remote","origin",e)).stdout.length>0))return[];let i=(await me("log",`HEAD...origin/${e}`,"--pretty=format:%an/%h/%s")).stdout.trim();return i?i.split(`
`).map(r=>{let[o,a,...s]=r.split("/");return{hash:a,author:o,message:s.join("/").split(`
`)[0]}}):[]}async function ei(){return(await me("pull")).stdout.includes("Fast-forward")}async function ti(){return!(await at(st?"flatpak-spawn":"node",st?["--host","node","scripts/build/build.mjs"]:["scripts/build/build.mjs"],{cwd:tn})).stderr.includes("Build failed")}var Xt,_e,Qt,en,tn,at,st,nn=d(()=>{"use strict";l();ke();Xt=require("child_process"),_e=require("electron"),Qt=require("path"),en=require("util");qt();tn=(0,Qt.join)(__dirname,".."),at=(0,en.promisify)(Xt.execFile),st=!1;_e.ipcMain.handle("SuncordGetRepo",Pe(Xr));_e.ipcMain.handle("SuncordGetUpdates",Pe(Qr));_e.ipcMain.handle("SuncordUpdate",Pe(ei));_e.ipcMain.handle("SuncordBuild",Pe(ti))});var rn=d(()=>{"use strict";l();nn()});var ut={};J(ut,{fetchTrackData:()=>ii});async function lt(e){let{stdout:t}=await ln("osascript",e.map(n=>["-e",n]).flat());return t}function on(e,t){let n=new URL("https://tools.applemediaservices.com/api/apple-media/music/US/search.json");return n.searchParams.set("types",e),n.searchParams.set("limit","1"),n.searchParams.set("term",t),n}async function ri({id:e,name:t,artist:n,album:i}){if(e===L?.id){if("data"in L)return L.data;if("failures"in L&&L.failures>=5)return null}try{let[r,o]=await Promise.all([fetch(on("songs",n+" "+i+" "+t),an).then(f=>f.json()),fetch(on("artists",n.split(/ *[,&] */)[0]),an).then(f=>f.json())]),a=r?.songs?.data[0]?.attributes.url,s=r?.songs?.data[0]?.id?`https://song.link/i/${r?.songs?.data[0]?.id}`:void 0,c=r?.songs?.data[0]?.attributes.artwork.url.replace("{w}","512").replace("{h}","512"),u=o?.artists?.data[0]?.attributes.artwork.url.replace("{w}","512").replace("{h}","512");return L={id:e,data:{appleMusicLink:a,songLink:s,albumArtwork:c,artistArtwork:u}},L.data}catch(r){return console.error("[AppleMusicRichPresence] Failed to fetch remote data:",r),L={id:e,failures:(e===L?.id&&"failures"in L?L.failures:0)+1},null}}async function ii(){try{await ln("pgrep",["^Music$"])}catch{return null}if(await lt(['tell application "Music"',"get player state","end tell"]).then(f=>f.trim())!=="playing")return null;let t=await lt(['tell application "Music"',"get player position","end tell"]).then(f=>Number.parseFloat(f.trim())),n=await lt(['set output to ""','tell application "Music"',"set t_id to database id of current track","set t_name to name of current track","set t_album to album of current track","set t_artist to artist of current track","set t_duration to duration of current track",'set output to "" & t_id & "\\n" & t_name & "\\n" & t_album & "\\n" & t_artist & "\\n" & t_duration',"end tell","return output"]),[i,r,o,a,s]=n.split(`
`).filter(f=>!!f),c=Number.parseFloat(s),u=await ri({id:i,name:r,artist:a,album:o});return{name:r,album:o,artist:a,playerPosition:t,duration:c,...u}}var sn,cn,ln,an,L,un=d(()=>{"use strict";l();sn=require("child_process"),cn=require("util"),ln=(0,cn.promisify)(sn.execFile);an={headers:{"user-agent":"Mozilla/5.0 (Windows NT 10.0; rv:125.0) Gecko/20100101 Firefox/125.0"}},L=null});var ft={};J(ft,{initDevtoolsOpenEagerLoad:()=>oi});function oi(e){let t=()=>e.sender.executeJavaScript("Vencord.Plugins.plugins.ConsoleShortcuts.eagerLoad(true)");e.sender.isDevToolsOpened()?t():e.sender.once("devtools-opened",()=>t())}var fn=d(()=>{"use strict";l()});var Oe,pn=d(()=>{"use strict";l();Oe=class{pathListeners=new Map;globalListeners=new Set;constructor(t,n={}){this.plain=t,this.store=this.makeProxy(t),Object.assign(this,n)}makeProxy(t,n=t,i=""){let r=this;return new Proxy(t,{get(o,a){let s=o[a];return!(a in o)&&r.getDefaultValue&&(s=r.getDefaultValue({target:o,key:a,root:n,path:i})),typeof s=="object"&&s!==null&&!Array.isArray(s)?r.makeProxy(s,n,`${i}${i&&"."}${a}`):s},set(o,a,s){if(o[a]===s)return!0;Reflect.set(o,a,s);let c=`${i}${i&&"."}${a}`;return r.globalListeners.forEach(u=>u(s,c)),r.pathListeners.get(c)?.forEach(u=>u(s)),!0}})}setData(t,n){if(this.readOnly)throw new Error("SettingsStore is read-only");if(this.plain=t,this.store=this.makeProxy(t),n){let i=t,r=n.split(".");for(let o of r){if(!i){console.warn(`Settings#setData: Path ${n} does not exist in new data. Not dispatching update`);return}i=i[o]}this.pathListeners.get(n)?.forEach(o=>o(i))}this.markAsChanged()}addGlobalChangeListener(t){this.globalListeners.add(t)}addChangeListener(t,n){let i=this.pathListeners.get(t)??new Set;i.add(n),this.pathListeners.set(t,i)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}removeChangeListener(t,n){let i=this.pathListeners.get(t);!i||(i.delete(n),i.size||this.pathListeners.delete(t))}markAsChanged(){this.globalListeners.forEach(t=>t(this.plain,""))}}});function pt(e,t){for(let n in t){let i=t[n];typeof i=="object"&&!Array.isArray(i)?(e[n]??={},pt(e[n],i)):e[n]??=i}return e}var gn=d(()=>{"use strict";l()});var dn,q,ve,Ie,X,ye,gt,dt,hn,Fe,ie=d(()=>{"use strict";l();dn=require("electron"),q=require("path"),ve=process.env.SUNCORD_USER_DATA_DIR??(process.env.DISCORD_USER_DATA_DIR?(0,q.join)(process.env.DISCORD_USER_DATA_DIR,"..","SuncordData"):(0,q.join)(dn.app.getPath("userData"),"..","Suncord")),Ie=(0,q.join)(ve,"settings"),X=(0,q.join)(ve,"themes"),ye=(0,q.join)(Ie,"quickCss.css"),gt=(0,q.join)(Ie,"settings.json"),dt=(0,q.join)(Ie,"native-settings.json"),hn=["https:","http:","steam:","spotify:","com.epicgames.launcher:","tidal:","tg:"],Fe=process.argv.includes("--vanilla")});function vn(e,t){try{return JSON.parse((0,oe.readFileSync)(t,"utf-8"))}catch(n){return n?.code!=="ENOENT"&&console.error(`Failed to read ${e} settings`,n),{}}}var Ue,oe,b,ai,In,mn,ae=d(()=>{"use strict";l();ke();pn();gn();Ue=require("electron"),oe=require("fs");ie();(0,oe.mkdirSync)(Ie,{recursive:!0});b=new Oe(vn("renderer",gt));b.addGlobalChangeListener(()=>{try{(0,oe.writeFileSync)(gt,JSON.stringify(b.plain,null,4))}catch(e){console.error("Failed to write renderer settings",e)}});Ue.ipcMain.handle("SuncordGetSettingsDir",()=>Ie);Ue.ipcMain.on("SuncordGetSettings",e=>e.returnValue=b.plain);Ue.ipcMain.handle("SuncordSetSettings",(e,t,n)=>{b.setData(t,n)});ai={plugins:{}},In=vn("native",dt);pt(In,ai);mn=new Oe(In);mn.addGlobalChangeListener(()=>{try{(0,oe.writeFileSync)(dt,JSON.stringify(mn.plain,null,4))}catch(e){console.error("Failed to write native settings",e)}})});var An={};var yn,wn=d(()=>{"use strict";l();ae();yn=require("electron");yn.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(n,{frame:i})=>{i.once("dom-ready",()=>{if(i.url.startsWith("https://open.spotify.com/embed/")){let r=b.store.plugins?.FixSpotifyEmbeds;if(!r?.enabled)return;i.executeJavaScript(`
                    const original = Audio.prototype.play;
                    Audio.prototype.play = function() {
                        this.volume = ${r.volume/100||.1};
                        return original.apply(this, arguments);
                    }
                `)}})})})});var Sn={};var Cn,Tn=d(()=>{"use strict";l();ae();Cn=require("electron");Cn.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(n,{frame:i})=>{i.once("dom-ready",()=>{if(i.url.startsWith("https://www.youtube.com/")){if(!b.store.plugins?.FixYoutubeEmbeds?.enabled)return;i.executeJavaScript(`
                new MutationObserver(() => {
                    if(
                        document.querySelector('div.ytp-error-content-wrap-subreason a[href*="www.youtube.com/watch?v="]')
                    ) location.reload()
                }).observe(document.body, { childList: true, subtree:true });
                `)}})})})});var ht={};J(ht,{resolveRedirect:()=>ci});function bn(e){return new Promise((t,n)=>{let i=(0,xn.request)(new URL(e),{method:"HEAD"},r=>{t(r.headers.location?bn(r.headers.location):e)});i.on("error",n),i.end()})}async function ci(e,t){return si.test(t)?bn(t):t}var xn,si,En=d(()=>{"use strict";l();xn=require("https"),si=/^https:\/\/(spotify\.link|s\.team)\/.+$/});var mt={};J(mt,{readRecording:()=>li});async function li(e,t){t=(0,Re.normalize)(t);let n=(0,Re.basename)(t),i=(0,Re.normalize)(Dn.app.getPath("userData")+"/");if(console.log(n,i,t),n!=="recording.ogg"||!t.startsWith(i))return null;try{let r=await(0,kn.readFile)(t);return new Uint8Array(r.buffer)}catch{return null}}var Dn,kn,Re,Pn=d(()=>{"use strict";l();Dn=require("electron"),kn=require("fs/promises"),Re=require("path")});var _n,On=d(()=>{l();_n=`/* eslint-disable */

/**
 * This file is part of AdGuard's Block YouTube Ads (https://github.com/AdguardTeam/BlockYouTubeAdsShortcut).
 *
 * Copyright (C) AdGuard Team
 *
 * AdGuard's Block YouTube Ads is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * AdGuard's Block YouTube Ads is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with AdGuard's Block YouTube Ads.  If not, see <http://www.gnu.org/licenses/>.
 */

const LOGO_ID = "block-youtube-ads-logo";
const hiddenCSS = [
    "#__ffYoutube1",
    "#__ffYoutube2",
    "#__ffYoutube3",
    "#__ffYoutube4",
    "#feed-pyv-container",
    "#feedmodule-PRO",
    "#homepage-chrome-side-promo",
    "#merch-shelf",
    "#offer-module",
    '#pla-shelf > ytd-pla-shelf-renderer[class="style-scope ytd-watch"]',
    "#pla-shelf",
    "#premium-yva",
    "#promo-info",
    "#promo-list",
    "#promotion-shelf",
    "#related > ytd-watch-next-secondary-results-renderer > #items > ytd-compact-promoted-video-renderer.ytd-watch-next-secondary-results-renderer",
    "#search-pva",
    "#shelf-pyv-container",
    "#video-masthead",
    "#watch-branded-actions",
    "#watch-buy-urls",
    "#watch-channel-brand-div",
    "#watch7-branded-banner",
    "#YtKevlarVisibilityIdentifier",
    "#YtSparklesVisibilityIdentifier",
    ".carousel-offer-url-container",
    ".companion-ad-container",
    ".GoogleActiveViewElement",
    '.list-view[style="margin: 7px 0pt;"]',
    ".promoted-sparkles-text-search-root-container",
    ".promoted-videos",
    ".searchView.list-view",
    ".sparkles-light-cta",
    ".watch-extra-info-column",
    ".watch-extra-info-right",
    ".ytd-carousel-ad-renderer",
    ".ytd-compact-promoted-video-renderer",
    ".ytd-companion-slot-renderer",
    ".ytd-merch-shelf-renderer",
    ".ytd-player-legacy-desktop-watch-ads-renderer",
    ".ytd-promoted-sparkles-text-search-renderer",
    ".ytd-promoted-video-renderer",
    ".ytd-search-pyv-renderer",
    ".ytd-video-masthead-ad-v3-renderer",
    ".ytp-ad-action-interstitial-background-container",
    ".ytp-ad-action-interstitial-slot",
    ".ytp-ad-image-overlay",
    ".ytp-ad-overlay-container",
    ".ytp-ad-progress",
    ".ytp-ad-progress-list",
    '[class*="ytd-display-ad-"]',
    '[layout*="display-ad-"]',
    'a[href^="http://www.youtube.com/cthru?"]',
    'a[href^="https://www.youtube.com/cthru?"]',
    "ytd-action-companion-ad-renderer",
    "ytd-banner-promo-renderer",
    "ytd-compact-promoted-video-renderer",
    "ytd-companion-slot-renderer",
    "ytd-display-ad-renderer",
    "ytd-promoted-sparkles-text-search-renderer",
    "ytd-promoted-sparkles-web-renderer",
    "ytd-search-pyv-renderer",
    "ytd-single-option-survey-renderer",
    "ytd-video-masthead-ad-advertiser-info-renderer",
    "ytd-video-masthead-ad-v3-renderer",
    "YTM-PROMOTED-VIDEO-RENDERER",
];
/**
* Adds CSS to the page
*/
const hideElements = () => {
    const selectors = hiddenCSS;
    if (!selectors) {
        return;
    }
    const rule = selectors.join(", ") + " { display: none!important; }";
    const style = document.createElement("style");
    style.innerHTML = rule;
    document.head.appendChild(style);
};
/**
* Calls the "callback" function on every DOM change, but not for the tracked events
* @param {Function} callback callback function
*/
const observeDomChanges = callback => {
    const domMutationObserver = new MutationObserver(mutations => {
        callback(mutations);
    });
    domMutationObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
};
/**
* This function is supposed to be called on every DOM change
*/
const hideDynamicAds = () => {
    const elements = document.querySelectorAll("#contents > ytd-rich-item-renderer ytd-display-ad-renderer");
    if (elements.length === 0) {
        return;
    }
    elements.forEach(el => {
        if (el.parentNode && el.parentNode.parentNode) {
            const parent = el.parentNode.parentNode;
            if (parent.localName === "ytd-rich-item-renderer") {
                parent.style.display = "none";
            }
        }
    });
};
/**
* This function checks if the video ads are currently running
* and auto-clicks the skip button.
*/
const autoSkipAds = () => {
    // If there's a video that plays the ad at this moment, scroll this ad
    if (document.querySelector(".ad-showing")) {
        const video = document.querySelector("video");
        if (video && video.duration) {
            video.currentTime = video.duration;
            // Skip button should appear after that,
            // now simply click it automatically
            setTimeout(() => {
                const skipBtn = document.querySelector("button.ytp-ad-skip-button");
                if (skipBtn) {
                    skipBtn.click();
                }
            }, 100);
        }
    }
};
/**
* This function overrides a property on the specified object.
*
* @param {object} obj object to look for properties in
* @param {string} propertyName property to override
* @param {*} overrideValue value to set
*/
const overrideObject = (obj, propertyName, overrideValue) => {
    if (!obj) {
        return false;
    }
    let overriden = false;
    for (const key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key) && key === propertyName) {
            obj[key] = overrideValue;
            overriden = true;
            // eslint-disable-next-line no-prototype-builtins
        } else if (obj.hasOwnProperty(key) && typeof obj[key] === "object") {
            if (overrideObject(obj[key], propertyName, overrideValue)) {
                overriden = true;
            }
        }
    }
    return overriden;
};
/**
* Overrides JSON.parse and Response.json functions.
* Examines these functions arguments, looks for properties with the specified name there
* and if it exists, changes it's value to what was specified.
*
* @param {string} propertyName name of the property
* @param {*} overrideValue new value for the property
*/
const jsonOverride = (propertyName, overrideValue) => {
    const nativeJSONParse = JSON.parse;
    JSON.parse = (...args) => {
        const obj = nativeJSONParse.apply(this, args);
        // Override it's props and return back to the caller
        overrideObject(obj, propertyName, overrideValue);
        return obj;
    };
    // Override Response.prototype.json
    const nativeResponseJson = Response.prototype.json;
    Response.prototype.json = new Proxy(nativeResponseJson, {
        apply(...args) {
            // Call the target function, get the original Promise
            const promise = Reflect.apply(...args);
            // Create a new one and override the JSON inside
            return new Promise((resolve, reject) => {
                promise.then(data => {
                    overrideObject(data, propertyName, overrideValue);
                    resolve(data);
                }).catch(error => reject(error));
            });
        },
    });
};
const addAdGuardLogoStyle = () => { };
const addAdGuardLogo = () => {
    if (document.getElementById(LOGO_ID)) {
        return;
    }
    const logo = document.createElement("span");
    logo.innerHTML = "__logo_text__";
    logo.setAttribute("id", LOGO_ID);
    if (window.location.hostname === "m.youtube.com") {
        const btn = document.querySelector("header.mobile-topbar-header > button");
        if (btn) {
            btn.parentNode?.insertBefore(logo, btn.nextSibling);
            addAdGuardLogoStyle();
        }
    } else if (window.location.hostname === "www.youtube.com") {
        const code = document.getElementById("country-code");
        if (code) {
            code.innerHTML = "";
            code.appendChild(logo);
            addAdGuardLogoStyle();
        }
    } else if (window.location.hostname === "music.youtube.com") {
        const el = document.querySelector(".ytmusic-nav-bar#left-content");
        if (el) {
            el.appendChild(logo);
            addAdGuardLogoStyle();
        }
    } else if (window.location.hostname === "www.youtube-nocookie.com") {
        const code = document.querySelector("#yt-masthead #logo-container .content-region");
        if (code) {
            code.innerHTML = "";
            code.appendChild(logo);
            addAdGuardLogoStyle();
        }
    }
};
// Removes ads metadata from YouTube XHR requests
jsonOverride("adPlacements", []);
jsonOverride("playerAds", []);
// Applies CSS that hides YouTube ad elements
hideElements();
// Some changes should be re-evaluated on every page change
addAdGuardLogo();
hideDynamicAds();
autoSkipAds();
observeDomChanges(() => {
    addAdGuardLogo();
    hideDynamicAds();
    autoSkipAds();
});`});var Mn={};var Rn,Ln=d(()=>{"use strict";l();ae();Rn=require("electron");On();Rn.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(n,{frame:i})=>{i.once("dom-ready",()=>{if(i.url.includes("discordsays")&&i.url.includes("youtube.com")){if(!b.store.plugins?.WatchTogetherAdblock?.enabled)return;i.executeJavaScript(_n)}})})})});var vt={};J(vt,{sendToOverlay:()=>ui});function ui(e,t){t.icon=Buffer.from(t.icon).toString("base64");let n=JSON.stringify(t);Nn??=(0,Gn.createSocket)("udp4"),Nn.send(n,42069,"127.0.0.1")}var Gn,Nn,jn=d(()=>{"use strict";l();Gn=require("dgram")});var At={};J(At,{checkffmpeg:()=>Ai,checkytdlp:()=>wi,execute:()=>yi,getStdout:()=>Si,interrupt:()=>Ci,isFfmpegAvailable:()=>xi,isYtdlpAvailable:()=>Ti,start:()=>pi,stop:()=>gi});function Bn(e){H(`Executing yt-dlp with args: ["${e.map(n=>n.replace('"','\\"')).join('", "')}"]`);let t="";return new Promise((n,i)=>{Ae=(0,ee.spawn)("yt-dlp",e,{cwd:Ze()}),Ae.stdout.on("data",r=>Be(r)),Ae.stderr.on("data",r=>{Be(r),zn(`yt-dlp encountered an error: ${r}`),t+=r}),Ae.on("exit",r=>{Ae=null,r===0?n(Q):i(new Error(t||`yt-dlp exited with code ${r}`))})})}function fi(e){H(`Executing ffmpeg with args: ["${e.map(n=>n.replace('"','\\"')).join('", "')}"]`);let t="";return new Promise((n,i)=>{we=(0,ee.spawn)("ffmpeg",e,{cwd:Ze()}),we.stdout.on("data",r=>Be(r)),we.stderr.on("data",r=>{Be(r),zn(`ffmpeg encountered an error: ${r}`),t+=r}),we.on("exit",r=>{we=null,r===0?n(Q):i(new Error(t||`ffmpeg exited with code ${r}`))})})}async function pi(e,t){return t||=w.mkdtempSync(yt.default.join(Fn.default.tmpdir(),"vencord_mediaDownloader_")),w.existsSync(t)||w.mkdirSync(t,{recursive:!0}),V=t,H("Using workdir: ",V),V}async function gi(e){V&&(H("Cleaning up workdir"),w.rmSync(V,{recursive:!0}),V=null)}async function di(e){Q="";let t=JSON.parse(await Bn(["-J",e.url,"--no-warnings"]));if(t.is_live)throw"Live streams are not supported.";return Q="",{videoTitle:`${t.title||"video"} (${t.id})`}}function hi({videoTitle:e},{maxFileSize:t,format:n}){let i=!!t,r=i?t*.8:0,o=i?t*.2:0,a={noFfmpeg:"ba[ext=mp3]{TOT_SIZE}/wa[ext=mp3]{TOT_SIZE}",ffmpeg:"ba*{TOT_SIZE}/ba{TOT_SIZE}/wa*{TOT_SIZE}/ba*"},s={noFfmpeg:"b{TOT_SIZE}{HEIGHT}[ext=webm]/b{TOT_SIZE}{HEIGHT}[ext=mp4]/w{HEIGHT}{TOT_SIZE}",ffmpeg:"b*{VID_SIZE}{HEIGHT}+ba{AUD_SIZE}/b{TOT_SIZE}{HEIGHT}/b*{HEIGHT}+ba"},c={ffmpeg:"bv{TOT_SIZE}/wv{TOT_SIZE}"},u;switch(n){case"audio":u=a;break;case"gif":u=c;break;case"video":default:u=s;break}let f=(ce?u.ffmpeg:u.noFfmpeg)?.replaceAll("{TOT_SIZE}",i?`[filesize<${t}]`:"").replaceAll("{VID_SIZE}",i?`[filesize<${r}]`:"").replaceAll("{AUD_SIZE}",i?`[filesize<${o}]`:"").replaceAll("{HEIGHT}","[height<=1080]");if(!f)throw"Gif format is only supported with ffmpeg.";return H("Video formated calculated as ",f),H(`Based on: format=${n}, maxFileSize=${t}, ffmpegAvailable=${ce}`),{format:f,videoTitle:e}}async function mi({format:e,videoTitle:t},{ytdlpArgs:n,url:i,format:r}){Un();let o=["-f",e,"-o","download.%(ext)s","--force-overwrites","-I","1"],a=ce?r==="video"?["--remux-video","webm>webm/mp4"]:r==="audio"?["--extract-audio","--audio-format","mp3"]:[]:[],s=n?.filter(Boolean)||[];await Bn([i,...o,...a,...s]);let c=w.readdirSync(Ze()).find(u=>u.startsWith("download."));if(!c)throw"No video file was found!";return{file:c,videoTitle:t}}async function vi({file:e,videoTitle:t},{ffmpegArgs:n,format:i,maxFileSize:r,gifQuality:o}){let a=e.split(".").pop();if(!ce)return H("Skipping remux, ffmpeg is unavailable."),{file:e,videoTitle:t,extension:a};let s=["mp3","mp4","webm"],c=w.statSync(se(e)).size,u=n?.filter(Boolean)||[],f=s.includes(a??""),v=!r||c<=r,D=u.length>0;if(f&&v&&!D&&!(i==="gif"))return H("Skipping remux, file type and size are good, and no ffmpeg arguments were specified."),{file:e,videoTitle:t,extension:a};let $=parseFloat((0,ee.execFileSync)("ffprobe",["-v","error","-show_entries","format=duration","-of","default=noprint_wrappers=1:nokey=1",se(e)]).toString());if(isNaN($))throw"Failed to get video duration.";let m=~~((r?r*7/$:9999999)/1024),y,S;switch(i){case"audio":y=["-i",se(e),"-b:a",`${m}k`,"-maxrate",`${m}k`,"-bufsize","1M","-y"],S="mp3";break;case"video":default:let G=m<=100?480:m<=500?720:1080;y=["-i",se(e),"-b:v",`${~~(m*.8)}k`,"-b:a",`${~~(m*.2)}k`,"-maxrate",`${m}k`,"-bufsize","1M","-y","-filter:v",`scale=-1:${G}`],S="mp4";break;case"gif":let k,_,x,O;switch(o){case 1:k=5,_=360,x=24,O=5;break;case 2:k=10,_=420,x=32,O=5;break;default:case 3:k=15,_=480,x=64,O=4;break;case 4:k=20,_=540,x=64,O=3;break;case 5:k=30,_=720,x=128,O=1;break}y=["-i",se(e),"-vf",`fps=${k},scale=w=${_}:h=-1:flags=lanczos,mpdecimate,split[s0][s1];[s0]palettegen=max_colors=${x}[p];[s1][p]paletteuse=dither=bayer:bayer_scale=${O}`,"-loop","0","-bufsize","1M","-y"],S="gif";break}return await fi([...y,...u,`remux.${S}`]),{file:`remux.${S}`,videoTitle:t,extension:S}}function Ii({file:e,videoTitle:t,extension:n}){if(!n)throw"Invalid extension.";return{buffer:w.readFileSync(se(e)),title:`${t}.${n}`}}async function yi(e,t){ze="";try{let n=await di(t),i=hi(n,t),r=await mi(i,t),o=await vi(r,t),a=Ii(o);return{logs:ze,...a}}catch(n){return{error:n.toString(),logs:ze}}}function Ai(e){try{return(0,ee.execFileSync)("ffmpeg",["-version"]),(0,ee.execFileSync)("ffprobe",["-version"]),ce=!0,!0}catch{return ce=!1,!1}}async function wi(e){try{return(0,ee.execFileSync)("yt-dlp",["--version"]),It=!0,!0}catch{return It=!1,!1}}async function Ci(e){H("Interrupting..."),Ae?.kill(),we?.kill(),Un()}var ee,w,Fn,yt,V,Q,ze,It,ce,Ae,we,Ze,se,Un,Be,H,zn,Si,Ti,xi,Zn=d(()=>{"use strict";l();ee=require("child_process"),w=j(require("fs")),Fn=j(require("os")),yt=j(require("path")),V=null,Q="",ze="",It=!1,ce=!1,Ae=null,we=null,Ze=()=>V??process.cwd(),se=e=>yt.default.join(Ze(),e),Un=()=>{!V||w.readdirSync(V).filter(e=>e.startsWith("download.")||e.startsWith("remux.")).forEach(e=>w.unlinkSync(se(e)))},Be=e=>(Q+=e,Q=Q.replace(/^.*\r([^\n])/gm,"$1")),H=(...e)=>(console.log(`[Plugin:MediaDownloader] ${e.join(" ")}`),ze+=`[Plugin:MediaDownloader] ${e.join(" ")}
`),zn=(...e)=>console.error(`[Plugin:MediaDownloader] [ERROR] ${e.join(" ")}`);Si=()=>Q,Ti=()=>It,xi=()=>ce});var Ve,Vn=d(()=>{"use strict";l();Ve=class{constructor(t=1/0){this.maxSize=t}queue=[];promise;next(){let t=this.queue.shift();t?this.promise=Promise.resolve().then(t).finally(()=>this.next()):this.promise=void 0}run(){this.promise||this.next()}push(t){this.size>=this.maxSize&&this.queue.shift(),this.queue.push(t),this.run()}unshift(t){this.size>=this.maxSize&&this.queue.pop(),this.queue.unshift(t),this.run()}get size(){return this.queue.length}}});async function bi(e){try{return await(0,He.access)(e),!0}catch{return!1}}async function Ce(e){await bi(e)||await(0,He.mkdir)(e)}function wt(e){return Hn.default.parse(e).name}var He,Hn,Ct=d(()=>{"use strict";l();He=require("fs/promises"),Hn=j(require("path"))});async function We(){try{let e=await St.default.readFile(await $n(),"utf8");return JSON.parse(e)}catch{let t={logsDir:await te(),imageCacheDir:await Me()};try{await Tt(t)}catch{}return t}}async function Tt(e){!e||await St.default.writeFile(await $n(),JSON.stringify(e,null,4),"utf8")}async function $n(){let e=await te();return await Ce(e),Wn.default.join(e,"mlSettings.json")}var St,Wn,Kn=d(()=>{"use strict";l();St=j(require("fs/promises")),Wn=j(require("path"));xt();Ct()});var Dt={};J(Dt,{chooseDir:()=>Li,deleteFileNative:()=>_i,getDefaultNativeDataDir:()=>te,getDefaultNativeImageDir:()=>Me,getImageNative:()=>ki,getLogsFromFs:()=>Ri,getNativeSavedImages:()=>Di,getSettings:()=>We,init:()=>Xn,initDirs:()=>qn,messageLoggerEnhancedUniqueIdThingyIdkMan:()=>Ei,showItemInFolder:()=>Ni,writeImageNative:()=>Pi,writeLogs:()=>Mi});function Ei(){}async function qn(){let{logsDir:e,imageCacheDir:t}=await We();bt=e||await te(),Et=t||await Me()}async function Xn(e){let t=await Yn();await Ce(t);let n=await(0,F.readdir)(t);for(let i of n){let r=wt(i);Se.set(r,le.default.join(t,i))}}async function ki(e,t){let n=Se.get(t);return n?await(0,F.readFile)(n):null}async function Pi(e,t,n){if(!t||!n)return;let i=await Yn(),r=wt(t);if(Se.get(r))return;let a=le.default.join(i,t);await Ce(i),await(0,F.writeFile)(a,n),Se.set(r,a)}async function _i(e,t){let n=Se.get(t);!n||await(0,F.unlink)(n)}async function Ri(e){let t=await Jn();await Ce(t);try{return JSON.parse(await(0,F.readFile)(le.default.join(t,Qn),"utf-8"))}catch{}return null}async function Mi(e,t){let n=await Jn();Oi.push(()=>(0,F.writeFile)(le.default.join(n,Qn),t))}async function Me(){return le.default.join(await te(),"savedImages")}async function te(){return le.default.join(ve,"MessageLoggerData")}async function Li(e,t){let n=await We(),i=n[t]||await te(),o=(await $e.dialog.showOpenDialog({properties:["openDirectory"],defaultPath:i})).filePaths[0];if(!o)throw Error("Invalid Directory");switch(n[t]=o,await Tt(n),t){case"logsDir":bt=o;break;case"imageCacheDir":Et=o;break}return t==="imageCacheDir"&&await Xn(e),o}async function Ni(e,t){$e.shell.showItemInFolder(t)}var F,le,$e,Se,Di,bt,Et,Yn,Jn,Qn,Oi,xt=d(()=>{"use strict";l();F=require("node:fs/promises"),le=j(require("node:path"));Vn();$e=require("electron");ie();Kn();Ct();Se=new Map,Di=()=>Se,Yn=async()=>Et??await Me(),Jn=async()=>bt??await te();qn();Qn="message-logger-logs.json",Oi=new Ve});var kt={};J(kt,{downloadTheme:()=>Fi,getThemesDir:()=>ji,themeExists:()=>Gi});async function Gi(e,t,n){return(0,Ke.existsSync)((0,Ye.join)(t.toString(),`${n.name}.theme.css`))}function ji(e,t,n){return(0,Ye.join)(t.toString(),`${n.name}.theme.css`)}async function Fi(e,t,n){if(!n.content||!n.name)return;let i=(0,Ye.join)(t.toString(),`${n.name}.theme.css`);(0,Ke.writeFileSync)(i,Buffer.from(n.content,"base64"))}var Ke,Ye,er=d(()=>{"use strict";l();Ke=require("fs"),Ye=require("path")});var tr,nr=d(()=>{l();un();fn();wn();Tn();En();Pn();Ln();jn();Zn();xt();er();tr={AppleMusicRichPresence:ut,ConsoleShortcuts:ft,FixSpotifyEmbeds:An,FixYoutubeEmbeds:Sn,OpenInApp:ht,VoiceMessages:mt,WatchTogetherAdblock:Mn,XSOverlay:vt,MediaDownloader:At,MessageLoggerEnhanced:Dt,ThemeLibrary:kt}});var Pt,rr,ir=d(()=>{"use strict";l();ke();Pt=require("electron");nr();rr={};for(let[e,t]of Object.entries(tr)){let n=Object.entries(t);if(!n.length)continue;let i=rr[e]={};for(let[r,o]of n){let a=`VencordPluginNative_${e}_${r}`;Pt.ipcMain.handle(a,o),i[r]=a}}Pt.ipcMain.on("SuncordGetPluginIpcMethodMap",e=>{e.returnValue=rr})});function _t(e,t=300){let n;return function(...i){clearTimeout(n),n=setTimeout(()=>{e(...i)},t)}}var or=d(()=>{"use strict";l()});var ar,sr=d(()=>{l();ar="PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KICAgIDxoZWFkPgogICAgICAgIDxtZXRhIGNoYXJzZXQ9InV0Zi04IiAvPgogICAgICAgIDx0aXRsZT5TdW5jb3JkIFF1aWNrQ1NTIEVkaXRvcjwvdGl0bGU+CiAgICAgICAgPGxpbmsKICAgICAgICAgICAgcmVsPSJzdHlsZXNoZWV0IgogICAgICAgICAgICBocmVmPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL21vbmFjby1lZGl0b3JAMC41MC4wL21pbi92cy9lZGl0b3IvZWRpdG9yLm1haW4uY3NzIgogICAgICAgICAgICBpbnRlZ3JpdHk9InNoYTI1Ni10aUpQUTJPMDR6L3BaL0F3ZHlJZ2hyT016ZXdmK1BJdkVsMVlLYlF2c1prPSIKICAgICAgICAgICAgY3Jvc3NvcmlnaW49ImFub255bW91cyIKICAgICAgICAgICAgcmVmZXJyZXJwb2xpY3k9Im5vLXJlZmVycmVyIgogICAgICAgIC8+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICBodG1sLAogICAgICAgICAgICBib2R5LAogICAgICAgICAgICAjY29udGFpbmVyIHsKICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsKICAgICAgICAgICAgICAgIGxlZnQ6IDA7CiAgICAgICAgICAgICAgICB0b3A6IDA7CiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTsKICAgICAgICAgICAgICAgIGhlaWdodDogMTAwJTsKICAgICAgICAgICAgICAgIG1hcmdpbjogMDsKICAgICAgICAgICAgICAgIHBhZGRpbmc6IDA7CiAgICAgICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuOwogICAgICAgICAgICB9CiAgICAgICAgPC9zdHlsZT4KICAgIDwvaGVhZD4KCiAgICA8Ym9keT4KICAgICAgICA8ZGl2IGlkPSJjb250YWluZXIiPjwvZGl2PgogICAgICAgIDxzY3JpcHQKICAgICAgICAgICAgc3JjPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL21vbmFjby1lZGl0b3JAMC41MC4wL21pbi92cy9sb2FkZXIuanMiCiAgICAgICAgICAgIGludGVncml0eT0ic2hhMjU2LUtjVTQ4VEdyODRyN3VuRjdKNUlnQm85NWFlVnJFYnJHZTA0UzdUY0ZVanM9IgogICAgICAgICAgICBjcm9zc29yaWdpbj0iYW5vbnltb3VzIgogICAgICAgICAgICByZWZlcnJlcnBvbGljeT0ibm8tcmVmZXJyZXIiCiAgICAgICAgPjwvc2NyaXB0PgoKICAgICAgICA8c2NyaXB0PgogICAgICAgICAgICByZXF1aXJlLmNvbmZpZyh7CiAgICAgICAgICAgICAgICBwYXRoczogewogICAgICAgICAgICAgICAgICAgIHZzOiAiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9tb25hY28tZWRpdG9yQDAuNTAuMC9taW4vdnMiLAogICAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgfSk7CgogICAgICAgICAgICByZXF1aXJlKFsidnMvZWRpdG9yL2VkaXRvci5tYWluIl0sICgpID0+IHsKICAgICAgICAgICAgICAgIGdldEN1cnJlbnRDc3MoKS50aGVuKChjc3MpID0+IHsKICAgICAgICAgICAgICAgICAgICB2YXIgZWRpdG9yID0gbW9uYWNvLmVkaXRvci5jcmVhdGUoCiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJjb250YWluZXIiKSwKICAgICAgICAgICAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGNzcywKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlOiAiY3NzIiwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lOiBnZXRUaGVtZSgpLAogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgKTsKICAgICAgICAgICAgICAgICAgICBlZGl0b3Iub25EaWRDaGFuZ2VNb2RlbENvbnRlbnQoKCkgPT4KICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q3NzKGVkaXRvci5nZXRWYWx1ZSgpKQogICAgICAgICAgICAgICAgICAgICk7CiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoInJlc2l6ZSIsICgpID0+IHsKICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBtb25hY28gcmUtbGF5b3V0CiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvci5sYXlvdXQoKTsKICAgICAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICB9KTsKICAgICAgICA8L3NjcmlwdD4KICAgIDwvYm9keT4KPC9odG1sPgo="});function Ot(e,t={}){return{fileName:e,name:t.name??e.replace(/\.css$/i,""),author:t.author??"Unknown Author",description:t.description??"A Discord Theme.",version:t.version,license:t.license,source:t.source,website:t.website,invite:t.invite}}function cr(e){return e.charCodeAt(0)===65279&&(e=e.slice(1)),e}function lr(e,t){if(!e)return Ot(t);let n=e.split("/**",2)?.[1]?.split("*/",1)?.[0];if(!n)return Ot(t);let i={},r="",o="";for(let a of n.split(Ui))if(a.length!==0)if(a.charAt(0)==="@"&&a.charAt(1)!==" "){i[r]=o.trim();let s=a.indexOf(" ");r=a.substring(1,s),o=a.substring(s+1)}else o+=" "+a.replace("\\n",`
`).replace(zi,"@");return i[r]=o.trim(),delete i[""],Ot(t,i)}var Ui,zi,ur=d(()=>{"use strict";l();Ui=/[^\S\r\n]*?\r?(?:\r\n|\n)[^\S\r\n]*?\*[^\S\r\n]?/,zi=/^\\@/});function pr(e){e.webContents.setWindowOpenHandler(({url:t})=>{switch(t){case"about:blank":case"https://discord.com/popout":case"https://ptb.discord.com/popout":case"https://canary.discord.com/popout":return{action:"allow"}}try{var{protocol:n}=new URL(t)}catch{return{action:"deny"}}switch(n){case"http:":case"https:":case"mailto:":case"steam:":case"spotify:":fr.shell.openExternal(t)}return{action:"deny"}})}var fr,gr=d(()=>{"use strict";l();fr=require("electron")});function Rt(e,t){let n=(0,Te.normalize)(e),i=(0,Te.join)(e,t),r=(0,Te.normalize)(i);return r.startsWith(n)?r:null}function dr(){return(0,fe.readFile)(ye,"utf-8").catch(()=>"")}async function Bi(){let e=await(0,fe.readdir)(X).catch(()=>[]),t=[];for(let n of e){if(!n.endsWith(".css"))continue;let i=await hr(n).then(cr).catch(()=>null);i!=null&&t.push(lr(i,n))}return t}function hr(e){e=e.replace(/\?v=\d+$/,"");let t=Rt(X,e);return t?(0,fe.readFile)(t,"utf-8"):Promise.reject(`Unsafe path ${e}`)}function mr(e){let t;(0,fe.open)(ye,"a+").then(i=>{i.close(),t=(0,ue.watch)(ye,{persistent:!1},_t(async()=>{e.webContents.postMessage("SuncordQuickCssUpdate",await dr())},50))}).catch(()=>{});let n=(0,ue.watch)(X,{persistent:!1},_t(()=>{e.webContents.postMessage("SuncordThemeUpdate",void 0)}));e.once("closed",()=>{t?.close(),n.close()})}var I,ue,fe,Te,Mt=d(()=>{"use strict";l();rn();ir();ae();or();ke();I=require("electron");sr();ue=require("fs"),fe=require("fs/promises"),Te=require("path");ur();ie();gr();(0,ue.mkdirSync)(X,{recursive:!0});I.ipcMain.handle("SuncordOpenQuickCss",()=>I.shell.openPath(ye));I.ipcMain.handle("SuncordOpenExternal",(e,t)=>{try{var{protocol:n}=new URL(t)}catch{throw"Malformed URL"}if(!hn.includes(n))throw"Disallowed protocol.";I.shell.openExternal(t)});I.ipcMain.handle("SuncordGetQuickCss",()=>dr());I.ipcMain.handle("SuncordSetQuickCss",(e,t)=>(0,ue.writeFileSync)(ye,t));I.ipcMain.handle("SuncordGetThemesDir",()=>X);I.ipcMain.handle("SuncordGetThemesList",()=>Bi());I.ipcMain.handle("SuncordGetThemeData",(e,t)=>hr(t));I.ipcMain.handle("SuncordGetThemeSystemValues",()=>({"os-accent-color":`#${I.systemPreferences.getAccentColor?.()||""}`}));I.ipcMain.handle("SuncordOpenMonacoEditor",async()=>{let e="Suncord QuickCSS Editor",t=I.BrowserWindow.getAllWindows().find(i=>i.title===e);if(t&&!t.isDestroyed()){t.focus();return}let n=new I.BrowserWindow({title:e,autoHideMenuBar:!0,darkTheme:!0,webPreferences:{preload:(0,Te.join)(__dirname,"preload.js"),contextIsolation:!0,nodeIntegration:!1,sandbox:!1}});pr(n),await n.loadURL(`data:text/html;base64,${ar}`)})});function Fr(e,t,n){let i=t;if(t in e)return void n(e[i]);Object.defineProperty(e,t,{set(r){delete e[i],e[i]=r,n(r)},configurable:!0,enumerable:!1})}var Ur=d(()=>{"use strict";l()});var uo={};function co(e,t){let n=e.slice(4).split(".").map(Number),i=t.slice(4).split(".").map(Number);for(let r=0;r<i.length;r++){if(n[r]>i[r])return!0;if(n[r]<i[r])return!1}return!1}function lo(){if(!process.env.DISABLE_UPDATER_AUTO_PATCHING)try{let e=(0,M.dirname)(process.execPath),t=(0,M.basename)(e),n=(0,M.join)(e,".."),i=(0,P.readdirSync)(n).reduce((s,c)=>c.startsWith("app-")&&co(c,s)?c:s,t);if(i===t)return;let r=(0,M.join)(n,i,"resources"),o=(0,M.join)(r,"app.asar"),a=(0,M.join)(r,"_app.asar");if(!(0,P.existsSync)(o)||(0,P.statSync)(o).isDirectory())return;console.info("[Suncord] Detected Host Update. Repatching..."),(0,P.renameSync)(o,a),(0,P.mkdirSync)(o),(0,P.writeFileSync)((0,M.join)(o,"package.json"),JSON.stringify({name:"discord",main:"index.js"})),(0,P.writeFileSync)((0,M.join)(o,"index.js"),`require(${JSON.stringify((0,M.join)(__dirname,"patcher.js"))});`)}catch(e){console.error("[Suncord] Failed to repatch latest host update",e)}}var zr,P,M,Br=d(()=>{"use strict";l();zr=require("electron"),P=require("original-fs"),M=require("path");zr.app.on("before-quit",lo)});var ho={};var C,re,fo,po,Zt,go,Zr=d(()=>{"use strict";l();Ur();C=j(require("electron")),re=require("path");Mt();ae();ie();console.log("[Suncord] Starting up...");fo=require.main.filename,po=require.main.path.endsWith("app.asar")?"_app.asar":"app.asar",Zt=(0,re.join)((0,re.dirname)(fo),"..",po),go=require((0,re.join)(Zt,"package.json"));require.main.filename=(0,re.join)(Zt,go.main);C.app.setAppPath(Zt);if(Fe)console.log("[Suncord] Running in vanilla mode. Not loading Suncord");else{let e=b.store;if(Br(),e.winCtrlQ){let r=C.Menu.buildFromTemplate;C.Menu.buildFromTemplate=function(o){if(o[0]?.label==="&File"){let{submenu:a}=o[0];Array.isArray(a)&&a.push({label:"Quit (Hidden)",visible:!1,acceleratorWorksWhenHidden:!0,accelerator:"Control+Q",click:()=>C.app.quit()})}return r.call(this,o)}}class t extends C.default.BrowserWindow{constructor(o){if(o?.webPreferences?.preload&&o.title){let a=o.webPreferences.preload;o.webPreferences.preload=(0,re.join)(__dirname,"preload.js"),o.webPreferences.sandbox=!1,o.webPreferences.backgroundThrottling=!1,e.frameless?o.frame=!1:e.winNativeTitleBar&&delete o.frame,e.transparent&&(o.transparent=!0,o.backgroundColor="#00000000"),!1&&(o.backgroundColor="#00000000",e.macosVibrancyStyle&&(o.vibrancy=e.macosVibrancyStyle)),process.env.DISCORD_PRELOAD=a,super(o),mr(this)}else super(o)}}Object.assign(t,C.default.BrowserWindow),Object.defineProperty(t,"name",{value:"BrowserWindow",configurable:!0});let n=require.resolve("electron");delete require.cache[n].exports,require.cache[n].exports={...C.default,BrowserWindow:t},Fr(global,"appSettings",r=>{r.set("DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING",!0),e.disableMinSize?(r.set("MIN_WIDTH",0),r.set("MIN_HEIGHT",0)):(r.set("MIN_WIDTH",940),r.set("MIN_HEIGHT",500))}),process.env.DATA_DIR=(0,re.join)(C.app.getPath("userData"),"..","Suncord");let i=C.app.commandLine.appendSwitch;C.app.commandLine.appendSwitch=function(...r){if(r[0]==="disable-features"){let o=new Set((r[1]??"").split(","));o.add("WidgetLayering"),o.add("UseEcoQoSForBackgroundProcess"),r[1]+=[...o].join(",")}return i.apply(this,r)},C.app.commandLine.appendSwitch("disable-renderer-backgrounding"),C.app.commandLine.appendSwitch("disable-background-timer-throttling"),C.app.commandLine.appendSwitch("disable-backgrounding-occluded-windows")}console.log("[Suncord] Loading original Discord app.asar");require(require.main.filename)});l();var pe=require("electron"),Vr=require("path");Mt();ae();ie();l();var Nr=require("electron");l();var yr=require("module"),Zi=(0,yr.createRequire)("/"),qe,Vi=";var __w=require('worker_threads');__w.parentPort.on('message',function(m){onmessage({data:m})}),postMessage=function(m,t){__w.parentPort.postMessage(m,t)},close=process.exit;self=global";try{qe=Zi("worker_threads").Worker}catch{}var Hi=qe?function(e,t,n,i,r){var o=!1,a=new qe(e+Vi,{eval:!0}).on("error",function(s){return r(s,null)}).on("message",function(s){return r(null,s)}).on("exit",function(s){s&&!o&&r(new Error("exited with code "+s),null)});return a.postMessage(n,i),a.terminate=function(){return o=!0,qe.prototype.terminate.call(a)},a}:function(e,t,n,i,r){setImmediate(function(){return r(new Error("async operations unsupported - update to Node 12+ (or Node 10-11 with the --experimental-worker CLI flag)"),null)});var o=function(){};return{terminate:o,postMessage:o}},T=Uint8Array,ne=Uint16Array,Gt=Uint32Array,jt=new T([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Ft=new T([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Ar=new T([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),wr=function(e,t){for(var n=new ne(31),i=0;i<31;++i)n[i]=t+=1<<e[i-1];for(var r=new Gt(n[30]),i=1;i<30;++i)for(var o=n[i];o<n[i+1];++o)r[o]=o-n[i]<<5|i;return[n,r]},Cr=wr(jt,2),Ut=Cr[0],Wi=Cr[1];Ut[28]=258,Wi[258]=28;var Sr=wr(Ft,0),Tr=Sr[0],Ba=Sr[1],et=new ne(32768);for(h=0;h<32768;++h)W=(h&43690)>>>1|(h&21845)<<1,W=(W&52428)>>>2|(W&13107)<<2,W=(W&61680)>>>4|(W&3855)<<4,et[h]=((W&65280)>>>8|(W&255)<<8)>>>1;var W,h,xe=function(e,t,n){for(var i=e.length,r=0,o=new ne(t);r<i;++r)e[r]&&++o[e[r]-1];var a=new ne(t);for(r=0;r<t;++r)a[r]=a[r-1]+o[r-1]<<1;var s;if(n){s=new ne(1<<t);var c=15-t;for(r=0;r<i;++r)if(e[r])for(var u=r<<4|e[r],f=t-e[r],v=a[e[r]-1]++<<f,D=v|(1<<f)-1;v<=D;++v)s[et[v]>>>c]=u}else for(s=new ne(i),r=0;r<i;++r)e[r]&&(s[r]=et[a[e[r]-1]++]>>>15-e[r]);return s},Le=new T(288);for(h=0;h<144;++h)Le[h]=8;var h;for(h=144;h<256;++h)Le[h]=9;var h;for(h=256;h<280;++h)Le[h]=7;var h;for(h=280;h<288;++h)Le[h]=8;var h,xr=new T(32);for(h=0;h<32;++h)xr[h]=5;var h;var br=xe(Le,9,1);var Er=xe(xr,5,1),Xe=function(e){for(var t=e[0],n=1;n<e.length;++n)e[n]>t&&(t=e[n]);return t},R=function(e,t,n){var i=t/8|0;return(e[i]|e[i+1]<<8)>>(t&7)&n},Qe=function(e,t){var n=t/8|0;return(e[n]|e[n+1]<<8|e[n+2]<<16)>>(t&7)},Dr=function(e){return(e+7)/8|0},tt=function(e,t,n){(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length);var i=new(e.BYTES_PER_ELEMENT==2?ne:e.BYTES_PER_ELEMENT==4?Gt:T)(n-t);return i.set(e.subarray(t,n)),i};var kr=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],E=function(e,t,n){var i=new Error(t||kr[e]);if(i.code=e,Error.captureStackTrace&&Error.captureStackTrace(i,E),!n)throw i;return i},Pr=function(e,t,n){var i=e.length;if(!i||n&&n.f&&!n.l)return t||new T(0);var r=!t||n,o=!n||n.i;n||(n={}),t||(t=new T(i*3));var a=function($t){var Kt=t.length;if($t>Kt){var Yt=new T(Math.max(Kt*2,$t));Yt.set(t),t=Yt}},s=n.f||0,c=n.p||0,u=n.b||0,f=n.l,v=n.d,D=n.m,B=n.n,$=i*8;do{if(!f){s=R(e,c,1);var K=R(e,c+1,3);if(c+=3,K)if(K==1)f=br,v=Er,D=9,B=5;else if(K==2){var G=R(e,c,31)+257,k=R(e,c+10,15)+4,_=G+R(e,c+5,31)+1;c+=14;for(var x=new T(_),O=new T(19),A=0;A<k;++A)O[Ar[A]]=R(e,c+A*3,7);c+=k*3;for(var Z=Xe(O),Ne=(1<<Z)-1,ge=xe(O,Z,1),A=0;A<_;){var Ee=ge[R(e,c,Ne)];c+=Ee&15;var m=Ee>>>4;if(m<16)x[A++]=m;else{var de=0,Ge=0;for(m==16?(Ge=3+R(e,c,3),c+=2,de=x[A-1]):m==17?(Ge=3+R(e,c,7),c+=3):m==18&&(Ge=11+R(e,c,127),c+=7);Ge--;)x[A++]=de}}var Vt=x.subarray(0,G),Y=x.subarray(G);D=Xe(Vt),B=Xe(Y),f=xe(Vt,D,1),v=xe(Y,B,1)}else E(1);else{var m=Dr(c)+4,y=e[m-4]|e[m-3]<<8,S=m+y;if(S>i){o&&E(0);break}r&&a(u+y),t.set(e.subarray(m,S),u),n.b=u+=y,n.p=c=S*8,n.f=s;continue}if(c>$){o&&E(0);break}}r&&a(u+131072);for(var Hr=(1<<D)-1,Wr=(1<<B)-1,nt=c;;nt=c){var de=f[Qe(e,c)&Hr],he=de>>>4;if(c+=de&15,c>$){o&&E(0);break}if(de||E(2),he<256)t[u++]=he;else if(he==256){nt=c,f=null;break}else{var Ht=he-254;if(he>264){var A=he-257,De=jt[A];Ht=R(e,c,(1<<De)-1)+Ut[A],c+=De}var rt=v[Qe(e,c)&Wr],it=rt>>>4;rt||E(3),c+=rt&15;var Y=Tr[it];if(it>3){var De=Ft[it];Y+=Qe(e,c)&(1<<De)-1,c+=De}if(c>$){o&&E(0);break}r&&a(u+131072);for(var Wt=u+Ht;u<Wt;u+=4)t[u]=t[u-Y],t[u+1]=t[u+1-Y],t[u+2]=t[u+2-Y],t[u+3]=t[u+3-Y];u=Wt}}n.l=f,n.p=nt,n.b=u,n.f=s,f&&(s=1,n.m=D,n.d=v,n.n=B)}while(!s);return u==t.length?t:tt(t,0,u)};var $i=new T(0);var Ki=function(e,t){var n={};for(var i in e)n[i]=e[i];for(var i in t)n[i]=t[i];return n},vr=function(e,t,n){for(var i=e(),r=e.toString(),o=r.slice(r.indexOf("[")+1,r.lastIndexOf("]")).replace(/\s+/g,"").split(","),a=0;a<i.length;++a){var s=i[a],c=o[a];if(typeof s=="function"){t+=";"+c+"=";var u=s.toString();if(s.prototype)if(u.indexOf("[native code]")!=-1){var f=u.indexOf(" ",8)+1;t+=u.slice(f,u.indexOf("(",f))}else{t+=u;for(var v in s.prototype)t+=";"+c+".prototype."+v+"="+s.prototype[v].toString()}else t+=u}else n[c]=s}return[t,n]},Je=[],Yi=function(e){var t=[];for(var n in e)e[n].buffer&&t.push((e[n]=new e[n].constructor(e[n])).buffer);return t},Ji=function(e,t,n,i){var r;if(!Je[n]){for(var o="",a={},s=e.length-1,c=0;c<s;++c)r=vr(e[c],o,a),o=r[0],a=r[1];Je[n]=vr(e[s],o,a)}var u=Ki({},Je[n][1]);return Hi(Je[n][0]+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+t.toString()+"}",n,u,Yi(u),i)},qi=function(){return[T,ne,Gt,jt,Ft,Ar,Ut,Tr,br,Er,et,kr,xe,Xe,R,Qe,Dr,tt,E,Pr,zt,_r,Or]};var _r=function(e){return postMessage(e,[e.buffer])},Or=function(e){return e&&e.size&&new T(e.size)},Xi=function(e,t,n,i,r,o){var a=Ji(n,i,r,function(s,c){a.terminate(),o(s,c)});return a.postMessage([e,t],t.consume?[e.buffer]:[]),function(){a.terminate()}};var U=function(e,t){return e[t]|e[t+1]<<8},N=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},Lt=function(e,t){return N(e,t)+N(e,t+4)*4294967296};function Qi(e,t,n){return n||(n=t,t={}),typeof n!="function"&&E(7),Xi(e,t,[qi],function(i){return _r(zt(i.data[0],Or(i.data[1])))},1,n)}function zt(e,t){return Pr(e,t)}var Nt=typeof TextDecoder<"u"&&new TextDecoder,eo=0;try{Nt.decode($i,{stream:!0}),eo=1}catch{}var to=function(e){for(var t="",n=0;;){var i=e[n++],r=(i>127)+(i>223)+(i>239);if(n+r>e.length)return[t,tt(e,n-1)];r?r==3?(i=((i&15)<<18|(e[n++]&63)<<12|(e[n++]&63)<<6|e[n++]&63)-65536,t+=String.fromCharCode(55296|i>>10,56320|i&1023)):r&1?t+=String.fromCharCode((i&31)<<6|e[n++]&63):t+=String.fromCharCode((i&15)<<12|(e[n++]&63)<<6|e[n++]&63):t+=String.fromCharCode(i)}};function no(e,t){if(t){for(var n="",i=0;i<e.length;i+=16384)n+=String.fromCharCode.apply(null,e.subarray(i,i+16384));return n}else{if(Nt)return Nt.decode(e);var r=to(e),o=r[0],a=r[1];return a.length&&E(8),o}}var ro=function(e,t){return t+30+U(e,t+26)+U(e,t+28)},io=function(e,t,n){var i=U(e,t+28),r=no(e.subarray(t+46,t+46+i),!(U(e,t+8)&2048)),o=t+46+i,a=N(e,t+20),s=n&&a==4294967295?oo(e,o):[a,N(e,t+24),N(e,t+42)],c=s[0],u=s[1],f=s[2];return[U(e,t+10),c,u,r,o+U(e,t+30)+U(e,t+32),f]},oo=function(e,t){for(;U(e,t)!=1;t+=4+U(e,t+2));return[Lt(e,t+12),Lt(e,t+4),Lt(e,t+20)]};var Ir=typeof queueMicrotask=="function"?queueMicrotask:typeof setTimeout=="function"?setTimeout:function(e){e()};function Rr(e,t,n){n||(n=t,t={}),typeof n!="function"&&E(7);var i=[],r=function(){for(var m=0;m<i.length;++m)i[m]()},o={},a=function(m,y){Ir(function(){n(m,y)})};Ir(function(){a=n});for(var s=e.length-22;N(e,s)!=101010256;--s)if(!s||e.length-s>65558)return a(E(13,0,1),null),r;var c=U(e,s+8);if(c){var u=c,f=N(e,s+16),v=f==4294967295||u==65535;if(v){var D=N(e,s-12);v=N(e,D)==101075792,v&&(u=c=N(e,D+32),f=N(e,D+48))}for(var B=t&&t.filter,$=function(m){var y=io(e,f,v),S=y[0],G=y[1],k=y[2],_=y[3],x=y[4],O=y[5],A=ro(e,O);f=x;var Z=function(ge,Ee){ge?(r(),a(ge,null)):(Ee&&(o[_]=Ee),--c||a(null,o))};if(!B||B({name:_,size:G,originalSize:k,compression:S}))if(!S)Z(null,tt(e,A,A+G));else if(S==8){var Ne=e.subarray(A,A+G);if(G<32e4)try{Z(null,zt(Ne,new T(k)))}catch(ge){Z(ge,null)}else i.push(Qi(Ne,{size:k},Z))}else Z(E(14,"unknown compression type "+S,1),null);else Z(null,null)},K=0;K<u;++K)$(K)}else a(null,{});return r}var Gr=require("fs"),z=require("fs/promises"),be=require("path");ie();l();function Mr(e){function t(a,s,c,u){let f=0;return f+=a<<0,f+=s<<8,f+=c<<16,f+=u<<24>>>0,f}if(e[0]===80&&e[1]===75&&e[2]===3&&e[3]===4)return e;if(e[0]!==67||e[1]!==114||e[2]!==50||e[3]!==52)throw new Error("Invalid header: Does not start with Cr24");let n=e[4]===3,i=e[4]===2;if(!i&&!n||e[5]||e[6]||e[7])throw new Error("Unexpected crx format version number.");if(i){let a=t(e[8],e[9],e[10],e[11]),s=t(e[12],e[13],e[14],e[15]),c=16+a+s;return e.subarray(c,e.length)}let o=12+t(e[8],e[9],e[10],e[11]);return e.subarray(o,e.length)}l();var Lr=j(require("https"));function Bt(e,t={}){return new Promise((n,i)=>{Lr.default.get(e,t,r=>{let{statusCode:o,statusMessage:a,headers:s}=r;if(o>=400)return void i(`${o}: ${a} - ${e}`);if(o>=300)return void n(Bt(s.location,t));let c=[];r.on("error",i),r.on("data",u=>c.push(u)),r.once("end",()=>n(Buffer.concat(c)))})})}var ao=(0,be.join)(ve,"ExtensionCache");async function so(e,t){return await(0,z.mkdir)(t,{recursive:!0}),new Promise((n,i)=>{Rr(e,(r,o)=>{if(r)return void i(r);Promise.all(Object.keys(o).map(async a=>{if(a.startsWith("_metadata/"))return;if(a.endsWith("/"))return void(0,z.mkdir)((0,be.join)(t,a),{recursive:!0});let s=a.split("/"),c=s.pop(),u=s.join("/"),f=(0,be.join)(t,u);u&&await(0,z.mkdir)(f,{recursive:!0}),await(0,z.writeFile)((0,be.join)(f,c),o[a])})).then(()=>n()).catch(a=>{(0,z.rm)(t,{recursive:!0,force:!0}),i(a)})})})}async function jr(e){let t=(0,be.join)(ao,`${e}`);try{await(0,z.access)(t,Gr.constants.F_OK)}catch{let i=e==="fmkadmapgofadopljbjfkapdkoienihi"?"https://raw.githubusercontent.com/Vendicated/random-files/f6f550e4c58ac5f2012095a130406c2ab25b984d/fmkadmapgofadopljbjfkapdkoienihi.zip":`https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&x=id%3D${e}%26uc&prodversion=32`,r=await Bt(i,{headers:{"User-Agent":"Suncord (https://github.com/verticalsync/Suncord)"}});await so(Mr(r),t).catch(console.error)}Nr.session.defaultSession.loadExtension(t)}Fe||pe.app.whenReady().then(()=>{pe.protocol.registerFileProtocol("vencord",({url:r},o)=>{let a=r.slice(10);if(a.endsWith("/")&&(a=a.slice(0,-1)),a.startsWith("/themes/")){let s=a.slice(8),c=Rt(X,s);if(!c){o({statusCode:403});return}o(c.replace(/\?v=\d+$/,""));return}switch(a){case"renderer.js.map":case"vencordDesktopRenderer.js.map":case"preload.js.map":case"vencordDesktopPreload.js.map":case"patcher.js.map":case"vencordDesktopMain.js.map":o((0,Vr.join)(__dirname,a));break;default:o({statusCode:403})}});try{b.store.enableReactDevtools&&jr("fmkadmapgofadopljbjfkapdkoienihi").then(()=>console.info("[Suncord] Installed React Developer Tools")).catch(r=>console.error("[Suncord] Failed to install React Developer Tools",r))}catch{}let e=(r,o)=>Object.keys(r).find(a=>a.toLowerCase()===o),t=r=>{let o={};return r.split(";").forEach(a=>{let[s,...c]=a.trim().split(/\s+/g);s&&!Object.prototype.hasOwnProperty.call(o,s)&&(o[s]=c)}),o},n=r=>Object.entries(r).filter(([,o])=>o?.length).map(o=>o.flat().join(" ")).join("; "),i=r=>{let o=e(r,"content-security-policy");if(o){let a=t(r[o][0]);for(let s of["style-src","connect-src","img-src","font-src","media-src","worker-src"])a[s]??=[],a[s].push("*","blob:","data:","vencord:","'unsafe-inline'");a["script-src"]??=[],a["script-src"].push("'unsafe-eval'","https://unpkg.com","https://cdnjs.cloudflare.com"),r[o]=[n(a)]}};pe.session.defaultSession.webRequest.onHeadersReceived(({responseHeaders:r,resourceType:o},a)=>{if(r&&(o==="mainFrame"&&i(r),o==="stylesheet")){let s=e(r,"content-type");s&&(r[s]=["text/css"])}a({cancel:!1,responseHeaders:r})}),pe.session.defaultSession.webRequest.onHeadersReceived=()=>{}});Zr();
//# sourceURL=VencordPatcher
//# sourceMappingURL=vencord://patcher.js.map
/*! For license information please see patcher.js.LEGAL.txt */

// Suncord 26d8010d
// Standalone: false
// Platform: win32
// Updater Disabled: false
"use strict";var or=Object.create;var Pe=Object.defineProperty;var ar=Object.getOwnPropertyDescriptor;var sr=Object.getOwnPropertyNames;var cr=Object.getPrototypeOf,lr=Object.prototype.hasOwnProperty;var _e=(e,t)=>()=>(e&&(t=e(e=0)),t);var H=(e,t)=>{for(var n in t)Pe(e,n,{get:t[n],enumerable:!0})},Nt=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of sr(t))!lr.call(e,i)&&i!==n&&Pe(e,i,{get:()=>t[i],enumerable:!(r=ar(t,i))||r.enumerable});return e};var W=(e,t,n)=>(n=e!=null?or(cr(e)):{},Nt(t||!e||!e.__esModule?Pe(n,"default",{value:e,enumerable:!0}):n,e)),ur=e=>Nt(Pe({},"__esModule",{value:!0}),e);var l=_e(()=>{"use strict"});var Ae=_e(()=>{"use strict";l()});function Ce(e){return async function(){try{return{ok:!0,value:await e(...arguments)}}catch(t){return{ok:!1,error:t instanceof Error?{...t}:t}}}}var Ft=_e(()=>{"use strict";l()});var dr={};function se(...e){let t={cwd:Zt};return Qe?qe("flatpak-spawn",["--host","git",...e],t):qe("git",e,t)}async function fr(){return(await se("remote","get-url","origin")).stdout.trim().replace(/git@(.+):/,"https://$1/").replace(/\.git$/,"")}async function pr(){await se("fetch");let e=(await se("branch","--show-current")).stdout.trim();if(!((await se("ls-remote","origin",e)).stdout.length>0))return[];let r=(await se("log",`HEAD...origin/${e}`,"--pretty=format:%an/%h/%s")).stdout.trim();return r?r.split(`
`).map(i=>{let[a,o,...s]=i.split("/");return{hash:o,author:a,message:s.join("/").split(`
`)[0]}}):[]}async function gr(){return(await se("pull")).stdout.includes("Fast-forward")}async function hr(){return!(await qe(Qe?"flatpak-spawn":"node",Qe?["--host","node","scripts/build/build.mjs"]:["scripts/build/build.mjs"],{cwd:Zt})).stderr.includes("Build failed")}var Ut,we,jt,zt,Zt,qe,Qe,Bt=_e(()=>{"use strict";l();Ae();Ut=require("child_process"),we=require("electron"),jt=require("path"),zt=require("util");Ft();Zt=(0,jt.join)(__dirname,".."),qe=(0,zt.promisify)(Ut.execFile),Qe=!1;we.ipcMain.handle("SuncordGetRepo",Ce(fr));we.ipcMain.handle("SuncordGetUpdates",Ce(pr));we.ipcMain.handle("SuncordUpdate",Ce(gr));we.ipcMain.handle("SuncordBuild",Ce(hr))});l();var re=require("electron"),nr=require("path");l();l();Bt();l();Ae();var At=require("electron");l();var nt={};H(nt,{fetchTrackData:()=>vr});l();var Wt=require("child_process"),$t=require("util"),Kt=(0,$t.promisify)(Wt.execFile);async function tt(e){let{stdout:t}=await Kt("osascript",e.map(n=>["-e",n]).flat());return t}function Vt(e,t){let n=new URL("https://tools.applemediaservices.com/api/apple-media/music/US/search.json");return n.searchParams.set("types",e),n.searchParams.set("limit","1"),n.searchParams.set("term",t),n}var Ht={headers:{"user-agent":"Mozilla/5.0 (Windows NT 10.0; rv:125.0) Gecko/20100101 Firefox/125.0"}},_=null;async function mr({id:e,name:t,artist:n,album:r}){if(e===_?.id){if("data"in _)return _.data;if("failures"in _&&_.failures>=5)return null}try{let[i,a]=await Promise.all([fetch(Vt("songs",n+" "+r+" "+t),Ht).then(f=>f.json()),fetch(Vt("artists",n.split(/ *[,&] */)[0]),Ht).then(f=>f.json())]),o=i?.songs?.data[0]?.attributes.url,s=i?.songs?.data[0]?.id?`https://song.link/i/${i?.songs?.data[0]?.id}`:void 0,c=i?.songs?.data[0]?.attributes.artwork.url.replace("{w}","512").replace("{h}","512"),u=a?.artists?.data[0]?.attributes.artwork.url.replace("{w}","512").replace("{h}","512");return _={id:e,data:{appleMusicLink:o,songLink:s,albumArtwork:c,artistArtwork:u}},_.data}catch(i){return console.error("[AppleMusicRichPresence] Failed to fetch remote data:",i),_={id:e,failures:(e===_?.id&&"failures"in _?_.failures:0)+1},null}}async function vr(){try{await Kt("pgrep",["^Music$"])}catch{return null}if(await tt(['tell application "Music"',"get player state","end tell"]).then(f=>f.trim())!=="playing")return null;let t=await tt(['tell application "Music"',"get player position","end tell"]).then(f=>Number.parseFloat(f.trim())),n=await tt(['set output to ""','tell application "Music"',"set t_id to database id of current track","set t_name to name of current track","set t_album to album of current track","set t_artist to artist of current track","set t_duration to duration of current track",'set output to "" & t_id & "\\n" & t_name & "\\n" & t_album & "\\n" & t_artist & "\\n" & t_duration',"end tell","return output"]),[r,i,a,o,s]=n.split(`
`).filter(f=>!!f),c=Number.parseFloat(s),u=await mr({id:r,name:i,artist:o,album:a});return{name:i,album:a,artist:o,playerPosition:t,duration:c,...u}}var rt={};H(rt,{initDevtoolsOpenEagerLoad:()=>Ir});l();function Ir(e){let t=()=>e.sender.executeJavaScript("Vencord.Plugins.plugins.ConsoleShortcuts.eagerLoad(true)");e.sender.isDevToolsOpened()?t():e.sender.once("devtools-opened",()=>t())}var tn={};l();l();Ae();l();var Se=class{pathListeners=new Map;globalListeners=new Set;constructor(t,n={}){this.plain=t,this.store=this.makeProxy(t),Object.assign(this,n)}makeProxy(t,n=t,r=""){let i=this;return new Proxy(t,{get(a,o){let s=a[o];return!(o in a)&&i.getDefaultValue&&(s=i.getDefaultValue({target:a,key:o,root:n,path:r})),typeof s=="object"&&s!==null&&!Array.isArray(s)?i.makeProxy(s,n,`${r}${r&&"."}${o}`):s},set(a,o,s){if(a[o]===s)return!0;Reflect.set(a,o,s);let c=`${r}${r&&"."}${o}`;return i.globalListeners.forEach(u=>u(s,c)),i.pathListeners.get(c)?.forEach(u=>u(s)),!0}})}setData(t,n){if(this.readOnly)throw new Error("SettingsStore is read-only");if(this.plain=t,this.store=this.makeProxy(t),n){let r=t,i=n.split(".");for(let a of i){if(!r){console.warn(`Settings#setData: Path ${n} does not exist in new data. Not dispatching update`);return}r=r[a]}this.pathListeners.get(n)?.forEach(a=>a(r))}this.markAsChanged()}addGlobalChangeListener(t){this.globalListeners.add(t)}addChangeListener(t,n){let r=this.pathListeners.get(t)??new Set;r.add(n),this.pathListeners.set(t,r)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}removeChangeListener(t,n){let r=this.pathListeners.get(t);!r||(r.delete(n),r.size||this.pathListeners.delete(t))}markAsChanged(){this.globalListeners.forEach(t=>t(this.plain,""))}};l();function it(e,t){for(let n in t){let r=t[n];typeof r=="object"&&!Array.isArray(r)?(e[n]??={},it(e[n],r)):e[n]??=r}return e}var Me=require("electron"),Q=require("fs");l();var Yt=require("electron"),$=require("path"),ce=process.env.SUNCORD_USER_DATA_DIR??(process.env.DISCORD_USER_DATA_DIR?(0,$.join)(process.env.DISCORD_USER_DATA_DIR,"..","SuncordData"):(0,$.join)(Yt.app.getPath("userData"),"..","Suncord")),le=(0,$.join)(ce,"settings"),q=(0,$.join)(ce,"themes"),Oe=(0,$.join)(le,"quickCss.css"),ot=(0,$.join)(le,"settings.json"),at=(0,$.join)(le,"native-settings.json"),Jt=["https:","http:","steam:","spotify:","com.epicgames.launcher:","tidal:","tg:"];(0,Q.mkdirSync)(le,{recursive:!0});function qt(e,t){try{return JSON.parse((0,Q.readFileSync)(t,"utf-8"))}catch(n){return n?.code!=="ENOENT"&&console.error(`Failed to read ${e} settings`,n),{}}}var k=new Se(qt("renderer",ot));k.addGlobalChangeListener(()=>{try{(0,Q.writeFileSync)(ot,JSON.stringify(k.plain,null,4))}catch(e){console.error("Failed to write renderer settings",e)}});Me.ipcMain.handle("SuncordGetSettingsDir",()=>le);Me.ipcMain.on("SuncordGetSettings",e=>e.returnValue=k.plain);Me.ipcMain.handle("SuncordSetSettings",(e,t,n)=>{k.setData(t,n)});var yr={plugins:{}},Qt=qt("native",at);it(Qt,yr);var Xt=new Se(Qt);Xt.addGlobalChangeListener(()=>{try{(0,Q.writeFileSync)(at,JSON.stringify(Xt.plain,null,4))}catch(e){console.error("Failed to write native settings",e)}});var en=require("electron");en.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(n,{frame:r})=>{r.once("dom-ready",()=>{if(r.url.startsWith("https://open.spotify.com/embed/")){let i=k.store.plugins?.FixSpotifyEmbeds;if(!i?.enabled)return;r.executeJavaScript(`
                    const original = Audio.prototype.play;
                    Audio.prototype.play = function() {
                        this.volume = ${i.volume/100||.1};
                        return original.apply(this, arguments);
                    }
                `)}})})});var rn={};l();var nn=require("electron");nn.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(n,{frame:r})=>{r.once("dom-ready",()=>{if(r.url.startsWith("https://www.youtube.com/")){if(!k.store.plugins?.FixYoutubeEmbeds?.enabled)return;r.executeJavaScript(`
                new MutationObserver(() => {
                    if(
                        document.querySelector('div.ytp-error-content-wrap-subreason a[href*="www.youtube.com/watch?v="]')
                    ) location.reload()
                }).observe(document.body, { childList: true, subtree:true });
                `)}})})});var st={};H(st,{resolveRedirect:()=>Cr});l();var on=require("https"),Ar=/^https:\/\/(spotify\.link|s\.team)\/.+$/;function an(e){return new Promise((t,n)=>{let r=(0,on.request)(new URL(e),{method:"HEAD"},i=>{t(i.headers.location?an(i.headers.location):e)});r.on("error",n),r.end()})}async function Cr(e,t){return Ar.test(t)?an(t):t}var ct={};H(ct,{readRecording:()=>wr});l();var sn=require("electron"),cn=require("fs/promises"),Te=require("path");async function wr(e,t){t=(0,Te.normalize)(t);let n=(0,Te.basename)(t),r=(0,Te.normalize)(sn.app.getPath("userData")+"/");if(console.log(n,r,t),n!=="recording.ogg"||!t.startsWith(r))return null;try{let i=await(0,cn.readFile)(t);return new Uint8Array(i.buffer)}catch{return null}}var fn={};l();var un=require("electron");l();var ln=`/* eslint-disable */

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
});`;un.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(n,{frame:r})=>{r.once("dom-ready",()=>{if(r.url.includes("discordsays")&&r.url.includes("youtube.com")){if(!k.store.plugins?.WatchTogetherAdblock?.enabled)return;r.executeJavaScript(ln)}})})});var lt={};H(lt,{sendToOverlay:()=>Sr});l();var gn=require("dgram"),pn;function Sr(e,t){t.icon=Buffer.from(t.icon).toString("base64");let n=JSON.stringify(t);pn??=(0,gn.createSocket)("udp4"),pn.send(n,42069,"127.0.0.1")}var pt={};H(pt,{checkffmpeg:()=>Mr,checkytdlp:()=>Rr,execute:()=>Or,getStdout:()=>Lr,interrupt:()=>Gr,isFfmpegAvailable:()=>Fr,isYtdlpAvailable:()=>Nr,start:()=>xr,stop:()=>Er});l();var Y=require("child_process"),A=W(require("fs")),hn=W(require("os")),ft=W(require("path")),U=null,K="",Re="",ut=!1,te=!1,ue=null,fe=null,Le=()=>U??process.cwd(),ee=e=>ft.default.join(Le(),e),dn=()=>{!U||A.readdirSync(U).filter(e=>e.startsWith("download.")||e.startsWith("remux.")).forEach(e=>A.unlinkSync(ee(e)))},Ge=e=>(K+=e,K=K.replace(/^.*\r([^\n])/gm,"$1")),j=(...e)=>(console.log(`[Plugin:MediaDownloader] ${e.join(" ")}`),Re+=`[Plugin:MediaDownloader] ${e.join(" ")}
`),mn=(...e)=>console.error(`[Plugin:MediaDownloader] [ERROR] ${e.join(" ")}`);function vn(e){j(`Executing yt-dlp with args: ["${e.map(n=>n.replace('"','\\"')).join('", "')}"]`);let t="";return new Promise((n,r)=>{ue=(0,Y.spawn)("yt-dlp",e,{cwd:Le()}),ue.stdout.on("data",i=>Ge(i)),ue.stderr.on("data",i=>{Ge(i),mn(`yt-dlp encountered an error: ${i}`),t+=i}),ue.on("exit",i=>{ue=null,i===0?n(K):r(new Error(t||`yt-dlp exited with code ${i}`))})})}function Tr(e){j(`Executing ffmpeg with args: ["${e.map(n=>n.replace('"','\\"')).join('", "')}"]`);let t="";return new Promise((n,r)=>{fe=(0,Y.spawn)("ffmpeg",e,{cwd:Le()}),fe.stdout.on("data",i=>Ge(i)),fe.stderr.on("data",i=>{Ge(i),mn(`ffmpeg encountered an error: ${i}`),t+=i}),fe.on("exit",i=>{fe=null,i===0?n(K):r(new Error(t||`ffmpeg exited with code ${i}`))})})}async function xr(e,t){return t||=A.mkdtempSync(ft.default.join(hn.default.tmpdir(),"vencord_mediaDownloader_")),A.existsSync(t)||A.mkdirSync(t,{recursive:!0}),U=t,j("Using workdir: ",U),U}async function Er(e){U&&(j("Cleaning up workdir"),A.rmSync(U,{recursive:!0}),U=null)}async function Dr(e){K="";let t=JSON.parse(await vn(["-J",e.url,"--no-warnings"]));if(t.is_live)throw"Live streams are not supported.";return K="",{videoTitle:`${t.title||"video"} (${t.id})`}}function br({videoTitle:e},{maxFileSize:t,format:n}){let r=!!t,i=r?t*.8:0,a=r?t*.2:0,o={noFfmpeg:"ba[ext=mp3]{TOT_SIZE}/wa[ext=mp3]{TOT_SIZE}",ffmpeg:"ba*{TOT_SIZE}/ba{TOT_SIZE}/wa*{TOT_SIZE}/ba*"},s={noFfmpeg:"b{TOT_SIZE}{HEIGHT}[ext=webm]/b{TOT_SIZE}{HEIGHT}[ext=mp4]/w{HEIGHT}{TOT_SIZE}",ffmpeg:"b*{VID_SIZE}{HEIGHT}+ba{AUD_SIZE}/b{TOT_SIZE}{HEIGHT}/b*{HEIGHT}+ba"},c={ffmpeg:"bv{TOT_SIZE}/wv{TOT_SIZE}"},u;switch(n){case"audio":u=o;break;case"gif":u=c;break;case"video":default:u=s;break}let f=(te?u.ffmpeg:u.noFfmpeg)?.replaceAll("{TOT_SIZE}",r?`[filesize<${t}]`:"").replaceAll("{VID_SIZE}",r?`[filesize<${i}]`:"").replaceAll("{AUD_SIZE}",r?`[filesize<${a}]`:"").replaceAll("{HEIGHT}","[height<=1080]");if(!f)throw"Gif format is only supported with ffmpeg.";return j("Video formated calculated as ",f),j(`Based on: format=${n}, maxFileSize=${t}, ffmpegAvailable=${te}`),{format:f,videoTitle:e}}async function kr({format:e,videoTitle:t},{ytdlpArgs:n,url:r,format:i}){dn();let a=["-f",e,"-o","download.%(ext)s","--force-overwrites","-I","1"],o=te?i==="video"?["--remux-video","webm>webm/mp4"]:i==="audio"?["--extract-audio","--audio-format","mp3"]:[]:[],s=n?.filter(Boolean)||[];await vn([r,...a,...o,...s]);let c=A.readdirSync(Le()).find(u=>u.startsWith("download."));if(!c)throw"No video file was found!";return{file:c,videoTitle:t}}async function Pr({file:e,videoTitle:t},{ffmpegArgs:n,format:r,maxFileSize:i,gifQuality:a}){let o=e.split(".").pop();if(!te)return j("Skipping remux, ffmpeg is unavailable."),{file:e,videoTitle:t,extension:o};let s=["mp3","mp4","webm"],c=A.statSync(ee(e)).size,u=n?.filter(Boolean)||[],f=s.includes(o??""),m=!i||c<=i,x=u.length>0;if(f&&m&&!x&&!(r==="gif"))return j("Skipping remux, file type and size are good, and no ffmpeg arguments were specified."),{file:e,videoTitle:t,extension:o};let Z=parseFloat((0,Y.execFileSync)("ffprobe",["-v","error","-show_entries","format=duration","-of","default=noprint_wrappers=1:nokey=1",ee(e)]).toString());if(isNaN(Z))throw"Failed to get video duration.";let d=~~((i?i*7/Z:9999999)/1024),I,C;switch(r){case"audio":I=["-i",ee(e),"-b:a",`${d}k`,"-maxrate",`${d}k`,"-bufsize","1M","-y"],C="mp3";break;case"video":default:let M=d<=100?480:d<=500?720:1080;I=["-i",ee(e),"-b:v",`${~~(d*.8)}k`,"-b:a",`${~~(d*.2)}k`,"-maxrate",`${d}k`,"-bufsize","1M","-y","-filter:v",`scale=-1:${M}`],C="mp4";break;case"gif":let E,D,S,b;switch(a){case 1:E=5,D=360,S=24,b=5;break;case 2:E=10,D=420,S=32,b=5;break;default:case 3:E=15,D=480,S=64,b=4;break;case 4:E=20,D=540,S=64,b=3;break;case 5:E=30,D=720,S=128,b=1;break}I=["-i",ee(e),"-vf",`fps=${E},scale=w=${D}:h=-1:flags=lanczos,mpdecimate,split[s0][s1];[s0]palettegen=max_colors=${S}[p];[s1][p]paletteuse=dither=bayer:bayer_scale=${b}`,"-loop","0","-bufsize","1M","-y"],C="gif";break}return await Tr([...I,...u,`remux.${C}`]),{file:`remux.${C}`,videoTitle:t,extension:C}}function _r({file:e,videoTitle:t,extension:n}){if(!n)throw"Invalid extension.";return{buffer:A.readFileSync(ee(e)),title:`${t}.${n}`}}async function Or(e,t){Re="";try{let n=await Dr(t),r=br(n,t),i=await kr(r,t),a=await Pr(i,t),o=_r(a);return{logs:Re,...o}}catch(n){return{error:n.toString(),logs:Re}}}function Mr(e){try{return(0,Y.execFileSync)("ffmpeg",["-version"]),(0,Y.execFileSync)("ffprobe",["-version"]),te=!0,!0}catch{return te=!1,!1}}async function Rr(e){try{return(0,Y.execFileSync)("yt-dlp",["--version"]),ut=!0,!0}catch{return ut=!1,!1}}async function Gr(e){j("Interrupting..."),ue?.kill(),fe?.kill(),dn()}var Lr=()=>K,Nr=()=>ut,Fr=()=>te;var It={};H(It,{chooseDir:()=>Kr,deleteFileNative:()=>Vr,getDefaultNativeDataDir:()=>J,getDefaultNativeImageDir:()=>xe,getImageNative:()=>Zr,getLogsFromFs:()=>Wr,getNativeSavedImages:()=>zr,getSettings:()=>Ue,init:()=>Tn,initDirs:()=>Sn,messageLoggerEnhancedUniqueIdThingyIdkMan:()=>jr,showItemInFolder:()=>Yr,writeImageNative:()=>Br,writeLogs:()=>$r});l();var R=require("node:fs/promises"),ne=W(require("node:path"));l();var Ne=class{constructor(t=1/0){this.maxSize=t}queue=[];promise;next(){let t=this.queue.shift();t?this.promise=Promise.resolve().then(t).finally(()=>this.next()):this.promise=void 0}run(){this.promise||this.next()}push(t){this.size>=this.maxSize&&this.queue.shift(),this.queue.push(t),this.run()}unshift(t){this.size>=this.maxSize&&this.queue.pop(),this.queue.unshift(t),this.run()}get size(){return this.queue.length}};var je=require("electron");l();var ht=W(require("fs/promises")),yn=W(require("path"));l();var Fe=require("fs/promises"),In=W(require("path"));async function Ur(e){try{return await(0,Fe.access)(e),!0}catch{return!1}}async function pe(e){await Ur(e)||await(0,Fe.mkdir)(e)}function gt(e){return In.default.parse(e).name}async function Ue(){try{let e=await ht.default.readFile(await An(),"utf8");return JSON.parse(e)}catch{let t={logsDir:await J(),imageCacheDir:await xe()};try{await dt(t)}catch{}return t}}async function dt(e){!e||await ht.default.writeFile(await An(),JSON.stringify(e,null,4),"utf8")}async function An(){let e=await J();return await pe(e),yn.default.join(e,"mlSettings.json")}function jr(){}var ge=new Map,zr=()=>ge,mt,vt,Cn=async()=>vt??await xe(),wn=async()=>mt??await J();async function Sn(){let{logsDir:e,imageCacheDir:t}=await Ue();mt=e||await J(),vt=t||await xe()}Sn();async function Tn(e){let t=await Cn();await pe(t);let n=await(0,R.readdir)(t);for(let r of n){let i=gt(r);ge.set(i,ne.default.join(t,r))}}async function Zr(e,t){let n=ge.get(t);return n?await(0,R.readFile)(n):null}async function Br(e,t,n){if(!t||!n)return;let r=await Cn(),i=gt(t);if(ge.get(i))return;let o=ne.default.join(r,t);await pe(r),await(0,R.writeFile)(o,n),ge.set(i,o)}async function Vr(e,t){let n=ge.get(t);!n||await(0,R.unlink)(n)}var xn="message-logger-logs.json",Hr=new Ne;async function Wr(e){let t=await wn();await pe(t);try{return JSON.parse(await(0,R.readFile)(ne.default.join(t,xn),"utf-8"))}catch{}return null}async function $r(e,t){let n=await wn();Hr.push(()=>(0,R.writeFile)(ne.default.join(n,xn),t))}async function xe(){return ne.default.join(await J(),"savedImages")}async function J(){return ne.default.join(ce,"MessageLoggerData")}async function Kr(e,t){let n=await Ue(),r=n[t]||await J(),a=(await je.dialog.showOpenDialog({properties:["openDirectory"],defaultPath:r})).filePaths[0];if(!a)throw Error("Invalid Directory");switch(n[t]=a,await dt(n),t){case"logsDir":mt=a;break;case"imageCacheDir":vt=a;break}return t==="imageCacheDir"&&await Tn(e),a}async function Yr(e,t){je.shell.showItemInFolder(t)}var yt={};H(yt,{downloadTheme:()=>qr,getThemesDir:()=>Xr,themeExists:()=>Jr});l();var ze=require("fs"),Ze=require("path");async function Jr(e,t,n){return(0,ze.existsSync)((0,Ze.join)(t.toString(),`${n.name}.theme.css`))}function Xr(e,t,n){return(0,Ze.join)(t.toString(),`${n.name}.theme.css`)}async function qr(e,t,n){if(!n.content||!n.name)return;let r=(0,Ze.join)(t.toString(),`${n.name}.theme.css`);(0,ze.writeFileSync)(r,Buffer.from(n.content,"base64"))}var En={AppleMusicRichPresence:nt,ConsoleShortcuts:rt,FixSpotifyEmbeds:tn,FixYoutubeEmbeds:rn,OpenInApp:st,VoiceMessages:ct,WatchTogetherAdblock:fn,XSOverlay:lt,MediaDownloader:pt,MessageLoggerEnhanced:It,ThemeLibrary:yt};var Dn={};for(let[e,t]of Object.entries(En)){let n=Object.entries(t);if(!n.length)continue;let r=Dn[e]={};for(let[i,a]of n){let o=`VencordPluginNative_${e}_${i}`;At.ipcMain.handle(o,a),r[i]=o}}At.ipcMain.on("SuncordGetPluginIpcMethodMap",e=>{e.returnValue=Dn});l();Ae();var v=require("electron");l();var bn="PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KICAgIDxoZWFkPgogICAgICAgIDxtZXRhIGNoYXJzZXQ9InV0Zi04IiAvPgogICAgICAgIDx0aXRsZT5TdW5jb3JkIFF1aWNrQ1NTIEVkaXRvcjwvdGl0bGU+CiAgICAgICAgPGxpbmsKICAgICAgICAgICAgcmVsPSJzdHlsZXNoZWV0IgogICAgICAgICAgICBocmVmPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL21vbmFjby1lZGl0b3JAMC41MC4wL21pbi92cy9lZGl0b3IvZWRpdG9yLm1haW4uY3NzIgogICAgICAgICAgICBpbnRlZ3JpdHk9InNoYTI1Ni10aUpQUTJPMDR6L3BaL0F3ZHlJZ2hyT016ZXdmK1BJdkVsMVlLYlF2c1prPSIKICAgICAgICAgICAgY3Jvc3NvcmlnaW49ImFub255bW91cyIKICAgICAgICAgICAgcmVmZXJyZXJwb2xpY3k9Im5vLXJlZmVycmVyIgogICAgICAgIC8+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICBodG1sLAogICAgICAgICAgICBib2R5LAogICAgICAgICAgICAjY29udGFpbmVyIHsKICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsKICAgICAgICAgICAgICAgIGxlZnQ6IDA7CiAgICAgICAgICAgICAgICB0b3A6IDA7CiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTsKICAgICAgICAgICAgICAgIGhlaWdodDogMTAwJTsKICAgICAgICAgICAgICAgIG1hcmdpbjogMDsKICAgICAgICAgICAgICAgIHBhZGRpbmc6IDA7CiAgICAgICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuOwogICAgICAgICAgICB9CiAgICAgICAgPC9zdHlsZT4KICAgIDwvaGVhZD4KCiAgICA8Ym9keT4KICAgICAgICA8ZGl2IGlkPSJjb250YWluZXIiPjwvZGl2PgogICAgICAgIDxzY3JpcHQKICAgICAgICAgICAgc3JjPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL21vbmFjby1lZGl0b3JAMC41MC4wL21pbi92cy9sb2FkZXIuanMiCiAgICAgICAgICAgIGludGVncml0eT0ic2hhMjU2LUtjVTQ4VEdyODRyN3VuRjdKNUlnQm85NWFlVnJFYnJHZTA0UzdUY0ZVanM9IgogICAgICAgICAgICBjcm9zc29yaWdpbj0iYW5vbnltb3VzIgogICAgICAgICAgICByZWZlcnJlcnBvbGljeT0ibm8tcmVmZXJyZXIiCiAgICAgICAgPjwvc2NyaXB0PgoKICAgICAgICA8c2NyaXB0PgogICAgICAgICAgICByZXF1aXJlLmNvbmZpZyh7CiAgICAgICAgICAgICAgICBwYXRoczogewogICAgICAgICAgICAgICAgICAgIHZzOiAiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9tb25hY28tZWRpdG9yQDAuNTAuMC9taW4vdnMiLAogICAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgfSk7CgogICAgICAgICAgICByZXF1aXJlKFsidnMvZWRpdG9yL2VkaXRvci5tYWluIl0sICgpID0+IHsKICAgICAgICAgICAgICAgIGdldEN1cnJlbnRDc3MoKS50aGVuKChjc3MpID0+IHsKICAgICAgICAgICAgICAgICAgICB2YXIgZWRpdG9yID0gbW9uYWNvLmVkaXRvci5jcmVhdGUoCiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJjb250YWluZXIiKSwKICAgICAgICAgICAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGNzcywKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlOiAiY3NzIiwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lOiBnZXRUaGVtZSgpLAogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgKTsKICAgICAgICAgICAgICAgICAgICBlZGl0b3Iub25EaWRDaGFuZ2VNb2RlbENvbnRlbnQoKCkgPT4KICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q3NzKGVkaXRvci5nZXRWYWx1ZSgpKQogICAgICAgICAgICAgICAgICAgICk7CiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoInJlc2l6ZSIsICgpID0+IHsKICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBtb25hY28gcmUtbGF5b3V0CiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvci5sYXlvdXQoKTsKICAgICAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICB9KTsKICAgICAgICA8L3NjcmlwdD4KICAgIDwvYm9keT4KPC9odG1sPgo=";var Ee=require("fs"),de=require("fs/promises"),he=require("path");l();var Qr=/[^\S\r\n]*?\r?(?:\r\n|\n)[^\S\r\n]*?\*[^\S\r\n]?/,ei=/^\\@/;function Ct(e,t={}){return{fileName:e,name:t.name??e.replace(/\.css$/i,""),author:t.author??"Unknown Author",description:t.description??"A Discord Theme.",version:t.version,license:t.license,source:t.source,website:t.website,invite:t.invite}}function kn(e){return e.charCodeAt(0)===65279&&(e=e.slice(1)),e}function Pn(e,t){if(!e)return Ct(t);let n=e.split("/**",2)?.[1]?.split("*/",1)?.[0];if(!n)return Ct(t);let r={},i="",a="";for(let o of n.split(Qr))if(o.length!==0)if(o.charAt(0)==="@"&&o.charAt(1)!==" "){r[i]=a.trim();let s=o.indexOf(" ");i=o.substring(1,s),a=o.substring(s+1)}else a+=" "+o.replace("\\n",`
`).replace(ei,"@");return r[i]=a.trim(),delete r[""],Ct(t,r)}l();var _n=require("electron");function On(e){e.webContents.setWindowOpenHandler(({url:t})=>{switch(t){case"about:blank":case"https://discord.com/popout":case"https://ptb.discord.com/popout":case"https://canary.discord.com/popout":return{action:"allow"}}try{var{protocol:n}=new URL(t)}catch{return{action:"deny"}}switch(n){case"http:":case"https:":case"mailto:":case"steam:":case"spotify:":_n.shell.openExternal(t)}return{action:"deny"}})}(0,Ee.mkdirSync)(q,{recursive:!0});function wt(e,t){let n=(0,he.normalize)(e),r=(0,he.join)(e,t),i=(0,he.normalize)(r);return i.startsWith(n)?i:null}function ti(){return(0,de.readFile)(Oe,"utf-8").catch(()=>"")}async function ni(){let e=await(0,de.readdir)(q).catch(()=>[]),t=[];for(let n of e){if(!n.endsWith(".css"))continue;let r=await Mn(n).then(kn).catch(()=>null);r!=null&&t.push(Pn(r,n))}return t}function Mn(e){e=e.replace(/\?v=\d+$/,"");let t=wt(q,e);return t?(0,de.readFile)(t,"utf-8"):Promise.reject(`Unsafe path ${e}`)}v.ipcMain.handle("SuncordOpenQuickCss",()=>v.shell.openPath(Oe));v.ipcMain.handle("SuncordOpenExternal",(e,t)=>{try{var{protocol:n}=new URL(t)}catch{throw"Malformed URL"}if(!Jt.includes(n))throw"Disallowed protocol.";v.shell.openExternal(t)});v.ipcMain.handle("SuncordGetQuickCss",()=>ti());v.ipcMain.handle("SuncordSetQuickCss",(e,t)=>(0,Ee.writeFileSync)(Oe,t));v.ipcMain.handle("SuncordGetThemesDir",()=>q);v.ipcMain.handle("SuncordGetThemesList",()=>ni());v.ipcMain.handle("SuncordGetThemeData",(e,t)=>Mn(t));v.ipcMain.handle("SuncordGetThemeSystemValues",()=>({"os-accent-color":`#${v.systemPreferences.getAccentColor?.()||""}`}));v.ipcMain.handle("SuncordOpenMonacoEditor",async()=>{let e="Suncord QuickCSS Editor",t=v.BrowserWindow.getAllWindows().find(r=>r.title===e);if(t&&!t.isDestroyed()){t.focus();return}let n=new v.BrowserWindow({title:e,autoHideMenuBar:!0,darkTheme:!0,webPreferences:{preload:(0,he.join)(__dirname,"vencordDesktopPreload.js"),contextIsolation:!0,nodeIntegration:!1,sandbox:!1}});On(n),await n.loadURL(`data:text/html;base64,${bn}`)});l();var Qn=require("electron");l();var Ln=require("module"),ri=(0,Ln.createRequire)("/"),Ve,ii=";var __w=require('worker_threads');__w.parentPort.on('message',function(m){onmessage({data:m})}),postMessage=function(m,t){__w.parentPort.postMessage(m,t)},close=process.exit;self=global";try{Ve=ri("worker_threads").Worker}catch{}var oi=Ve?function(e,t,n,r,i){var a=!1,o=new Ve(e+ii,{eval:!0}).on("error",function(s){return i(s,null)}).on("message",function(s){return i(null,s)}).on("exit",function(s){s&&!a&&i(new Error("exited with code "+s),null)});return o.postMessage(n,r),o.terminate=function(){return a=!0,Ve.prototype.terminate.call(o)},o}:function(e,t,n,r,i){setImmediate(function(){return i(new Error("async operations unsupported - update to Node 12+ (or Node 10-11 with the --experimental-worker CLI flag)"),null)});var a=function(){};return{terminate:a,postMessage:a}},w=Uint8Array,X=Uint16Array,xt=Uint32Array,Et=new w([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Dt=new w([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Nn=new w([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Fn=function(e,t){for(var n=new X(31),r=0;r<31;++r)n[r]=t+=1<<e[r-1];for(var i=new xt(n[30]),r=1;r<30;++r)for(var a=n[r];a<n[r+1];++a)i[a]=a-n[r]<<5|r;return[n,i]},Un=Fn(Et,2),bt=Un[0],ai=Un[1];bt[28]=258,ai[258]=28;var jn=Fn(Dt,0),zn=jn[0],Jo=jn[1],$e=new X(32768);for(h=0;h<32768;++h)z=(h&43690)>>>1|(h&21845)<<1,z=(z&52428)>>>2|(z&13107)<<2,z=(z&61680)>>>4|(z&3855)<<4,$e[h]=((z&65280)>>>8|(z&255)<<8)>>>1;var z,h,me=function(e,t,n){for(var r=e.length,i=0,a=new X(t);i<r;++i)e[i]&&++a[e[i]-1];var o=new X(t);for(i=0;i<t;++i)o[i]=o[i-1]+a[i-1]<<1;var s;if(n){s=new X(1<<t);var c=15-t;for(i=0;i<r;++i)if(e[i])for(var u=i<<4|e[i],f=t-e[i],m=o[e[i]-1]++<<f,x=m|(1<<f)-1;m<=x;++m)s[$e[m]>>>c]=u}else for(s=new X(r),i=0;i<r;++i)e[i]&&(s[i]=$e[o[e[i]-1]++]>>>15-e[i]);return s},De=new w(288);for(h=0;h<144;++h)De[h]=8;var h;for(h=144;h<256;++h)De[h]=9;var h;for(h=256;h<280;++h)De[h]=7;var h;for(h=280;h<288;++h)De[h]=8;var h,Zn=new w(32);for(h=0;h<32;++h)Zn[h]=5;var h;var Bn=me(De,9,1);var Vn=me(Zn,5,1),He=function(e){for(var t=e[0],n=1;n<e.length;++n)e[n]>t&&(t=e[n]);return t},P=function(e,t,n){var r=t/8|0;return(e[r]|e[r+1]<<8)>>(t&7)&n},We=function(e,t){var n=t/8|0;return(e[n]|e[n+1]<<8|e[n+2]<<16)>>(t&7)},Hn=function(e){return(e+7)/8|0},Ke=function(e,t,n){(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length);var r=new(e.BYTES_PER_ELEMENT==2?X:e.BYTES_PER_ELEMENT==4?xt:w)(n-t);return r.set(e.subarray(t,n)),r};var Wn=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],T=function(e,t,n){var r=new Error(t||Wn[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,T),!n)throw r;return r},$n=function(e,t,n){var r=e.length;if(!r||n&&n.f&&!n.l)return t||new w(0);var i=!t||n,a=!n||n.i;n||(n={}),t||(t=new w(r*3));var o=function(Rt){var Gt=t.length;if(Rt>Gt){var Lt=new w(Math.max(Gt*2,Rt));Lt.set(t),t=Lt}},s=n.f||0,c=n.p||0,u=n.b||0,f=n.l,m=n.d,x=n.m,N=n.n,Z=r*8;do{if(!f){s=P(e,c,1);var B=P(e,c+1,3);if(c+=3,B)if(B==1)f=Bn,m=Vn,x=9,N=5;else if(B==2){var M=P(e,c,31)+257,E=P(e,c+10,15)+4,D=M+P(e,c+5,31)+1;c+=14;for(var S=new w(D),b=new w(19),y=0;y<E;++y)b[Nn[y]]=P(e,c+y*3,7);c+=E*3;for(var F=He(b),be=(1<<F)-1,ie=me(b,F,1),y=0;y<D;){var Ie=ie[P(e,c,be)];c+=Ie&15;var d=Ie>>>4;if(d<16)S[y++]=d;else{var oe=0,ke=0;for(d==16?(ke=3+P(e,c,3),c+=2,oe=S[y-1]):d==17?(ke=3+P(e,c,7),c+=3):d==18&&(ke=11+P(e,c,127),c+=7);ke--;)S[y++]=oe}}var _t=S.subarray(0,M),V=S.subarray(M);x=He(_t),N=He(V),f=me(_t,x,1),m=me(V,N,1)}else T(1);else{var d=Hn(c)+4,I=e[d-4]|e[d-3]<<8,C=d+I;if(C>r){a&&T(0);break}i&&o(u+I),t.set(e.subarray(d,C),u),n.b=u+=I,n.p=c=C*8,n.f=s;continue}if(c>Z){a&&T(0);break}}i&&o(u+131072);for(var rr=(1<<x)-1,ir=(1<<N)-1,Ye=c;;Ye=c){var oe=f[We(e,c)&rr],ae=oe>>>4;if(c+=oe&15,c>Z){a&&T(0);break}if(oe||T(2),ae<256)t[u++]=ae;else if(ae==256){Ye=c,f=null;break}else{var Ot=ae-254;if(ae>264){var y=ae-257,ye=Et[y];Ot=P(e,c,(1<<ye)-1)+bt[y],c+=ye}var Je=m[We(e,c)&ir],Xe=Je>>>4;Je||T(3),c+=Je&15;var V=zn[Xe];if(Xe>3){var ye=Dt[Xe];V+=We(e,c)&(1<<ye)-1,c+=ye}if(c>Z){a&&T(0);break}i&&o(u+131072);for(var Mt=u+Ot;u<Mt;u+=4)t[u]=t[u-V],t[u+1]=t[u+1-V],t[u+2]=t[u+2-V],t[u+3]=t[u+3-V];u=Mt}}n.l=f,n.p=Ye,n.b=u,n.f=s,f&&(s=1,n.m=x,n.d=m,n.n=N)}while(!s);return u==t.length?t:Ke(t,0,u)};var si=new w(0);var ci=function(e,t){var n={};for(var r in e)n[r]=e[r];for(var r in t)n[r]=t[r];return n},Rn=function(e,t,n){for(var r=e(),i=e.toString(),a=i.slice(i.indexOf("[")+1,i.lastIndexOf("]")).replace(/\s+/g,"").split(","),o=0;o<r.length;++o){var s=r[o],c=a[o];if(typeof s=="function"){t+=";"+c+"=";var u=s.toString();if(s.prototype)if(u.indexOf("[native code]")!=-1){var f=u.indexOf(" ",8)+1;t+=u.slice(f,u.indexOf("(",f))}else{t+=u;for(var m in s.prototype)t+=";"+c+".prototype."+m+"="+s.prototype[m].toString()}else t+=u}else n[c]=s}return[t,n]},Be=[],li=function(e){var t=[];for(var n in e)e[n].buffer&&t.push((e[n]=new e[n].constructor(e[n])).buffer);return t},ui=function(e,t,n,r){var i;if(!Be[n]){for(var a="",o={},s=e.length-1,c=0;c<s;++c)i=Rn(e[c],a,o),a=i[0],o=i[1];Be[n]=Rn(e[s],a,o)}var u=ci({},Be[n][1]);return oi(Be[n][0]+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+t.toString()+"}",n,u,li(u),r)},fi=function(){return[w,X,xt,Et,Dt,Nn,bt,zn,Bn,Vn,$e,Wn,me,He,P,We,Hn,Ke,T,$n,kt,Kn,Yn]};var Kn=function(e){return postMessage(e,[e.buffer])},Yn=function(e){return e&&e.size&&new w(e.size)},pi=function(e,t,n,r,i,a){var o=ui(n,r,i,function(s,c){o.terminate(),a(s,c)});return o.postMessage([e,t],t.consume?[e.buffer]:[]),function(){o.terminate()}};var G=function(e,t){return e[t]|e[t+1]<<8},O=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},St=function(e,t){return O(e,t)+O(e,t+4)*4294967296};function gi(e,t,n){return n||(n=t,t={}),typeof n!="function"&&T(7),pi(e,t,[fi],function(r){return Kn(kt(r.data[0],Yn(r.data[1])))},1,n)}function kt(e,t){return $n(e,t)}var Tt=typeof TextDecoder<"u"&&new TextDecoder,hi=0;try{Tt.decode(si,{stream:!0}),hi=1}catch{}var di=function(e){for(var t="",n=0;;){var r=e[n++],i=(r>127)+(r>223)+(r>239);if(n+i>e.length)return[t,Ke(e,n-1)];i?i==3?(r=((r&15)<<18|(e[n++]&63)<<12|(e[n++]&63)<<6|e[n++]&63)-65536,t+=String.fromCharCode(55296|r>>10,56320|r&1023)):i&1?t+=String.fromCharCode((r&31)<<6|e[n++]&63):t+=String.fromCharCode((r&15)<<12|(e[n++]&63)<<6|e[n++]&63):t+=String.fromCharCode(r)}};function mi(e,t){if(t){for(var n="",r=0;r<e.length;r+=16384)n+=String.fromCharCode.apply(null,e.subarray(r,r+16384));return n}else{if(Tt)return Tt.decode(e);var i=di(e),a=i[0],o=i[1];return o.length&&T(8),a}}var vi=function(e,t){return t+30+G(e,t+26)+G(e,t+28)},Ii=function(e,t,n){var r=G(e,t+28),i=mi(e.subarray(t+46,t+46+r),!(G(e,t+8)&2048)),a=t+46+r,o=O(e,t+20),s=n&&o==4294967295?yi(e,a):[o,O(e,t+24),O(e,t+42)],c=s[0],u=s[1],f=s[2];return[G(e,t+10),c,u,i,a+G(e,t+30)+G(e,t+32),f]},yi=function(e,t){for(;G(e,t)!=1;t+=4+G(e,t+2));return[St(e,t+12),St(e,t+4),St(e,t+20)]};var Gn=typeof queueMicrotask=="function"?queueMicrotask:typeof setTimeout=="function"?setTimeout:function(e){e()};function Jn(e,t,n){n||(n=t,t={}),typeof n!="function"&&T(7);var r=[],i=function(){for(var d=0;d<r.length;++d)r[d]()},a={},o=function(d,I){Gn(function(){n(d,I)})};Gn(function(){o=n});for(var s=e.length-22;O(e,s)!=101010256;--s)if(!s||e.length-s>65558)return o(T(13,0,1),null),i;var c=G(e,s+8);if(c){var u=c,f=O(e,s+16),m=f==4294967295||u==65535;if(m){var x=O(e,s-12);m=O(e,x)==101075792,m&&(u=c=O(e,x+32),f=O(e,x+48))}for(var N=t&&t.filter,Z=function(d){var I=Ii(e,f,m),C=I[0],M=I[1],E=I[2],D=I[3],S=I[4],b=I[5],y=vi(e,b);f=S;var F=function(ie,Ie){ie?(i(),o(ie,null)):(Ie&&(a[D]=Ie),--c||o(null,a))};if(!N||N({name:D,size:M,originalSize:E,compression:C}))if(!C)F(null,Ke(e,y,y+M));else if(C==8){var be=e.subarray(y,y+M);if(M<32e4)try{F(null,kt(be,new w(E)))}catch(ie){F(ie,null)}else r.push(gi(be,{size:E},F))}else F(T(14,"unknown compression type "+C,1),null);else F(null,null)},B=0;B<u;++B)Z(B)}else o(null,{});return i}var er=require("fs"),L=require("fs/promises"),ve=require("path");l();function Xn(e){function t(o,s,c,u){let f=0;return f+=o<<0,f+=s<<8,f+=c<<16,f+=u<<24>>>0,f}if(e[0]===80&&e[1]===75&&e[2]===3&&e[3]===4)return e;if(e[0]!==67||e[1]!==114||e[2]!==50||e[3]!==52)throw new Error("Invalid header: Does not start with Cr24");let n=e[4]===3,r=e[4]===2;if(!r&&!n||e[5]||e[6]||e[7])throw new Error("Unexpected crx format version number.");if(r){let o=t(e[8],e[9],e[10],e[11]),s=t(e[12],e[13],e[14],e[15]),c=16+o+s;return e.subarray(c,e.length)}let a=12+t(e[8],e[9],e[10],e[11]);return e.subarray(a,e.length)}l();var qn=W(require("https"));function Pt(e,t={}){return new Promise((n,r)=>{qn.default.get(e,t,i=>{let{statusCode:a,statusMessage:o,headers:s}=i;if(a>=400)return void r(`${a}: ${o} - ${e}`);if(a>=300)return void n(Pt(s.location,t));let c=[];i.on("error",r),i.on("data",u=>c.push(u)),i.once("end",()=>n(Buffer.concat(c)))})})}var Ai=(0,ve.join)(ce,"ExtensionCache");async function Ci(e,t){return await(0,L.mkdir)(t,{recursive:!0}),new Promise((n,r)=>{Jn(e,(i,a)=>{if(i)return void r(i);Promise.all(Object.keys(a).map(async o=>{if(o.startsWith("_metadata/"))return;if(o.endsWith("/"))return void(0,L.mkdir)((0,ve.join)(t,o),{recursive:!0});let s=o.split("/"),c=s.pop(),u=s.join("/"),f=(0,ve.join)(t,u);u&&await(0,L.mkdir)(f,{recursive:!0}),await(0,L.writeFile)((0,ve.join)(f,c),a[o])})).then(()=>n()).catch(o=>{(0,L.rm)(t,{recursive:!0,force:!0}),r(o)})})})}async function tr(e){let t=(0,ve.join)(Ai,`${e}`);try{await(0,L.access)(t,er.constants.F_OK)}catch{let r=e==="fmkadmapgofadopljbjfkapdkoienihi"?"https://raw.githubusercontent.com/Vendicated/random-files/f6f550e4c58ac5f2012095a130406c2ab25b984d/fmkadmapgofadopljbjfkapdkoienihi.zip":`https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&x=id%3D${e}%26uc&prodversion=32`,i=await Pt(r,{headers:{"User-Agent":"Suncord (https://github.com/verticalsync/Suncord)"}});await Ci(Xn(i),t).catch(console.error)}Qn.session.defaultSession.loadExtension(t)}re.app.whenReady().then(()=>{re.protocol.registerFileProtocol("vencord",({url:i},a)=>{let o=i.slice(10);if(o.endsWith("/")&&(o=o.slice(0,-1)),o.startsWith("/themes/")){let s=o.slice(8),c=wt(q,s);if(!c){a({statusCode:403});return}a(c.replace(/\?v=\d+$/,""));return}switch(o){case"renderer.js.map":case"vencordDesktopRenderer.js.map":case"preload.js.map":case"vencordDesktopPreload.js.map":case"patcher.js.map":case"vencordDesktopMain.js.map":a((0,nr.join)(__dirname,o));break;default:a({statusCode:403})}});try{k.store.enableReactDevtools&&tr("fmkadmapgofadopljbjfkapdkoienihi").then(()=>console.info("[Suncord] Installed React Developer Tools")).catch(i=>console.error("[Suncord] Failed to install React Developer Tools",i))}catch{}let e=(i,a)=>Object.keys(i).find(o=>o.toLowerCase()===a),t=i=>{let a={};return i.split(";").forEach(o=>{let[s,...c]=o.trim().split(/\s+/g);s&&!Object.prototype.hasOwnProperty.call(a,s)&&(a[s]=c)}),a},n=i=>Object.entries(i).filter(([,a])=>a?.length).map(a=>a.flat().join(" ")).join("; "),r=i=>{let a=e(i,"content-security-policy");if(a){let o=t(i[a][0]);for(let s of["style-src","connect-src","img-src","font-src","media-src","worker-src"])o[s]??=[],o[s].push("*","blob:","data:","vencord:","'unsafe-inline'");o["script-src"]??=[],o["script-src"].push("'unsafe-eval'","https://unpkg.com","https://cdnjs.cloudflare.com"),i[a]=[n(o)]}};re.session.defaultSession.webRequest.onHeadersReceived(({responseHeaders:i,resourceType:a},o)=>{if(i&&(a==="mainFrame"&&r(i),a==="stylesheet")){let s=e(i,"content-type");s&&(i[s]=["text/css"])}o({cancel:!1,responseHeaders:i})}),re.session.defaultSession.webRequest.onHeadersReceived=()=>{}});
//# sourceURL=VencordDesktopMain
//# sourceMappingURL=vencord://vencordDesktopMain.js.map
/*! For license information please see vencordDesktopMain.js.LEGAL.txt */

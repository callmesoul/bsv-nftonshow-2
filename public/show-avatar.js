var r=Object.defineProperty;var l=(o,t,e)=>t in o?r(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var s=(o,t,e)=>(l(o,typeof t!="symbol"?t+"":t,e),e);const i=document.createElement("template");i.innerHTML=`
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50">
        <clipPath id="crossPath" clipPathUnits="userSpaceOnUse">
          <path id="cross-path" d="M31,6c18.167,0,25,6.833,25,25S49.167,56,31,56,6,49.167,6,31,12.833,6,31,6Z" transform="translate(-6 -6)"></path>
        </clipPath>
        <image xlink:href="https://showman.metaidservices.com/metafile/avatar/b89840e798b334e4f2d5279b6a325b411125e927f2dba16af4208d827ede8e11?time=1643015890624" width="50" height="50" style="clip-path: url(#crossPath);"/>
 </svg>
`;const f=document.createElement("template");f.innerHTML=`
<svg id="photo_line2" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50">
        <style>
        #photo_line {
          stroke: url('#circle-gradient');
        }
        </style>
        <defs>
          <linearGradient id="circle-gradient" x1="50%" y1="0%" x2="75%" y2="100%"> 
                  <stop offset="0%" stop-color="#F79533">
                  </stop>
           <stop offset="24.1%" stop-color="#ff10f6">
                  </stop>
           <stop offset="47.8%" stop-color="#4bd6ff">
                  </stop>
      
                  <stop offset="75.4%" stop-color="#ff46f1">
                  </stop>
           <stop offset="100%" stop-color="#ffe310">
                  </stop>
              </linearGradient>
              <linearGradient id="logo-gradient-animate" x1="50%" y1="0%" x2="75%" y2="100%"> 
                  <stop offset="0%" stop-color="#F79533">
                      <animate attributeName="stop-color" values="#F79533; #ff10f6; #4bd6ff; #ff46f1; #ffe310;" dur="4s" repeatCount="indefinite"></animate>
                  </stop>
           <stop offset="24.1%" stop-color="#ff10f6">
                      <animate attributeName="stop-color" values="#F79533; #ff10f6; #4bd6ff; #ff46f1; #ffe310;" dur="4s" repeatCount="indefinite"></animate>
                  </stop>
           <stop offset="47.8%" stop-color="#4bd6ff">
                      <animate attributeName="stop-color" values="#F79533; #ff10f6; #4bd6ff; #ff46f1; #ffe310;" dur="4s" repeatCount="indefinite"></animate>
                  </stop>
      
                  <stop offset="75.4%" stop-color="#ff46f1">
                      <animate attributeName="stop-color" values="#F79533; #ff10f6; #4bd6ff; #ff46f1; #ffe310;" dur="4s" repeatCount="indefinite"></animate>
                  </stop>
           <stop offset="100%" stop-color="#ffe310">
                      <animate attributeName="stop-color" values="#F79533; #ff10f6; #4bd6ff; #ff46f1; #ffe310;" dur="4s" repeatCount="indefinite"></animate>
                  </stop>
              </linearGradient> 
      
        </defs>
        <path id="photo_line" d="M31,6.8c-9.07,0-15.027,1.733-18.747,5.453S6.8,21.93,6.8,31s1.733,15.027,5.453,18.747S21.93,55.2,31,55.2s15.027-1.733,18.747-5.453S55.2,40.07,55.2,31s-1.733-15.027-5.453-18.747S40.07,6.8,31,6.8M31,6c18.167,0,25,6.833,25,25S49.167,56,31,56,6,49.167,6,31,12.833,6,31,6Z" transform="translate(-6 -6)" fill="url(#radial-gradient)"/>
      </svg>
`;class n extends HTMLElement{constructor(){super();s(this,"shadowRoot");s(this,"showAvatar");this.shadowRoot=this.attachShadow({mode:"closed"});const t=document.createElement("div");t.className="show-avatar",t.style.position="absolute",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.left="0px",t.style.top="0px",t.style.width="100%",t.style.height="100%",this.shadowRoot.appendChild(t),this.showAvatar=this.shadowRoot.querySelector(".show-avatar"),this.render()}static get observedAttributes(){return["size","src","type","disabled"]}attributeChangedCallback(t,e,a){console.log("attributeChangedCallback"),console.log(t),console.log(a),this[t]=a,this.render()}connectedCallback(){}disconnectedCallback(){}adoptedCallback(){}render(){this.showAvatar.innerHTML="";const t=i.content.cloneNode(!0);if(t.querySelector("image").setAttribute("xlink:href",this.src),this.type==="nft-metabot"){t.style.width="96%",t.style.marginLeft="2%";const e=f.content.cloneNode(!0);this.showAvatar.append(e)}this.showAvatar.append(t)}}customElements.define("custom-card",n);

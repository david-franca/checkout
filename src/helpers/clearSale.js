export function initializeClearSale(a, b, c, d, e, f, g) {
  a["CsdpObject"] = e;
  a[e] =
    a[e] ||
    function () {
      (a[e].q = a[e].q || []).push(arguments);
    };
  a[e].l = 1 * new Date();
  f = b.createElement(c);
  g = b.getElementsByTagName(c)[0];
  f.async = 1;
  f.src = d;
  g.parentNode.insertBefore(f, g);
}

export function setApp(csdp, appName) {
  csdp("app", appName);
}

export function setSessionId(csdp, sessionId) {
  csdp("sessionid", sessionId);
  
}

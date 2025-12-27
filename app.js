/*************************************************
 * AWS Mobile Role Switch – app.js
 * Purpose:
 * - List AWS accounts/roles
 * - One-tap switch role using AWS native switch URL
 * - PROD safety confirmation
 *************************************************/

/* ===============================
   ROLE DEFINITIONS (EDIT HERE)
   =============================== */

const roles = [

  /* ========= POWERUSER : PROD (US) ========= */
  { name: "Oseries-SharedProd", account: "159423294071", role: "vtx-PowerUser", type: "prod" },
  { name: "Oseries-Prod01",     account: "525924345782", role: "vtx-PowerUser", type: "prod" },
  { name: "Oseries-Prod02",     account: "368747541794", role: "vtx-PowerUser", type: "prod" },
  { name: "Oseries-Prod03",     account: "040723055341", role: "vtx-PowerUser", type: "prod" },
  { name: "Oseries-Prod04",     account: "039770783084", role: "vtx-PowerUser", type: "prod" },
  { name: "Oseries-Prod05",     account: "747872739151", role: "vtx-PowerUser", type: "prod" },
  { name: "Oseries-Prod06",     account: "859570592480", role: "vtx-PowerUser", type: "prod" },
  { name: "Oseries-Prod07",     account: "711388277509", role: "vtx-PowerUser", type: "prod" },
  { name: "Oseries-Prod08",     account: "439574167390", role: "vtx-PowerUser", type: "prod" },
  { name: "Oseries-Prod09",     account: "869632460519", role: "vtx-PowerUser", type: "prod" },
  { name: "Oseries-Prod10",     account: "744476626904", role: "vtx-PowerUser", type: "prod" },
  { name: "Oseries-Prod11",     account: "548934507166", role: "vtx-PowerUser", type: "prod" },
  { name: "Oseries-Prod12",     account: "174380704324", role: "vtx-PowerUser", type: "prod" },
  { name: "Oseries-Prod13",     account: "908801752877", role: "vtx-PowerUser", type: "prod" },

  /* ========= POWERUSER : EU PROD ========= */
  { name: "EU-Prod01",          account: "762498934581", role: "vtx-PowerUser", type: "prod" },
  { name: "EU-Prod02",          account: "113121726653", role: "vtx-PowerUser", type: "prod" },

  /* ========= DR ========= */
  { name: "OnDemand-DR",        account: "273160521547", role: "vtx-PowerUser", type: "prod" },

  /* ========= READ ONLY ========= */
  { name: "Cloud-Prod-RO",      account: "409148389496", role: "vtx-ReadOnly",  type: "readonly" }

];


/* ===============================
   RENDER LOGIC (DO NOT EDIT)
   =============================== */

const container = document.getElementById("roles");

roles.forEach(r => {
  const btn = document.createElement("button");
  btn.textContent = r.name;

  /* Apply styling based on environment */
  if (r.type === "prod") {
    btn.className = "prod";
  } else if (r.type === "readonly") {
    btn.className = "readonly";
  } else {
    btn.className = "nonprod";
  }

  /* Click handler */
  btn.onclick = () => {

    /* Extra safety for PROD */
    if (r.type === "prod") {
      const proceed = confirm(
        "⚠️  PRODUCTION ENVIRONMENT\n\n" +
        `Account: ${r.name}\n\n` +
        "Are you sure you want to continue?"
      );
      if (!proceed) return;
    }

    /* AWS native switch-role URL */
    const switchUrl =
      "https://signin.aws.amazon.com/switchrole?" +
      "account=" + r.account +
      "&roleName=" + r.role +
      "&displayName=" + encodeURIComponent(r.name);

    window.location.href = switchUrl;
  };

  container.appendChild(btn);
});

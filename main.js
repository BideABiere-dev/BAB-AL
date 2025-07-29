const supabaseUrl = "https://qxyvxsennasbxzwhluky.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4eXZ4c2VubmFzYnh6d2hsdWt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NTEwOTcsImV4cCI6MjA2OTAyNzA5N30.2ZeSzacrYH-3tEqqvezBbovvJrxlazbLvO6vZDgjEQE";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

const pages = ["dashboard", "courses", "recettes", "calendrier", "energie"];

async function navigateTo(pageId) {
  const html = await fetch(`${pageId}.html`).then(res => res.text());
  document.getElementById("main-content").innerHTML = html;

  // Charge le script associé s’il existe
  const scriptPath = `${pageId}.js`;
  fetch(scriptPath).then(r => {
    if (r.ok) {
      const script = document.createElement("script");
      script.src = scriptPath;
      document.body.appendChild(script);
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  navigateTo("dashboard");
});

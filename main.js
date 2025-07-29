
const supabaseUrl = "https://qxyvxsennasbxzwhluky.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4eXZ4c2VubmFzYnh6d2hsdWt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NTEwOTcsImV4cCI6MjA2OTAyNzA5N30.2ZeSzacrYH-3tEqqvezBbovvJrxlazbLvO6vZDgjEQE";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function navigateTo(pageId) {
  let html = await fetch(`${pageId}.html`).then(res => res.text());

  // Injecte le code JS directement dans la page si elle correspond à un module
  if (pageId === "courses") {
    html += `<script>${await fetch("courses.js").then(r => r.text())}</script>`;
  }

  document.getElementById("main-content").innerHTML = html;
}

window.addEventListener("DOMContentLoaded", () => {
  navigateTo("dashboard");
});

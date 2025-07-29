
const supabaseUrl = "https://qxyvxsennasbxzwhluky.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4eXZ4c2VubmFzYnh6d2hsdWt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NTEwOTcsImV4cCI6MjA2OTAyNzA5N30.2ZeSzacrYH-3tEqqvezBbovvJrxlazbLvO6vZDgjEQE";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function navigateTo(pageId) {
  const container = document.getElementById("main-content");

  const html = await fetch(`${pageId}.html`).then(res => res.text());
  container.innerHTML = html;

  if (pageId === "courses") {
    const script = document.createElement("script");
    script.src = "courses.js";
    script.onload = () => {
      if (typeof loadItems === "function") {
        loadItems();
      }
    };
    document.body.appendChild(script);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  navigateTo("dashboard");
});

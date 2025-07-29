const supabaseUrl = "https://qxyvxsennasbxzwhluky.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4eXZ4c2VubmFzYnh6d2hsdWt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NTEwOTcsImV4cCI6MjA2OTAyNzA5N30.2ZeSzacrYH-3tEqqvezBbovvJrxlazbLvO6vZDgjEQE";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

function navigateTo(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });
  document.getElementById(pageId).classList.add("active");

  if (pageId === "courses") {
    setTimeout(loadItems, 0);
  }
}

async function addItem() {
  const itemInput = document.getElementById("itemInput");
  const item = itemInput.value.trim();
  if (item === "") return;

  const { error } = await supabase.from("Courses").insert([{ nom: item }]);

  if (!error) {
    itemInput.value = "";
    loadItems();
  }
}

async function loadItems() {
  const { data, error } = await supabase
    .from("Courses")
    .select("*")
    .order("created_at", { ascending: true });

  const list = document.getElementById("list");
  list.innerHTML = "";

  if (data) {
    data.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.nom;
      list.appendChild(li);
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  navigateTo("dashboard");
});

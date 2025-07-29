
async function addItem() {
  const itemInput = document.getElementById("itemInput");
  const item = itemInput.value.trim();
  if (item === "") return;

  const { error } = await supabase.from("Courses").insert([{ item: item }]);

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
  if (!list) return;

  list.innerHTML = "";

  if (data) {
    data.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.item;
      list.appendChild(li);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadItems();
});

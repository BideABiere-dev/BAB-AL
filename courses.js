async function addItem() {
  const itemInput = document.getElementById("itemInput");
  const quantityInput = document.getElementById("quantityInput");
  const item = itemInput.value.trim();
  const quantity = parseInt(quantityInput.value);

  if (!item || isNaN(quantity) || quantity < 1) return;

  await supabase.from("Courses").insert([{ item, quantity, isChecked: false }]);
  itemInput.value = "";
  quantityInput.value = 1;
  loadItems();
}

async function loadItems() {
  const { data, error } = await supabase.from("Courses").select("*").order("created_at", { ascending: true });
  if (error) return console.error(error);

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach((item) => {
    const li = document.createElement("li");
    li.className = "course-item";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = async () => {
      const confirmDelete = confirm("Supprimer cet article ?");
      if (confirmDelete) {
        await supabase.from("Courses").delete().eq("id", item.id);
        loadItems();
      }
    };

    const span = document.createElement("span");
    span.textContent = item.item;

    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.value = item.quantity ?? 1;
    quantityInput.min = 1;
    quantityInput.onchange = async () => {
      await supabase.from("Courses").update({ quantity: parseInt(quantityInput.value) }).eq("id", item.id);
    };

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.isChecked;
    checkbox.className = "course-checkbox";
    checkbox.onchange = async () => {
      await supabase.from("Courses").update({ isChecked: checkbox.checked }).eq("id", item.id);
    };

    li.append(deleteBtn, span, quantityInput, checkbox);
    list.appendChild(li);
  });
}

async function validateItems() {
  const { data } = await supabase.from("Courses").select("id, isChecked");
  const toDelete = data.filter(item => item.isChecked).map(item => item.id);

  if (toDelete.length && confirm("Êtes-vous sûr de vouloir valider ces achats ?")) {
    await supabase.from("Courses").delete().in("id", toDelete);
    loadItems();
  }
}

loadItems();

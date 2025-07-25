// Config Supabase
// Initialisation correcte de Supabase
const { createClient } = supabase;

const supabaseClient = createClient(
  'https://qxyvxsennasbxzwhluky.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4eXZ4c2VubmFzYnh6d2hsdWt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NTEwOTcsImV4cCI6MjA2OTAyNzA5N30.2ZeSzacrYH-3tEqqvezBbovvJrxlazbLvO6vZDgjEQE'
);

// Ajouter un nouvel item
async function addItem() {
  const value = document.getElementById('itemInput').value.trim();
  if (!value) return;

  await supabaseClient.from('Courses').insert([{ item: value }]);
  document.getElementById('itemInput').value = '';
  loadItems();
}

// Supprimer un item
async function removeItem(id) {
  await supabaseClient.from('Courses').delete().eq('id', id);
  loadItems();
}

// Afficher la liste
async function loadItems() {
  const { data, error } = await supabaseClient
    .from('Courses')
    .select('*')
    .order('created_at', { ascending: true });

  const list = document.getElementById('list');
  list.innerHTML = '';
  data.forEach(row => {
    const li = document.createElement('li');
    li.innerHTML = `${row.item} <button onclick="removeItem('${row.id}')">X</button>`;
    list.appendChild(li);
  });
}

// Charger au démarrage
loadItems();

// Écoute les changements sur la table "Courses"
supabaseClient
  .channel('courses-changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'Courses',
    },
    (payload) => {
      console.log('🔄 Changement détecté:', payload);
      loadItems();
    }
  )
  .subscribe();

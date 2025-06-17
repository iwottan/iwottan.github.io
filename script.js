document.getElementById('filter-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const params = new URLSearchParams({
    cuisine: document.getElementById('cuisine').value,
    meal: document.getElementById('meal').value,
    vegetarian: document.getElementById('vegetarian').checked ? 1 : 0
  });

  const response = await fetch(`recipes.php?${params.toString()}`);
  if (!response.ok) {
    document.getElementById('result').textContent = 'Error fetching recipe.';
    return;
  }

  const data = await response.json();
  if (data) {
    document.getElementById('result').innerHTML = `<h2>${data.name}</h2><p><strong>Cuisine:</strong> ${data.cuisine} | <strong>Meal:</strong> ${data.meal} | <strong>Vegetarian:</strong> ${data.vegetarian ? 'Yes' : 'No'}</p>`;
  } else {
    document.getElementById('result').textContent = 'No recipe found for given criteria.';
  }
});

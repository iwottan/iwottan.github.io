document.getElementById('filter-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const apiKey = document.getElementById('api-key').value.trim();
  const cuisine = document.getElementById('cuisine').value;
  const meal = document.getElementById('meal').value.toLowerCase();
  const vegetarian = document.getElementById('vegetarian').checked;

  const tags = [];
  if (cuisine) tags.push(cuisine);
  if (meal) tags.push(meal);
  if (vegetarian) tags.push('vegetarian');

  const url = `https://api.perplexity.ai/v2/recipes/random?tags=${encodeURIComponent(tags.join(','))}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();
    const recipe = data.recipe || (data.recipes && data.recipes[0]);
    if (recipe) {
      document.getElementById('result').innerHTML = `<h2>${recipe.title}</h2>` +
        `<img src="${recipe.image}" alt="${recipe.title}" width="300">` +
        `<p><strong>Cuisine:</strong> ${recipe.cuisines.join(', ') || 'N/A'} | ` +
        `<strong>Meal:</strong> ${recipe.dishTypes.join(', ') || 'N/A'} | ` +
        `<strong>Vegetarian:</strong> ${recipe.vegetarian ? 'Yes' : 'No'}</p>`;
    } else {
      document.getElementById('result').textContent = 'No recipe found for given criteria.';
    }
  } catch (err) {
    document.getElementById('result').textContent = 'Error fetching recipe.';
  }
});

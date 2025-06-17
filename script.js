// Integration with Perplexity Chat API to fetch random recipes

document.getElementById('filter-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const apiKey = document.getElementById('api-key').value.trim();
  const cuisine = document.getElementById('cuisine').value;
  const meal = document.getElementById('meal').value.toLowerCase();
  const vegetarian = document.getElementById('vegetarian').checked;

  if (!apiKey) {
    document.getElementById('result').textContent = 'API key is required.';
    return;
  }

  const conditions = [];
  if (cuisine) conditions.push(`${cuisine} cuisine`);
  if (meal) conditions.push(`suitable for ${meal}`);
  if (vegetarian) conditions.push('vegetarian');

  const prompt = conditions.length
    ? `Give me a random recipe that is ${conditions.join(' and ')}. `
    : 'Give me a random recipe.';

  const requestBody = {
    model: 'pplx-70b-chat',
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful chef assistant. Respond strictly in JSON with keys: title, cuisines, dishTypes, vegetarian, image.'
      },
      { role: 'user', content: prompt }
    ]
  };

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    let recipe = null;
    try {
      recipe = JSON.parse(content);
    } catch (_) {
      recipe = null;
    }

    if (recipe) {
      document.getElementById('result').innerHTML =
        `<h2>${recipe.title}</h2>` +
        `<img src="${recipe.image}" alt="${recipe.title}" width="300">` +
        `<p><strong>Cuisine:</strong> ${Array.isArray(recipe.cuisines) ? recipe.cuisines.join(', ') : 'N/A'} | ` +
        `<strong>Meal:</strong> ${Array.isArray(recipe.dishTypes) ? recipe.dishTypes.join(', ') : 'N/A'} | ` +
        `<strong>Vegetarian:</strong> ${recipe.vegetarian ? 'Yes' : 'No'}</p>`;
    } else {
      document.getElementById('result').textContent = 'No recipe generated.';
    }
  } catch (err) {
    document.getElementById('result').textContent = 'Error fetching recipe.';
  }
});

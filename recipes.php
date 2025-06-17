<?php
header('Content-Type: application/json');

$recipes = [
    ['name' => 'Spaghetti Carbonara', 'cuisine' => 'Italian', 'meal' => 'Dinner', 'vegetarian' => false],
    ['name' => 'Margherita Pizza', 'cuisine' => 'Italian', 'meal' => 'Lunch', 'vegetarian' => true],
    ['name' => 'Tacos al Pastor', 'cuisine' => 'Mexican', 'meal' => 'Dinner', 'vegetarian' => false],
    ['name' => 'Chilaquiles', 'cuisine' => 'Mexican', 'meal' => 'Breakfast', 'vegetarian' => true],
    ['name' => 'Kung Pao Chicken', 'cuisine' => 'Chinese', 'meal' => 'Dinner', 'vegetarian' => false],
    ['name' => 'Vegetable Stir Fry', 'cuisine' => 'Chinese', 'meal' => 'Lunch', 'vegetarian' => true],
];

$cuisine = isset($_GET['cuisine']) ? $_GET['cuisine'] : '';
$meal = isset($_GET['meal']) ? $_GET['meal'] : '';
$vegetarian = isset($_GET['vegetarian']) ? (bool)$_GET['vegetarian'] : false;

$filtered = array_filter($recipes, function($recipe) use ($cuisine, $meal, $vegetarian) {
    if ($cuisine && $recipe['cuisine'] !== $cuisine) {
        return false;
    }
    if ($meal && $recipe['meal'] !== $meal) {
        return false;
    }
    if ($vegetarian && !$recipe['vegetarian']) {
        return false;
    }
    return true;
});

if (empty($filtered)) {
    echo json_encode(null);
    exit;
}

$recipe = $filtered[array_rand($filtered)];
echo json_encode($recipe);

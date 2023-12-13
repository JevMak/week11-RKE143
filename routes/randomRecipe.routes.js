const express = require('express');
const db = require('../db');
const router = express.Router();

// Endpoint to get a random recipe
router.get('/', async (req, res) => {
    try {
        const recipeQuery = 'SELECT id, recipeName, imageURL, instructions FROM recipe ORDER BY RANDOM() LIMIT 1;';
        const recipeResult = await db.query(recipeQuery);
        const selectedRecipe = recipeResult.rows[0];

        const ingredientsQuery = 'SELECT b.ingredientName FROM ingredient b INNER JOIN IngredientInRecipe c ON b.id = c.ingredientId WHERE c.recipeId = $1;';
        const ingredientsResult = await db.query(ingredientsQuery, [selectedRecipe.id]);
        const ingredients = ingredientsResult.rows.map(element => element.ingredientname);

        const randomRecipe = {
            recipe: selectedRecipe,
            ingredients: ingredients
        };
        res.json(randomRecipe);
    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMessage: 'Internal Server error.' });
    }
});

// Endpoint to get all recipes with details
router.get('/all', async (req, res) => {
    const recipes = await db.query('SELECT a.recipeName, a.instructions, b.ingredientName FROM recipe a INNER JOIN IngredientInRecipe c ON a.id = c.recipeId INNER JOIN ingredient b ON b.id = c.ingredientId;');
    const recipeMap = {};

    for (const item of recipes.rows) {
        const { recipename, instructions, ingredientname } = item;
        if (!recipeMap[recipename]) {
            recipeMap[recipename] = {
                recipeName: recipename,
                instructions: instructions,
                ingredients: []
            };
        }
        recipeMap[recipename].ingredients.push(ingredientname);
    }

    const resultArray = Object.values(recipeMap);
    res.json(resultArray);
});

// Endpoint to search for a recipe by name
router.get('/search', async (req, res) => {
    const searchString = req.query.recipeName;
    console.log(searchString);

    const recipe = await db.query('SELECT a.recipeName, a.instructions, b.ingredientName FROM recipe a INNER JOIN IngredientInRecipe c ON a.id = c.recipeId INNER JOIN ingredient b ON b.id = c.ingredientId WHERE a.recipeName = $1', [searchString]);
    const recipeMap = {};

    for (const item of recipe.rows) {
        const { recipename, instructions, ingredientname } = item;
        if (!recipeMap[recipename]) {
            recipeMap[recipename] = {
                recipeName: recipename,
                instructions: instructions,
                ingredients: []
            };
        }
        recipeMap[recipename].ingredients.push(ingredientname);
    }

    const resultArray = Object.values(recipeMap);
    res.json(resultArray);
});

module.exports = router;

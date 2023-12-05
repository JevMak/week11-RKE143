-- Associate ingredients with Pumpkin Pasties (Recipe ID: 1)
INSERT INTO ingredientinrecipe (recipeid, ingredientid)
VALUES (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7);

-- Associate ingredients with Pumpkin Tartlets (Recipe ID: 2)
INSERT INTO ingredientinrecipe (recipeid, ingredientid)
VALUES (2, 1), (2, 8), (2, 9), (2, 3), (2, 4), (2, 10), (2, 11);

-- Associate ingredients with Creamy Pumpkin Soup (Recipe ID: 3)
INSERT INTO ingredientinrecipe (recipeid, ingredientid)
VALUES (3, 1), (3, 12), (3, 13), (3, 14), (3, 15), (3, 16);

-- Display the relationships
SELECT a.recipeName, b.ingredientName
FROM recipe a
INNER JOIN IngredientInRecipe c
ON a.id = c.recipeId
INNER JOIN ingredient b
ON b.id = c.ingredientId;

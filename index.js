"use strict";

const cakeRecipes = require("./cake-recipes.json");
const prompt = require("prompt-sync")();

let savedRecipes = [];

// Your functions here

// Function to Get Unique Authors
const getAllAuthors = (recipes) => {
  const authors = new Set();
  recipes.forEach((recipe) => authors.add(recipe.Author));
  return Array.from(authors);
};

// Function to Log Recipe Names
const logRecipeNames = (recipes) => {
  if (recipes.length === 0) {
    console.log("No recipes found");
    return;
  }
  recipes.forEach(({ Name }) => console.log(Name));
};

// Function to Get Recipes by Author
const getRecipesByAuthor = (recipes, author) => {
  return recipes.filter((recipe) => recipe.Author === author);
};

// Function: Return list of recipes that contain a spesific ingredient
const getRecipesByIngredient = (recipes, ingredient) => {
  return recipes.filter((recipe) =>
    recipe.Ingredients.some((ing) => ing.includes(ingredient))
  );
};

// Function: Return a single recipe by name and save it
const getRecipeByNameAndSave = (recipes, name) => {
  const recipe = recipes.find((recipe) => recipe.Name.includes(name));
  return recipe;
};

// Function to Get All Ingredients
const getAllSavedIngredients = () => {
  return Array.from(
    new Set(savedRecipes.flatMap((recipe) => recipe.Ingredients))
  );
  // return Array.from(new Set(savedRecipes.reduce((accumulator, recipe) => {
  //                                  return accumulator.concat(recipe.Ingredients);
  //                                }, [])));
};

// Part 2

const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-5) or 0 to exit: ");
  return parseInt(choice);
};

let choice;

do {
  choice = displayMenu();

  switch (choice) {
    case 1:
      console.log("The Authors are:\n");
      console.log(getAllAuthors(cakeRecipes));
      break;
    case 2:
      const author = prompt("Enter Authors name: ");
      console.log(`The recipes based on authors name ${author} are:\n`);
      logRecipeNames(getRecipesByAuthor(cakeRecipes, author));
      break;
    case 3:
      const ingredient = prompt("Enter an ingredient: ");
      console.log(`The recipes based on this ingredient ${ingredient} are:\n`);
      logRecipeNames(getRecipesByIngredient(cakeRecipes, ingredient));
      break;
    case 4:
      const recipeName = prompt("Enter a recipe name: ");

      const recipe = getRecipeByNameAndSave(cakeRecipes, recipeName);
      if (recipe) {
        console.log(`Details of recipe "${recipe.Name}":`, recipe);
        const SaveOption = prompt(
          "Would you like to save this recipe press Y: "
        );
        if (SaveOption === "Y") {
          savedRecipes.push(recipe);
          console.log(`Recipe "${recipe.Name}" saved successfully.`);
        }
      } else {
        console.log(`No recipe found with the name "${recipeName}"`);
      }
      break;

    case 5:
      console.log("All ingredients from saved recipes:");
      console.log(getAllSavedIngredients());
      break;
    case 0:
      console.log("Exiting...");
      break;
    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);

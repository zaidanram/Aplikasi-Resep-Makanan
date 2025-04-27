<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\RecipeResource;
use App\Models\Recipe;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    //
     public function index()
     {
         $recipes = Recipe::with (['photos', 'category'])->get();
         return RecipeResource::collection($recipes);
     }
 
     public function show(Recipe $recipe)
     {
         $recipe->load(['category', 'photos', 'author', 'tutorials','recipeIngredients.ingredient']);
         return new RecipeResource($recipe);
     }
    
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\RecipeResource;
use App\Models\Recipe;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    //
    public function index(Request $request) {
        $query = $request ->input('query');
        $recipes = Recipe::with('author')->where('name','LIKE',"%{$query}%")->get();
        return RecipeResource::collection($recipes);
    }
}

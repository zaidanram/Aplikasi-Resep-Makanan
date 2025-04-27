<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class RecipeIngredient extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'ingredient_id',
        'recipe_id',
    ];

    public function ingredient(): BelongsTo
    {
        return $this->belongsTo(Ingredient::class, 'ingredient_id');
    }

    public function recipe(): BelongsTo
    {
        return $this->belongsTo(Recipe::class,'recipe_id');
    }
}

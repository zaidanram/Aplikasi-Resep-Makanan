<?php

namespace App\Filament\Resources\RecipeAuthorResource\Pages;

use App\Filament\Resources\RecipeAuthorResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListRecipeAuthors extends ListRecords
{
    protected static string $resource = RecipeAuthorResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}

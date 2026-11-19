<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Brandology site
|--------------------------------------------------------------------------
|
| Pages are static React screens (resources/js/pages); their content lives in
| resources/js/Data, so there is no controller or database behind them.
| Every page exists twice: English at /page and Arabic at /ar/page.
|
*/

$pages = static function (): void {
    Route::inertia('/', 'home')->name('home');
    Route::inertia('about', 'about')->name('about');
    Route::inertia('services', 'services')->name('services');
    Route::get('services/{id}', fn (string $id) => Inertia::render('service-detail', ['id' => $id]))->name('services.show');
    Route::inertia('projects', 'projects')->name('projects');
    Route::inertia('projects/case-study', 'case-study')->name('projects.case-study');
    Route::inertia('safety-signs', 'safety-signs')->name('safety-signs');
    Route::get('safety-signs/{code}', fn (string $code) => Inertia::render('sign-detail', ['code' => $code]))->name('safety-signs.show');
    Route::inertia('clients', 'clients')->name('clients');
    Route::inertia('blog', 'blog')->name('blog');
    Route::get('blog/{id}', fn (string $id) => Inertia::render('post', ['id' => $id]))->name('blog.show');
    Route::inertia('contact', 'contact')->name('contact');
    Route::inertia('quote', 'quote')->name('quote');
};

// English
Route::group([], $pages);

// Arabic (right-to-left): same pages under /ar, route names prefixed with "ar."
Route::prefix('ar')->name('ar.')->group($pages);

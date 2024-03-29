<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('MainPage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/',[PostController::class ,'index'])->name('posts.index');

Route::get('/posts/createpost' , [PostController::class,'create'] )->name('createpost');
Route::post('/posts',[PostController::class , 'store'] )->name('posts.store'); 
Route::get('/posts/edit/{id}',[PostController::class , 'edit'])->name('edit');
Route::put('/posts/{id}',[PostController::class,'update'])->name('update');
Route::delete('/profile/userpost/{id}',[PostController::class, 'destroy'])->name('post.destroy');

// Route::get('/posts',[PostController::class , 'index'])->name('posts.index');
// Route::get('/posts/{id}',[PostController::class , 'show'])->name('show');
Route::middleware('auth')->group(function () {
    Route::get('/profile/userpost/{id}',[ProfileController::class , 'index'])->name('profile.index');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

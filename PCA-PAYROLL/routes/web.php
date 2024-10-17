<?php

use App\Http\Controllers\AdminPageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SSLController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/salary', function () {
    return Inertia::render('Salary');
})->middleware(['auth', 'verified'])->name('salary');

Route::get('/benefits', function () {
    return Inertia::render('Benefits');
})->middleware(['auth', 'verified'])->name('benefits');

Route::get('/loans', function () {
    return Inertia::render('Loans');
})->middleware(['auth', 'verified'])->name('loans');

Route::get('/records', function () {
    return Inertia::render('Records');
})->middleware(['auth', 'verified'])->name('records');

Route::get('/designations', function () {
    return Inertia::render('Designations');
})->middleware(['auth', 'verified'])->name('designations');

Route::get('/compensations', function () {
    return Inertia::render('Compensations');
})->middleware(['auth', 'verified'])->name('compensations');

Route::get('/deductions', function () {
    return Inertia::render('Deductions');
})->middleware(['auth', 'verified'])->name('deductions');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::prefix('admin')->group(function () {
    Route::get('dashboard', [AdminPageController::class, 'index'])->name('admin.dashboard');
    Route::get('compensations', [AdminPageController::class, 'compensations'])->name('admin.compensations');
    Route::get('ssl', [AdminPageController::class, 'ssl'])->name('admin.ssl');
    Route::post('ssl/store', [AdminPageController::class, 'ssl_addData'])->name('store.ssl');
});

require __DIR__ . '/auth.php';

<?php

use App\Http\Controllers\ProfileController;
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

//  Admin Routes

Route::get('/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/salary', function () {
    return Inertia::render('Admin/Salary');
})->middleware(['auth', 'verified'])->name('salary');

Route::get('/benefits', function () {
    return Inertia::render('Admin/Benefits');
})->middleware(['auth', 'verified'])->name('benefits');

Route::get('/loans', function () {
    return Inertia::render('Admin/Loans');
})->middleware(['auth', 'verified'])->name('loans');

Route::get('/records', function () {
    return Inertia::render('Admin/Records');
})->middleware(['auth', 'verified'])->name('records');

Route::get('/designations', function () {
    return Inertia::render('Admin/Designations');
})->middleware(['auth', 'verified'])->name('designations');

Route::get('/compensations', function () {
    return Inertia::render('Admin/Compensations');
})->middleware(['auth', 'verified'])->name('compensations');

Route::get('/deductions', function () {
    return Inertia::render('Admin/Deductions');
})->middleware(['auth', 'verified'])->name('deductions');

// Empoyee Routes


Route::get('/dashboard', function () {
    return Inertia::render('Employee/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/salary', function () {
    return Inertia::render('Employee/Salary');
})->middleware(['auth', 'verified'])->name('salary');

Route::get('/benefits', function () {
    return Inertia::render('Employee/Benefits');
})->middleware(['auth', 'verified'])->name('benefits');

Route::get('/loans', function () {
    return Inertia::render('Employee/Loans');
})->middleware(['auth', 'verified'])->name('loans');

Route::get('/records', function () {
    return Inertia::render('Employee/Records');
})->middleware(['auth', 'verified'])->name('records');

Route::get('/designations', function () {
    return Inertia::render('Employee/Designations');
})->middleware(['auth', 'verified'])->name('designations');

Route::get('/compensations', function () {
    return Inertia::render('Employee/Compensations');
})->middleware(['auth', 'verified'])->name('compensations');

Route::get('/deductions', function () {
    return Inertia::render('Employee/Deductions');
})->middleware(['auth', 'verified'])->name('deductions');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

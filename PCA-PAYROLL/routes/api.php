<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SSLController;

Route::prefix('admin')->group(function () {
    // SSL CRUD LIST
    Route::get('/ssl', [SSLController::class, 'index']);
    Route::get('/ssl/{salary_grade}', [SSLController::class, 'show']); // show specific ssl
    Route::post('ssl', [SSLController::class,'store']);
    Route::put('/ssl/{salary_grade}', [SSLController::class,'update']);
    Route::delete('/ssl/{salary_grade}', [SSLController::class,'destroy']);
});

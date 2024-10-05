<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminPageController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard');
    }

    public function compensations(): Response
    {
        return Inertia::render('Admin/Compensations');
    }
}

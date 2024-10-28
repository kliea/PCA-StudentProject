<?php

namespace App\Http\Controllers;

use App\Models\SSLModel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BioAdminPageController extends Controller
{

    public function index(): Response
    {
        return Inertia::render('BioAdmin/Dashboard');
    }

   
}

<?php

namespace App\Http\Controllers\Biometric;

use App\Http\Controllers\Controller;
use App\Models\TravelOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TravelOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $travelOrderData = TravelOrder::all();
        return Inertia::render('BioAdmin/TravelOrder', [
            'travelOrderData' => $travelOrderData,
            'message' => 'All the travel order data have been retrieved successfully.'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
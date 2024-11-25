<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DTREntry;
use App\Models\Employee;

class DTREntryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
		return;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
		$userId = $request[1];
		$logType = $request[2];
		$logDateTime = $request[3];

        return;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        return;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return;
    }
}

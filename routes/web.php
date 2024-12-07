<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Services\AttendanceLogger;
use Inertia\Inertia;

// Controllers: Payroll
use App\Http\Controllers\Payroll\AdminPageController;
use App\Http\Controllers\Payroll\SalaryGradeController;
use App\Http\Controllers\Payroll\AgencyShareController;
use App\Http\Controllers\Payroll\AppointmentController;
use App\Http\Controllers\Payroll\CompensationTypeController;
use App\Http\Controllers\Payroll\DeductionTypeController;
use App\Http\Controllers\Payroll\EmployeeController;
use App\Http\Controllers\Payroll\LoanController;
use App\Http\Controllers\Payroll\SummaryController;

// Controllers: Biometrics
use App\Http\Controllers\Biometrics\DailyTimeEntryController;


Route::get('/', function () {
    return Inertia::render('Payroll/Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/fetch-attendance', function () {
    $logger = new AttendanceLogger();
    $logs = $logger->getLog();

    return response()->json([
        'message' => 'Attendance logs fetched successfully',
        'data' => $logs,
    ]);
});

// Route::put('/autogenerate-today', DTREntryController::create());
Route::get('/autogenerate-today', [DailyTimeEntryController::class, 'create'])->name('generate-DTRs');


// BIOmetrics routes

Route::get('/bioadmin/dashboard', function () {
    return Inertia::render('BioAdmin/Dashboard');
})->name('admin.dashboardb');

Route::get('/bioadmin/attendancelist', function () {
    return Inertia::render('BioAdmin/AttendanceList');
})->name('admin.attendancelist');

Route::get('/bioadmin/attendancerecords', function () {
    return Inertia::render('BioAdmin/AttendanceRecord');
})->name('admin.attendancerecords');


// SUBDOMAIN FOR PAYROLL
Route::domain('payroll.' . env('APP_URL'))->group(function () {
    Route::prefix('admin')->group(function () {
        Route::get('dashboard', [AdminPageController::class, 'index'])->name('admin.dashboard');
        // PAYROLL ROUTES
        Route::get('payroll', [SummaryController::class, 'Summary'])->name('admin.payrolls');

        // LOANS ROUTES
        // Route::get('loans', [AdminPageController::class, 'loans'])->name('admin.loans');
        Route::get('loans', [LoanController::class, 'showEmployeeLoanDetails'])->name('admin.loans');


        // COMPENSATION ROUTES
        Route::get('compensations', [CompensationTypeController::class, 'index'])->name('admin.compensations');
        Route::post('compensations/store', [CompensationTypeController::class, 'store'])->name('store.compensations');
        Route::put('compensations/{compensation_code}', [CompensationTypeController::class, 'update'])->name('update.compensations');
        Route::delete('compensations/{compensation_code}', [CompensationTypeController::class, 'destroy'])->name('delete.compensations');
        // AGENCY ROUTES
        Route::get('governmentshares', [AgencyShareController::class, 'index'])->name('admin.governmentshare');
        Route::post('governmentshares/store', [AgencyShareController::class, 'store'])->name('store.governmentshare');
        Route::put('governmentshares/{agency_share_name}', [AgencyShareController::class, 'update'])->name('update.governmentshare');
        Route::delete('governmentshares/{agency_share_name}', [AgencyShareController::class, 'destroy'])->name('delete.governmentshare');
        Route::get('formats', [AdminPageController::class, 'format'])->name('admin.formats');

        // APPOINTMENT ROUTES
        Route::get('appointments', [AppointmentController::class, 'index'])->name('admin.appointment');
        Route::post('appointments/store', [AppointmentController::class, 'store'])->name('store.appointment');
        Route::put('appointments/{appointment_code}', [AppointmentController::class, 'update'])->name('update.appointment');
        Route::delete('appointments/{appointment_code}', [AppointmentController::class, 'destroy'])->name('delete.appointment');

        // DEDUCTIONS ROUTES
        Route::get('deductions', [DeductionTypeController::class, 'index'])->name('admin.deduction');
        Route::post('deductions/store', [DeductionTypeController::class, 'store'])->name('store.deduction');
        Route::put('deductions/{deduction_code}', [DeductionTypeController::class, 'update'])->name('update.deduction');
        Route::delete('deductions/{deduction_code}', [DeductionTypeController::class, 'destroy'])->name('delete.deduction');

        // EMPLOYEES ROUTES
        Route::get('employees', [EmployeeController::class, 'index'])->name('admin.employee');

        // SSL ROUTES
        Route::get('ssl', [SalaryGradeController::class, 'index'])->name('admin.ssl');
        Route::post('ssl/store', [SalaryGradeController::class, 'store'])->name('store.ssl');
        Route::put('ssl/{grade}', [SalaryGradeController::class, 'update'])->name('update.ssl');
        Route::delete('ssl/{grade}', [SalaryGradeController::class, 'destroy'])->name('delete.ssl');

        //Query routes
        Route::get('employee_data', [EmployeeController::class, 'get_employee_data'])->name('admin.employee_data');
    });
});

require __DIR__ . '/auth.php';

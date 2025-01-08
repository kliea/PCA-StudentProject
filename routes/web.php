<?php

use App\Http\Controllers\AdminPageController;
use App\Http\Controllers\BioAdminPageController;
use App\Http\Controllers\Biometric\DashboardController;
use App\Http\Controllers\Biometric\AttendanceListController;
use App\Http\Controllers\Biometric\AttendanceRecordController;
use App\Http\Controllers\Biometric\ManageUserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SalaryGradeController;
use App\Http\Controllers\DailyTimeEntryController;
use App\Http\Controllers\AgencyShareController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\Biometric\HolidayCreationController;
use App\Http\Controllers\Biometric\LeaveOrderController;
use App\Http\Controllers\Biometric\TravelOrderController;
use App\Http\Controllers\CompensationTypeController;
use App\Http\Controllers\DeductionTypeController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\SummaryController;

Route::get('/autogenerate-today', [DailyTimeEntryController::class, 'generateNewBatch'])->name('generate-DTRs');

// SUBDOMAIN FOR BIOADMIN
Route::domain('bioadmin.' . env('APP_URL'))->group(
    function () {
        Route::prefix('admin')->middleware(['auth'])->group(
            function () {
                Route::get('dashboard', [DashboardController::class, 'index'])->name('bioadmin.dashboard');
                Route::get('attendancelists', [AttendanceListController::class, 'index'])->name('bioadmin.attendancelists');
                Route::get('fetchlogs', [AttendanceListController::class, 'fetchLogs'])->name('bioadmin.fetchLogs'); // dinako oy
                // Route::get('autogenerate-today', [DailyTimeEntryController::class, 'generateNewBatch'])->name('generate-DTRs'); ala namani
                Route::get('attendancerecords', [AttendanceRecordController::class, 'index'])->name('bioadmin.attendancerecords');
                Route::get('manageusers', [ManageUserController::class, 'index'])->name('bioadmin.manageusers');
                Route::post('manageusers', [ManageUserController::class, 'store'])->name('store.bioadmin.manageusers');
                Route::get('travelorder', [TravelOrderController::class, 'index'])->name('bioadmin.travelorder');
                Route::get('leaveorder', [LeaveOrderController::class, 'index'])->name('bioadmin.leaveorder');
                Route::get('holidaycreation', [HolidayCreationController::class, 'index'])->name('bioadmin.holidaycreation');
                Route::post('holidaycreation', [HolidayCreationController::class, 'store'])->name('store.bioadmin.holidaycreation');
            }
        );
    }
);

// SUBDOMAIN FOR PAYROLL
Route::domain('payroll.' . env('APP_URL'))->group(function () {
    Route::prefix('admin')->middleware(['auth'])->group(function () {
        Route::get('dashboard', [AdminPageController::class, 'index'])->name('admin.dashboard');
        // // PAYROLL ROUTES
        Route::get('payroll', [SummaryController::class, 'Summary'])->name('admin.payrolls');

        // // LOANS ROUTES
        Route::get('loans', [AdminPageController::class, 'loans'])->name('admin.loans');
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

        Route::get('employee/{employee_code}', [EmployeeController::class, 'get_employee_data'])->name('admin.employee_data');
    });
});


require __DIR__ . '/auth.php';

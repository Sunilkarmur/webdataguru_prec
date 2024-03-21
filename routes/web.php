<?php

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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



Route::group(['prefix' => 'admin', 'middleware'=> ['auth', 'verified', 'admin']], function (){
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::get('/users/list', [\App\Http\Controllers\UserController::class,'index'])->name('users.index');
    Route::get('/users/reports', function (){
        return Inertia::render('Users/Report');
    })->name('users.reports');
    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
    Route::get('time-reports',[\App\Http\Controllers\TimeReportController::class,'index'])->name('time-reports.index');
});

Route::group(['middleware'=> ['auth', 'verified', 'users']], function (){
    Route::get('/dashboard', function () {
        $times = \App\Models\TimeReport::where(['user_id'=> \Illuminate\Support\Facades\Auth::user()->id])->orderBy('id','desc')->first();
        return Inertia::render('Dashboard', [
            'times' =>$times
        ]);
    })->name('dashboard');

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
    Route::post('time-reports',[\App\Http\Controllers\TimeReportController::class,'store'])->name('time-reports.store');
});



Route::get('/unauthorzation', function (){

    return 'unauthorzation';
})->name('unauthorzation');

require __DIR__.'/auth.php';

<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTimeReportRequest;
use App\Http\Requests\UpdateTimeReportRequest;
use App\Models\TimeReport;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class TimeReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $timeList = TimeReport::get();
        return Inertia::render('Users/Report',[
            'timeList' => $timeList,
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
    public function store(StoreTimeReportRequest $request)
    {
        $timeReports = TimeReport::where(['user_id'=>$request->user_id, 'status'=> 'Start'])->orderBy('id', 'desc')->first();
        if (!$timeReports){
            $timeReport = new TimeReport();
            $timeReport->user_id = $request->user_id;
            if ($request->startTime){
                $timeReport->start_time = $request->clockIn?null:Carbon::create($request->startTime);
            }
            if ($request->breakStart){
                $timeReport->break_start = $request->breakStart?Carbon::create($request->breakStart):null;
            }
            if ($request->breakEnd){
                $timeReport->break_end = $request->breakEnd?Carbon::create($request->breakEnd):null;
            }
            if ($request->endTime){
                $timeReport->end_time = $request->clockIn?Carbon::create($request->endTime):null;
            }
            $timeReport->status = $request->clockIn?'End':'Start';
            $timeReport->save();
            return response()->json(['status'=> true, 'message'=> 'Time has been start'],200);
        }
        if ($request->breakStart){
            $timeReports->break_start = $request->breakStart?Carbon::create($request->breakStart):null;
        }
        if ($request->breakEnd){
            $timeReports->break_end = $request->breakEnd?Carbon::create($request->breakEnd):null;
        }
        if ($request->endTime){
            $timeReports->end_time = $request->clockIn?Carbon::create($request->endTime):null;
        }
        $timeReports->status = $request->clockIn?'End':'Start';
        $timeReports->save();
        return response()->json(['status'=> true, 'message'=> 'Something Went Wrong'],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(TimeReport $timeReport)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TimeReport $timeReport)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTimeReportRequest $request, TimeReport $timeReport)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TimeReport $timeReport)
    {
        //
    }
}

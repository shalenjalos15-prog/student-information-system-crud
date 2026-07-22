<?php

require_once __DIR__ . "/BaseController.php";
require_once __DIR__ . "/../models/Dashboard.php";

class DashboardController extends BaseController
{
    private Dashboard $dashboard;

    public function __construct()
    {
        $this->dashboard = new Dashboard();
    }

    public function index(): void
    {
        try {
            $data = $this->dashboard->getDashboardData();

            $this->success(
                "Dashboard data retrieved successfully.",
                $data
            );
        } catch (Throwable $exception) {
            $this->error(
                "Failed to retrieve dashboard data.",
                [
                    "exception" => $exception->getMessage()
                ],
                500
            );
        }
    }
}
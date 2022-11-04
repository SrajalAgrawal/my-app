import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Card } from "react-bootstrap";
import { getTasks } from "../reducer/taskSlice";
import { useState } from "react";

export const Analytics = () => {
    const task = useSelector((state) => state.task);
    let dispatch = useDispatch();
    // const [showPage, setShowPage] = useState(false);

    useEffect(() => {
        dispatch(getTasks());
            // .then((res) => {
            //     setShowPage(true);
            // });
    }, []);

    const optionsTo = {
        chart: {
            type: "pie",
        },
        title: {
            text: "Task Assigned To You",
        },
        tooltip: {
            pointFormat: "{series.name}: <b>{point.y} </b>",
        },
        accessibility: {
            point: {
                valueSuffix: "%",
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                    enabled: false,
                },
                showInLegend: true,
            },
        },
        series: [
            {
                name: "Tasks Details",
                colorByPoint: true,
                data: [
                    {
                        name: "Completed",
                        y: task.to.completed,
                    },
                    {
                        name: "Assigned",
                        y: task.to.assigned,
                    },
                    {
                        name: "In Progress",
                        y: task.to.inProgress,
                        sliced: true,
                        selected: true,
                    },
                ],
            },
        ],
    };
    const optionsBy = {
        chart: {
            type: "pie",
        },
        title: {
            text: "Task Assigned By You",
        },
        tooltip: {
            pointFormat: "{series.name}: <b>{point.y} </b>",
        },
        accessibility: {
            point: {
                valueSuffix: "%",
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                    enabled: false,
                },
                showInLegend: true,
            },
        },
        series: [
            {
                name: "Tasks Details",
                colorByPoint: true,
                data: [
                    {
                        name: "Completed",
                        y: task.by.completed,
                    },
                    {
                        name: "Assigned",
                        y: task.by.assigned,
                    },
                    {
                        name: "In Progress",
                        y: task.by.inProgress,
                        sliced: true,
                        selected: true,
                    },
                ],
            },
        ],
    };
    return (
        <Card>
            <div>
                <div style={{ display: "flex" }}>
                    <div style={{ width: "50%" }}>
                        <HighchartsReact highcharts={Highcharts} options={optionsTo} />
                    </div>
                    <div style={{ width: "50%"}}>
                        <HighchartsReact highcharts={Highcharts} options={optionsBy} />
                    </div>
                </div>
            </div>
        </Card>
    );
};
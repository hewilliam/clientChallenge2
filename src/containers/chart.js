import React, { Component } from 'react';
import Data from '../../data/data';
import ReactTable from 'react-table';
import _ from 'lodash';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';

const column1 = [
    {
        Header: "test.ai",
        columns: [
            {
                Header: "Test Run ID",
                accessor: "test_run_id"
            },
            {
                Header: "Time Stamp",
                accessor: "time_stamp"
            },
            {
                Header: "App Name",
                accessor: "app_name"
            },
        ]
    },
];

const column2 = [
    {
        Header: "List of Tests",
        columns: [
            {
                Header: "Test Name",
                accessor: "test_name"
            },
            {
                Header: "Status",
                id: "status",
                accessor: function (d) {
                    if (d.status === true) {
                        return "Passed!"
                    } else {
                        return "Failed!"
                    }
                }
            },
        ]
    }
]

const column3 = [
    {
        Header: "Step Name",
        accessor: "step_name"
    },
    {
        Header: "Screen Shot",
        accessor: "screenshot"
    },
    {
        Header: "Launch Times",
        id: "launch_times",
        // accessor: function(d) {
        //     return d.launch_times
        // },
        Cell: function (row) {
            return (<Sparklines data={row.original.launch_times}>
                <SparklinesLine color="blue" />
                <SparklinesReferenceLine type="avg" />
            </Sparklines>)
        }
    },
    {
        Header: "Memory",
        id: "memory",
        Cell: function (row) {
            return (<Sparklines data={row.original.memory}>
                <SparklinesLine color="red" />
                <SparklinesReferenceLine type="avg" />
            </Sparklines>)
        }
    },
    {
        Header: "CPU",
        id: "cpu",
        Cell: function (row) {
            return (<Sparklines data={row.original.cpu}>
                <SparklinesLine color="green" />
                <SparklinesReferenceLine type="avg" />
            </Sparklines>)
        }
    }
]

export default class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: Data,
        };
    }

    render() {
        // console.log(this.state)
        return (
            <div>
                <ReactTable
                    data={this.state.data}
                    columns={column1}
                    SubComponent={row => {
                        return (
                            <div style={{ padding: "20px" }}>
                                <em>Below are the list of tests</em>
                                <br />
                                <br />
                                <ReactTable
                                    data={this.state.data[row.index].test_cases}
                                    columns={column2}
                                    defaultPageSize={row.original.test_cases.length}
                                    showPagination={false}
                                    SubComponent={row => {
                                        return (
                                            <div style={{ padding: "20px" }}>
                                                <br />
                                                <br />
                                                <ReactTable
                                                    data={this.state.data[0].test_cases[row.index].test_steps}
                                                    columns={column3}
                                                    defaultPageSize={row.original.test_steps.length}
                                                    showPagination={false}
                                                />
                                            </div>
                                        );
                                    }}
                                />
                            </div>
                        );
                    }}
                />
            </div>
        );
    }
}

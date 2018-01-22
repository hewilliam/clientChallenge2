import React, { Component } from 'react';
import Data from '../../data/data';
import ReactTable from 'react-table';
import _ from 'lodash';

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
                accessor: function(d) {
                    if(d.status === true) {
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
    // {
    //     Header: "Launch Times",
    //     id: "launch_times",
    //     accessor: function(d) {
    //         console.log(d.launch_times)
    //         return d.launch_times.forEach(function(element){
    //             console.log(element)
    //             return element
    //         })
    //     }
    // }
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
                                    defaultPageSize={3}
                                    showPagination={false}
                                    SubComponent={row => {
                                        return (
                                            <div style={{ padding: "20px" }}>
                                                <br />
                                                <br />
                                                <ReactTable
                                                    data={this.state.data[0].test_cases[row.index].test_steps}
                                                    columns={column3}
                                                    defaultPageSize={3}
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

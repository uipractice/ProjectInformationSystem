import React, { useState } from 'react'
import {
    useTable,
    useSortBy,
    useGlobalFilter,
    usePagination,
} from 'react-table';
import UpDownImg from '../../assets/images/sorting.svg';
import { calculateHiddenColumns } from '../common/commonFunctions'
import rightIcon from '../../assets/images/right-icon.svg';
import leftIcon from '../../assets/images/left-icon.svg';



export default function Table(props) {
    const [enteredValue, setEnteredValue] = useState('');
    let columns = props.columns

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        gotoPage,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        prepareRow,
        state,
    } = useTable(
        {
            columns,
            data: props.filteredData,
            initialState: {
                pageSize: 5,
                hiddenColumns: calculateHiddenColumns(props.type, props.pset),
                sortBy: [
                    {
                        id: 'updatedAt',
                        desc: true,
                    },
                ],
            },
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const { pageIndex, pageSize } = state;


    var start, end;
    if (pageIndex === 0) {
        start = 1;
        end = props.filteredData.length > pageSize ? pageSize : props.filteredData.length;
    } else {
        start = pageIndex *pageSize + 1;
        end = props.filteredData.length >= (pageIndex + 1) * pageSize
            ? (pageIndex + 1) * pageSize
            : props.filteredData.length;
    }
    return (
        <>
            <table {...getTableProps()} className='table table-striped '>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps({
                                            title: undefined,
                                            style: {
                                                minWidth: column.minWidth,
                                                width: column.width,
                                            },
                                        })
                                    )}
                                >
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted &&
                                            (column.isSortedDesc ? (
                                                <img src={UpDownImg} alt='up' />
                                            ) : (
                                                <img src={UpDownImg} alt='down' />
                                            ))}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {!props.noRecords ? page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    let style = {};
                                    style = { textAlign: 'left' };
                                    if (cell.column.id === 'status') {
                                        if (cell.value === 'Pending') {
                                            style = { color: '#F16A21', textAlign: 'left' };
                                        } else if (cell.value === 'Submitted') {
                                            style = { color: '#0066FF', textAlign: 'left' };
                                        } else if (cell.value === 'Completed') {
                                            style = { color: '#13BC86', textAlign: 'left' };
                                        } else if (cell.value === 'Approved') {
                                            style = { color: 'green', textAlign: 'left' };
                                        }
                                    }
                                    return (
                                        <td {...cell.getCellProps({ style })}>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    }) : <tr style={{ textAlign: 'center' }}><span>No data found </span></tr>}
                </tbody>
            </table>

            <div className='table-pagination'>
                {!props.noRecords && <span className='paginate'>
                    <b>{start}</b> to <b>{end}</b> of <b>{props.filteredData.length}</b>
                </span>}
                {!props.noRecords && <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>}
                {!props.noRecords && <div className='prev-next'>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        <img src={leftIcon} alt='prev' />
                    </button>{' '}
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        <img src={rightIcon} alt='next' />
                    </button>{' '}
                </div>}
                {!props.noRecords && <input className='pagination-search'
                    type='number'
                    onChange={(e) => {
                        const value = e.target.value - 1;
                        const enteredInputValue = e.target.value.match(/^([1-9]\d*)?$/)['input'] ? e.target.value : '';
                        if (pageOptions.length > value) {
                            gotoPage(value);
                            setEnteredValue(enteredInputValue);
                            props.setNoRecords(false);
                        } else {
                            setEnteredValue(e.target.value);
                            props.setNoRecords(true);
                        }
                    }}
                    value={enteredValue}
                />}
            </div>

        </>

    )
}

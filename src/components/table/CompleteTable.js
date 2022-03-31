import React, { useState, useEffect } from 'react';
import DeleteImg from '../../assets/images/delete.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from 'react-table';
import { format } from 'date-fns';
import './table.css';
import GlobalFilter from './GlobalFilter';
import { superAdmin } from '../constants/constants';
import { getUser } from "../utils/userDetails";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getApiUrl } from '../utils/helper';
import { exp3 } from '../constants/regex';
import { addSerialNo } from '../common/commonFunctions'
import DeleteRow from '../common/DeleteRow';
import Table from '../common/Table';


toast.configure();

Modal.setAppElement('#root');
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
function CompleteTable({ data, role, pset }) {
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const [rowOriginal, setRowOriginal] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [noRecords, setNoRecords] = useState(false);

  const [filterValue, setFilterValue] = useState('Active');
  const [emptySearch, setSearchText] = useState('')

  const classes = useStyles();

  useEffect(() => {
    if (data.length > 0) {
      setDefaultFilterData();
    }
  }, [data]);



  const setDefaultFilterData = () => {
    if (data.length) {
      let filterResult = data.filter((row) => row.status !== 'Deleted');
      setFilteredData(addSerialNo(filterResult));
    }
  };


  function handleSelectedStatus(selectedState) {

    setFilterValue(selectedState);

    let filterResult;
    if (selectedState === 'Active') {
      filterResult = data.filter((row) => row.status !== 'Deleted');
    }
    else if (selectedState === 'All Project') filterResult = data;
    else filterResult = data.filter((row) => row.status === selectedState);

    setFilteredData(addSerialNo(filterResult));

    if (filterResult.length > 0) {
      setNoRecords(false);
    } else {
      setNoRecords(true);
    }
  }

  function handleInputChange(evt) {
    const value = evt.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
    if (value.match(exp3)) {
      setRowOriginal({
        ...rowOriginal,
        deleteReason: value,
      });
    } else {
      setRowOriginal({
        ...rowOriginal,
        deleteReason: '',
      });
    }
  }

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    rowOriginal.status = 'Deleted';
    const id = rowOriginal._id;
    axios
      .post(getApiUrl(`clientInfo/deleteStatus/${id}`), rowOriginal)
      .then((res) => {
        toast.warn('Record has been marked DELETED !', {
          autoClose: 2900,
        });
        setIsModalOpen(false);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((err) => console.log(err.response));
  };
  const customSorting = (c1, c2) => {
    return c1.localeCompare(c2);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'PROJECT NAME',
        accessor: 'projectNameByIT',
        width: 231,
        sortType: (a, b) => {
          return customSorting(
            a.original.projectNameByIT,
            b.original.projectNameByIT
          );
        },
        Cell: ({ row }) => {
          return (
            <Link
              style={{ 'pointerEvents': JSON.parse(getUser()).role === superAdmin || pset.includes("shareProjectForm") ? 'cursor' : 'none' }}
              to={{

                pathname: `/view/${row.original._id}`,
                state: {
                  projectNameByIT: row.original.projectNameByIT,
                  projectManager: row.original.projectManager,
                  email: row.original.email,
                  practice: row.original.practice,
                  status: row.original.status,
                  id: row.original._id,
                  projectName: row.original.projectName,
                  securityMeasure: row.original.securityMeasure,
                  informIT: row.original.informIT,
                  workStationSelected: row.original.workStationSelected,
                  devTypeSelected: row.original.devTypeSelected,
                  allowedWebsite: row.original.allowedWebsite,
                  isNDAsigned: row.original.isNDAsigned,
                  isGDPRcompliance: row.original.isGDPRcompliance,
                  isCyberSecConducted: row.original.isCyberSecConducted,
                  securityBreach: row.original.securityBreach,
                  isDisasterInsuCovered: row.original.isDisasterInsuCovered,
                  disasterDetails: row.original.disasterDetails,
                  showInsuranceDetails: row.original.showInsuranceDetails,
                  isIsolatedEnvReq: row.original.isIsolatedEnvReq,
                  isolationDetails: row.original.isolationDetails,
                  showIsolatedDetails: row.original.showIsolatedDetails,
                  isDLPreq: row.original.isDLPreq,
                  isClientEmailProvided: row.original.isClientEmailProvided,
                  deleteReason: row.original.deleteReason,
                  reshareReason: row.original.reshareReason,
                  uploadedFiles: row.original.uploadedFiles,
                },
              }}
              title={row.original.projectNameByIT}
            >
              {row.original.projectNameByIT}
            </Link>
          );
        },
        sticky: 'left',
      },
      {
        Header: 'PROJECT MANAGER',
        accessor: 'projectManager',
        width: 230,
        sticky: 'left',
        sortType: (a, b) => {
          return customSorting(
            a.original.projectManager,
            b.original.projectManager
          );
        },
      },
      {
        Header: 'PRACTICE NAME',
        accessor: 'practice',
        sticky: 'left',
        width: 200,
        sortType: (a, b) => {
          return customSorting(a.original.practice, b.original.practice);
        },
      },
      {
        Header: 'ASSIGN DATE',
        accessor: 'createdAt',
        width: 167,
        sortType: (a, b) => {
          return customSorting(a.original.createdAt, b.original.createdAt);
        },
        Cell: ({ value }) => {
          return format(new Date(value), 'dd/MM/yyyy');
        },
      },
      {
        Header: 'UPDATED DATE',
        accessor: 'updatedAt',
        width: 187,
        sortType: (a, b) => {
          return customSorting(a.original.updatedAt, b.original.updatedAt);
        },
        Cell: ({ value }) => {
          return format(new Date(value), 'dd/MM/yyyy');
        },
      },
      {
        Header: 'STATUS',
        accessor: 'status',
        width: 150,
        sortType: (a, b) => {
          if (a.original.status === undefined) {
            a.original['status'] = '';
          }
          if (b.original.status === undefined) {
            b.original['status'] = '';
          }
          return customSorting(a.original.status, b.original.status);
        },
      },
      {
        Header: 'ACTION',
        accessor: 'action',
        width: 120,
        Cell: ({ row }) => (
          <a
            {...(row.original.status === 'Deleted'
              ? { className: 'delete-icon disableDeleteBtn' }
              : { className: 'delete-icon ' })}
            onClick={(e) => {
              setRowOriginal({
                ...row.original,
                deleteReason: '',
              });
              setIsModalOpen(true);
            }}
          >
            <img src={DeleteImg} alt='Evoke Technologies' />
          </a>
        ),
      },
    ],
    []
  );

  const {
    setGlobalFilter,
    rows: filteredTableData,
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: {
        pageSize: 5,
        hiddenColumns: JSON.parse(getUser()).role === superAdmin || pset.includes("deleteForm") ? [''] : ['action'],
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

  useEffect(() => {
    if (data.length > 0) {
      if (filteredTableData.length && searchValue) {
        setFilteredData(addSerialNo(filteredTableData, true));
        setNoRecords(false);
      } else if (filteredTableData.length === 0 && searchValue === '') {
        setNoRecords(true);
      }
      else if (filteredTableData.length === 0 && searchValue !== '') {
        setNoRecords(true);
      } else if (filteredTableData.length && searchValue === '') {
        handleSelectedStatus(filterValue);
      }
    }
  }, [searchValue]);


  return (
    <div>
      <br></br>
      <div className='filter-row'>
        <h5>PROJECT DETAILS</h5>
        <div>
          <FormControl className={classes.formControl}>
            <Select
              // defaultValue='Active'
              onChange={(e) => {
                handleSelectedStatus(e.target.value);
                setSearchText('empty')
              }}
              // displayEmpty
              value={filterValue}
              className={classes.selectEmpty}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value='Active'>Active</MenuItem>
              <MenuItem value='Pending'>Pending</MenuItem>
              <MenuItem value='Submitted'>Submitted</MenuItem>
              <MenuItem value='Approved'>Approved</MenuItem>
              <MenuItem value='Deleted'>Deleted</MenuItem>
              <MenuItem value='All Project'>All Projects</MenuItem>
            </Select>
          </FormControl>
          <GlobalFilter
            setFilter={(value) => {
              setGlobalFilter(value);
              setSearchValue(value);
              setSearchText('')
            }}
            removeSearchValue={emptySearch}
          />
        </div>
      </div>

      <DeleteRow
        isModalOpen={isModalOpen}
        setIsModalOpen={() => setIsModalOpen()}
        handleInputChange={(e) => handleInputChange(e)}
        handleUpdateStatus={(e) => handleUpdateStatus(e)}
        deleteReason={rowOriginal.deleteReason}
      />

      <div className='table-responsive grid tableFixHead'>
        <Table
          noRecords={noRecords}
          columns={columns}
          filteredData={filteredData}
          pset={pset}
          type={'dashboard'}
          setNoRecords={() => setNoRecords()}
        />
      </div>
    </div>
  );
}

export default CompleteTable;

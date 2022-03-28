let columns = [
    {
        Header: 'NAME',
        accessor: 'userName',
        width: 231,
        sortType: (a, b) => {
            return customSorting(
                a.original.userName,
                b.original.userName
            )
        },
        sticky: 'left'
    },
    {
        Header: 'USER ID/EMAIL ADDRESS',
        accessor: 'userId',
        width: 230,
        sticky: 'left',
        sortType: (a, b) => {
            return customSorting(
                a.original.userId,
                b.original.userId
            )
        }
    },
    {
        Header: 'ROLE',
        accessor: 'role',
        sticky: 'left',
        width: 200,
        sortType: (a,b) => {
            return customSorting(a.original.role, b.original.role)
        }
    },
    {
        Header:'Practice',
        accesor:'practice',
        sticky:'left',
        width: 200,
        sortType: (a,b) => {
            return customSorting(a.original.practice, b.original.practice)
        }
    }
    
]
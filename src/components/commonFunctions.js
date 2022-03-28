import moment from 'moment';

export const findValue = (inputArray, reqValue) => {
    return inputArray.includes(reqValue) ? true : false
}

export const formData = (inputData) => {
    if (inputData) {
        return {
            userId: inputData.values.userId,
            password: inputData.values.password,
            userName: inputData.values.userName,
            contactNumber: inputData.values.contactNumber,
            practice: inputData.values.practice,
            practiceName: inputData.values.practiceName,
            pset: inputData.values.pset,
            status: inputData.values.status,
            role: inputData.values.role,
            createdAt: inputData.values.createdAt,
            updatedAt: moment().format('YYYY-MM-DD'),
        }
    }
    else {
        return {
            userId: '',
            password: '123',
            userName: '',
            contactNumber: '',
            practice: '',
            practiceName: null,
            pset: [],
            status: '',
            role: '',
            createdAt: moment().format('YYYY-MM-DD'),
            updatedAt: moment().format('YYYY-MM-DD'),
        }
    }
}

export const findInputValue = (state, type) =>{
    return state ? state[type] : ''
}

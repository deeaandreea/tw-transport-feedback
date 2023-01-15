import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import { Panel } from 'primereact/panel'
import { Dropdown } from 'primereact/dropdown'

import { getUsers, addUser, saveUser, deleteUser } from '../actions/user'

const userSelector = state => state.user.userList

function UserList() {
    const [isDialogShown, setIsDialogShown] = useState(false)
    const [id, setId] = useState(0)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [role, setRole] = useState('')
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('')
    const [isNewRecord, setIsNewRecord] = useState(true)
    const [selectedUser, setSelectedUser] = useState(null)

    const users = useSelector(userSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    const statusValues = [
        {label: 'Creat', value: 'Creat'},
        {label: 'Activ', value: 'Activ'},
        {label: 'Inactiv', value: 'Inactiv'}
    ]

    const roleValues = [
        {label: 'Admin', value: 'Admin'},
        {label: 'User', value: 'User'},
        {label: 'Anonim', value: 'Anonim'}
    ]

    const handleAddClick = (evt) => {
        setIsDialogShown(true)
        setIsNewRecord(true)
        setSelectedUser(null)
        setId(0)
        setUsername('')
        setPassword('')
        setToken('')
        setExpiryDate('')
        setRole('')
        setEmail('')
        setStatus('')
    }

    const hideDialog = () => {
        setIsDialogShown(false)
    }

    const handleSaveClick = () => {
        if (isNewRecord) {
            dispatch(addUser({ username, password, token, expiryDate, role, email, status }))
        } else {
            dispatch(saveUser(selectedUser, { username, password, token, expiryDate, role, email, status }))
        }
        setIsDialogShown(false)
        setSelectedUser(null)
        setId(0)
        setUsername('')
        setPassword('')
        setToken('')
        setExpiryDate('')
        setRole('')
        setEmail('')
        setStatus('')
    }

    const editUser = (rowData) => {
        setSelectedUser(rowData.id)
        setId(rowData.id)
        setUsername(rowData.username)
        setPassword(rowData.password)
        setToken(rowData.token)
        setExpiryDate(rowData.expiryDate)
        setRole(rowData.role)
        setEmail(rowData.email)
        setStatus(rowData.status)
        setIsDialogShown(true)
        setIsNewRecord(false)
    }

    const handleDeleteUser = (rowData) => {
        dispatch(deleteUser(rowData.id))
    }

    const tableFooter = (
        <div>
            <Button label='Add' icon='pi pi-plus' onClick={handleAddClick} />
        </div>
    )

    const dialogFooter = (
        <div>
            <Button label='Save' icon='pi pi-save' onClick={handleSaveClick} />
        </div>
    )

    const opsColumn = (rowData) => {
        return (
            <>
                <Button label='Edit' icon='pi pi-pencil' onClick={() => editUser(rowData)} />
                <Button label='Delete' icon='pi pi-times' className='p-button p-button-danger' onClick={() => handleDeleteUser(rowData)} />
            </>
        )
    }

    const formatDate = (value) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }

    const expDateTemplate = (rowData) => {
        return formatDate(rowData.expiryDate);
    }

    return (
        <Panel header="Users" className="m-3">
            <DataTable value={users} footer={tableFooter} >
                <Column header='Username' field='username' sortable />
                <Column header='Role' field='role' sortable />
                <Column header='Email' field='email' sortable />
                <Column header='Status' field='status' sortable />
                <Column header='Expiry Date' field='expiryDate' sortable dateTemplate={expDateTemplate} />

                <Column body={opsColumn} />
            </DataTable>
            <Dialog header={isNewRecord ? 'Add user' : 'Edit user'} visible={isDialogShown} onHide={hideDialog} footer={dialogFooter}>
                <div className="p-grid p-fluid">
                    <div className="grid p-fluid">
                        <div className="col-4">
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="col-8">
                            <InputText id='username' onChange={(evt) => setUsername(evt.target.value)} value={username} />
                        </div>
                    </div>
                    <div className="grid p-fluid">
                        <div className="col-4">
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="col-8">
                            <InputText id='password' onChange={(evt) => setPassword(evt.target.value)} value={password} />
                        </div>
                    </div>
                    <div className="grid p-fluid">
                        <div className="col-4">
                            <label htmlFor="expiryDate">Expiry Date</label>
                        </div>
                        <div className="col-8">
                            <Calendar id="expiryDate" dateFormat="dd/mm/yy" mask="99/99/9999" showIcon
                                onChange={(evt) => setExpiryDate(evt.value)} value={expiryDate} />
                        </div>
                    </div>
                    <div className="grid p-fluid">
                        <div className="col-4">
                            <label htmlFor="role">Role</label>
                        </div>
                        <div className="col-8">
                            <Dropdown id='role' value={role} options={roleValues} onChange={(evt) => setRole(evt.value)} />
                        </div>
                    </div>
                    <div className="grid p-fluid">
                        <div className="col-4">
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="col-8">
                            <InputText id='email' onChange={(evt) => setEmail(evt.target.value)} value={email} />
                        </div>
                    </div>
                    <div className="grid p-fluid">
                        <div className="col-4">
                            <label htmlFor="status">Status</label>
                        </div>
                        <div className="col-8">
                            <Dropdown id='status' value={status} options={statusValues} onChange={(evt) => setStatus(evt.value)} />
                        </div>
                    </div>
                </div>
            </Dialog>
        </Panel>
    )
}

export default UserList

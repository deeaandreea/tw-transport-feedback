import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Panel } from 'primereact/panel'
import { Toast } from 'primereact/toast'

import { login } from '../actions/auth.js'

const authSelector = state => state.auth.auth

function UserLogin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const auth = useSelector(authSelector)

    const dispatch = useDispatch()

    const toast = useRef(null)

    useEffect(() => {
        console.log("UserLogin.useEffect: " + auth)
    }, [])

    const handleLoginClick = (evt) => {
        evt.preventDefault();
        dispatch(login(username, password))
        setUsername('')
        setPassword('')
        if (auth) {
            const token = auth.token
            const loginUsername = auth.username
            if (token) {
                toast.current.show({severity: 'success', summary: 'Login succeeded', detail: loginUsername })
                window.location.href = '/experiences'
            } else {
                toast.current.show({severity: 'error', summary: 'Login failed', detail: loginUsername })
            }
        } else {
            toast.current.show({severity: 'error', summary: 'Login failed', detail: username })
        }
    }

    return (
        <div>
        <Panel header="User Login" className="m-3">
            <div className="p-grid p-fluid">
                <div className="grid p-fluid col-6">
                    <div className="col-4">
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="col-8">
                        <InputText id='username' onChange={(evt) => setUsername(evt.target.value)} value={username} />
                    </div>
                </div>
                <div className="grid p-fluid col-6">
                    <div className="col-4">
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="col-8">
                        <InputText id='password' onChange={(evt) => setPassword(evt.target.value)} value={password} />
                    </div>
                </div>
                <div className="col-2">
                    <Button label='Login' icon='pi pi-save' onClick={handleLoginClick} />
                </div>
            </div>
        </Panel>
        <Toast ref={toast} />
        </div>
    )
}

export default UserLogin

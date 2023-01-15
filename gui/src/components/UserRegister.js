import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Panel } from 'primereact/panel'
import { Toast } from 'primereact/toast'

import { register } from '../actions/auth.js'

function UserRegister() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const dispatch = useDispatch()

    const toast = useRef(null)

    useEffect(() => {
        
    }, [])

    const handleRegisterClick = (evt) => {
        evt.preventDefault();
        dispatch(register({username: username, password: password, email: email}))
        setUsername('')
        setPassword('')
        setEmail('')
        toast.current.show({severity: 'success', summary: 'User registration succeeded', detail: username })
    }

    return (
        <div>
        <Panel header="User Registration" className="m-3">
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
                <div className="grid p-fluid col-6">
                    <div className="col-4">
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="col-8">
                        <InputText id='email' onChange={(evt) => setEmail(evt.target.value)} value={email} />
                    </div>
                </div>
                <div className="col-2">
                    <Button label='Register' icon='pi pi-save' onClick={handleRegisterClick} />
                </div>
            </div>
        </Panel>
        <Toast ref={toast} />
        </div>
    )
}

export default UserRegister

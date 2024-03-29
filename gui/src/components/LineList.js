import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Panel } from 'primereact/panel'
import { Dropdown } from 'primereact/dropdown'

import { getLines, addLine, saveLine, deleteLine } from '../actions/line'

const lineSelector = state => state.line.lineList

function LineList() {
    const [isDialogShown, setIsDialogShown] = useState(false)
    const [id, setId] = useState('')
    const [transportType, setTransportType] = useState('')
    const [lineStart, setLineStart] = useState('')
    const [lineEnd, setLineEnd] = useState('')
    const [isNewRecord, setIsNewRecord] = useState(true)
    const [selectedLine, setSelectedLine] = useState(null)

    const lines = useSelector(lineSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLines())
    }, [])

    const transpTypeValues = [
        {label: 'Autobuz', value: 'Autobuz'},
        {label: 'Tramvai', value: 'Tramvai'},
        {label: 'Troleibuz', value: 'Troleibuz'},
        {label: 'Metrou', value: 'Metrou'}
    ]

    const handleAddClick = (evt) => {
        setIsDialogShown(true)
        setIsNewRecord(true)
        setSelectedLine(null)
        setId('')
        setTransportType('')
        setLineStart('')
        setLineEnd('')
    }

    const hideDialog = () => {
        setIsDialogShown(false)
    }

    const handleSaveClick = () => {
        if (isNewRecord) {
            dispatch(addLine({ id, transportType, lineStart, lineEnd }))
        } else {
            dispatch(saveLine(selectedLine, { transportType, lineStart, lineEnd }))
        }
        setIsDialogShown(false)
        setSelectedLine(null)
        setId('')
        setTransportType('')
        setLineStart('')
        setLineEnd('')
    }

    const editLine = (rowData) => {
        setSelectedLine(rowData.id)
        setId(rowData.id)
        setTransportType(rowData.transportType)
        setLineStart(rowData.lineStart)
        setLineEnd(rowData.lineEnd)
        setIsDialogShown(true)
        setIsNewRecord(false)
    }

    const handleDeleteLine = (rowData) => {
        dispatch(deleteLine(rowData.id))
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
                <Button label='Edit' icon='pi pi-pencil' onClick={() => editLine(rowData)} />
                <Button label='Delete' icon='pi pi-times' className='p-button p-button-danger' onClick={() => handleDeleteLine(rowData)} />
            </>
        )
    }

    return (
        <Panel header="Lines" className="m-3">
            <DataTable value={lines} footer={tableFooter} >
                <Column header='Id' field='id' sortable />
                <Column header='Transport Type' field='transportType' sortable />
                <Column header='Line Start' field='lineStart' sortable />
                <Column header='Line End' field='lineEnd' sortable />

                <Column body={opsColumn} />
            </DataTable>
            <Dialog header={isNewRecord ? 'Add line' : 'Edit line'} visible={isDialogShown} onHide={hideDialog} footer={dialogFooter}>
                <div className="p-grid p-fluid">
                    <div className="grid p-fluid">
                        <div className="col-4">
                            <label htmlFor="id">Id</label>
                        </div>
                        <div className="col-8">
                            <InputText id='id' onChange={(evt) => setId(evt.target.value)} value={id} />
                        </div>
                    </div>
                    <div className="grid p-fluid">
                        <div className="col-4">
                            <label htmlFor="transportType">Transport Type</label>
                        </div>
                        <div className="col-8">
                            <Dropdown value={transportType} options={transpTypeValues} onChange={(evt) => setTransportType(evt.value)} />
                        </div>
                    </div>
                    <div className="grid p-fluid">
                        <div className="col-4">
                            <label htmlFor="lineStart">Line Start</label>
                        </div>
                        <div className="col-8">
                            <InputText id='lineStart' onChange={(evt) => setLineStart(evt.target.value)} value={lineStart} />
                        </div>
                    </div>
                    <div className="grid p-fluid">
                        <div className="col-4">
                            <label htmlFor="lineEnd">Line End</label>
                        </div>
                        <div className="col-8">
                            <InputText id='lineEnd' onChange={(evt) => setLineEnd(evt.target.value)} value={lineEnd} />
                        </div>
                    </div>
                </div>
            </Dialog>
        </Panel>
    )
}

export default LineList

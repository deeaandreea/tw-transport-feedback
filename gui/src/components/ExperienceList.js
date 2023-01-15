import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputNumber } from 'primereact/inputnumber'
import { Calendar } from 'primereact/calendar'
import { Panel } from 'primereact/panel'
import { FilterMatchMode, FilterOperator } from 'primereact/api'

import { getExperiences, addExperience, saveExperience, deleteExperience } from '../actions'

const experienceSelector = state => state.experience.experienceList

function ExperienceList() {
    const [isDialogShown, setIsDialogShown] = useState(false)
    const [startingPoint, setStartingPoint] = useState('')
    const [destinationPoint, setDestinationPoint] = useState('')
    const [departureTime, setDepartureTime] = useState('')
    const [duration, setDuration] = useState('')
    const [crowdingDegree, setCrowdingDegree] = useState('')
    const [observations, setObservations] = useState('')
    const [satisfactionLevel, setSatisfactionLevel] = useState('')
    const [lineId, setLineId] = useState('')
    const [userId, setUserId] = useState(null)
    const [isNewRecord, setIsNewRecord] = useState(true)
    const [selectedExperience, setSelectedExperience] = useState(null)

    const [filters2, setFilters2] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'startingPoint': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'destinationPoint': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'line': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'observations': { value: null, matchMode: FilterMatchMode.CONTAINS }
    })
    const [globalFilterValue2, setGlobalFilterValue2] = useState('')

    const experiences = useSelector(experienceSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getExperiences())
    }, [])

    const handleAddClick = (evt) => {
        setIsDialogShown(true)
        setIsNewRecord(true)
        setStartingPoint('')
        setDestinationPoint('')
        setDepartureTime(null)
        setDuration(0)
        setCrowdingDegree(0)
        setObservations('')
        setSatisfactionLevel(0)
        setLineId('')
        setUserId(0)
    }

    const hideDialog = () => {
        setIsDialogShown(false)
    }

    const handleSaveClick = () => {
        if (isNewRecord) {
            dispatch(addExperience({
                startingPoint, destinationPoint,
                departureTime, duration, crowdingDegree, observations,
                satisfactionLevel, lineId, userId
            }))
        } else {
            dispatch(saveExperience(selectedExperience, {
                startingPoint, destinationPoint,
                departureTime, duration, crowdingDegree, observations,
                satisfactionLevel
            }))
        }
        setIsDialogShown(false)
        setSelectedExperience(null)
        setStartingPoint('')
        setDestinationPoint('')
        setDepartureTime(null)
        setDuration(0)
        setCrowdingDegree(0)
        setObservations('')
        setSatisfactionLevel(0)
        setLineId('')
        setUserId(0)
    }

    const editExperience = (rowData) => {
        setSelectedExperience(rowData.id)
        setStartingPoint(rowData.startingPoint)
        setDestinationPoint(rowData.destinationPoint)
        setDepartureTime(rowData.departureTime)
        setDuration(rowData.duration)
        setCrowdingDegree(rowData.crowdingDegree)
        setObservations(rowData.observations)
        setSatisfactionLevel(rowData.satisfactionLevel)
        setLineId(rowData.lineId)
        setUserId(rowData.userId)
        setIsDialogShown(true)
        setIsNewRecord(false)
    }

    const handleDeleteExperience = (rowData) => {
        dispatch(deleteExperience(rowData.id))
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
                <Button label='Edit' icon='pi pi-pencil' onClick={() => editExperience(rowData)} />
                <Button label='Delete' icon='pi pi-times' className='p-button p-button-danger' onClick={() => handleDeleteExperience(rowData)} />
            </>
        )
    }

    const renderHeader2 = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue2} onChange={onGlobalFilterChange2} placeholder="Keyword Search" />
                </span>
            </div>
        )
    }

    const onGlobalFilterChange2 = (e) => {
        const value = e.target.value
        let _filters2 = { ...filters2 }
        _filters2['global'].value = value

        setFilters2(_filters2)
        setGlobalFilterValue2(value)
    }
    const header2 = renderHeader2();

    return (
        <Panel header="Experiences" className="m-3">
            <DataTable value={experiences} footer={tableFooter} header={header2} filters={filters2} emptyMessage="No experience found!" >
                <Column header='Id' field='id' />
                <Column header='Starting point' field='startingPoint' sortable />
                <Column header='Destination Point' field='destinationPoint' sortable />
                <Column header='Line' field='lineId' sortable />
                <Column header='Observations' field='observations' sortable />
                <Column header='Satisfaction Level' field='satisfactionLevel' sortable />

                <Column body={opsColumn} />
            </DataTable>
            <Dialog header={isNewRecord ? 'Add experience' : 'Edit experience'} visible={isDialogShown} onHide={hideDialog} footer={dialogFooter}>
                <div className="p-grid p-fluid">
                    <div className="grid p-fluid">
                        <div className="col-4">
                            <label htmlFor="startingPoint">Starting Point</label>
                        </div>
                        <div className="col-8">
                            <InputText id='startingPoint' onChange={(evt) => setStartingPoint(evt.target.value)} value={startingPoint} />
                        </div>
                    </div>
                    <div className="grid p-fluid">
                        <div className="col-4">
                            <label htmlFor="destinationPoint">Destination Point</label>
                        </div>
                        <div className="col-8">
                            <InputText id='destinationPoint' onChange={(evt) => setDestinationPoint(evt.target.value)} value={destinationPoint} />
                        </div>
                    </div>
                    <div className="grid p-fluid">
                        <div className="col-4">
                            <label htmlFor="departureTime">Departure Time</label>
                        </div>
                        <div className="col-8">
                            <Calendar id="departureTime" showTime hourFormat="24" dateFormat="dd/mm/yy" mask="99/99/9999" showIcon
                                onChange={(evt) => setDepartureTime(evt.value)} value={departureTime} />
                        </div>
                    </div>
                    <div className="grid p-fluid">
                        <div className="col-4">
                            <label htmlFor="duration">Duration</label>
                        </div>
                        <div className="col-8">
                            <InputNumber id='duration' onChange={(evt) => setDuration(evt.value)} value={duration} />
                        </div>
                    </div>
                    <div className="grid p-fluid">
                        <div className="col-4">
                            <label htmlFor="crowdingDegree">Crowding Degree</label>
                        </div>
                        <div className="col-8">
                            <InputText id='crowdingDegree' onChange={(evt) => setCrowdingDegree(evt.target.value)} value={crowdingDegree} />
                        </div>
                    </div>
                    <div className="grid p-fluid">
                        <div className="col-4">
                            <label htmlFor="observations">Observations</label>
                        </div>
                        <div className="col-8">
                            <InputTextarea id='observations' rows={3} onChange={(evt) => setObservations(evt.target.value)} value={observations} />
                        </div>
                    </div>
                    <div className="grid p-fluid">
                        <div className="col-4">
                            <label htmlFor="satisfactionLevel">Satisfaction Level</label>
                        </div>
                        <div className="col-8">
                            <InputText id='satisfactionLevel' onChange={(evt) => setSatisfactionLevel(evt.target.value)} value={satisfactionLevel} />
                        </div>
                    </div>
                    <div className="grid p-fluid">
                        <div className="col-4">
                            <label htmlFor="line">Line</label>
                        </div>
                        <div className="col-8">
                            <InputText id='line' onChange={(evt) => setLineId(evt.target.value)} value={lineId} />
                        </div>
                    </div>
                    <div className="grid p-fluid">
                        <div className="col-4">
                            <label htmlFor="user">User</label>
                        </div>
                        <div className="col-8">
                            <InputText id='user' onChange={(evt) => setUserId(evt.target.value)} value={userId} />
                        </div>
                    </div>
                </div>
            </Dialog>
        </Panel>
    )
}

export default ExperienceList

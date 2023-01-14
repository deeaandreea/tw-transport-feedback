import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import { Panel } from 'primereact/panel'

import { getExperiences, addExperience, saveExperience, deleteExperience } from '../actions'

const experienceSelector = state => state.experience.experienceList

function ExperienceList() {
    const [isDialogShown, setIsDialogShown] = useState(false)
    const [startingPoint, setStartingPoint] = useState('')
    const [destinationPoint, setDestinationPoint] = useState('')
    const [departureTime, setDepartureTime] = useState('')
    const [duration, setDuration] = useState(0)
    const [crowdingDegree, setCrowdingDegree] = useState(0)
    const [observations, setObservations] = useState('')
    const [satisfactionLevel, setSatisfactionLevel] = useState(1)
    const [lineId, setLineId] = useState(0)
    const [userId, setUserId] = useState(0)
    const [isNewRecord, setIsNewRecord] = useState(true)
    const [selectedExperience, setSelectedExperience] = useState(null)

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
        setLineId(0)
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
        setLineId(0)
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

    return (
        <Panel header="Experiences">
            <DataTable value={experiences} footer={tableFooter} >
                <Column header='Id' field='id' />
                <Column header='Starting point' field='startingPoint' />
                <Column header='Destination Point' field='destinationPoint' />
                <Column header='Line' field='lineId' />
                <Column header='Observations' field='observations' />
                <Column header='Satisfaction Level' field='satisfactionLevel' />

                <Column body={opsColumn} />
            </DataTable>
            <Dialog header='An experience' visible={isDialogShown} onHide={hideDialog} footer={dialogFooter}>
                <div className="p-grid p-fluid">
                    <div className="grid p-fluid">
                        <div class="col-4">
                            <label htmlFor="startingPoint">Starting Point</label>
                        </div>
                        <div class="col-8">
                            <InputText id='startingPoint' onChange={(evt) => setStartingPoint(evt.target.value)} value={startingPoint} />
                        </div>
                    </div>
                    <div className="grid p-fluid">
                        <div class="col-4">
                            <label htmlFor="destinationPoint">Destination Point</label>
                        </div>
                        <div class="col-8">
                            <InputText id='destinationPoint' onChange={(evt) => setDestinationPoint(evt.target.value)} value={destinationPoint} />
                        </div>
                    </div>
                    <div className="grid p-fluid">
                        <div class="col-4">
                            <label htmlFor="departureTime">Departure Time</label>
                        </div>
                        <div class="col-8">
                            <Calendar id="departureTime" showTime hourFormat="24" dateFormat="dd/mm/yy" mask="99/99/9999" showIcon value={departureTime} />
                        </div>
                    </div>
                    <div className="grid p-fluid">
                        <div class="col-4">
                            <label htmlFor="duration">Duration</label>
                        </div>
                        <div class="col-8">
                            <InputText id='duration' onChange={(evt) => setDuration(evt.target.value)} value={duration} />
                        </div>
                    </div>
                    <div className="grid p-fluid">
                        <div class="col-4">
                            <label htmlFor="crowdingDegree">Crowding Degree</label>
                        </div>
                        <div class="col-8">
                            <InputText id='crowdingDegree' onChange={(evt) => setCrowdingDegree(evt.target.value)} value={crowdingDegree} />
                        </div>
                    </div>
                    <div className="grid p-fluid">
                        <div class="col-4">
                            <label htmlFor="observations">Observations</label>
                        </div>
                        <div class="col-8">
                            <InputText id='observations' onChange={(evt) => setObservations(evt.target.value)} value={observations} />
                        </div>
                    </div>
                    <div className="grid p-fluid">
                        <div class="col-4">
                            <label htmlFor="satisfactionLevel">Satisfaction Level</label>
                        </div>
                        <div class="col-8">
                            <InputText id='satisfactionLevel' onChange={(evt) => setSatisfactionLevel(evt.target.value)} value={satisfactionLevel} />
                        </div>
                    </div>
                    <div className="grid p-fluid">
                        <div class="col-4">
                            <label htmlFor="line">Line</label>
                        </div>
                        <div class="col-8">
                            <InputText id='line' onChange={(evt) => setLineId(evt.target.value)} value={lineId} />
                        </div>
                    </div>
                    <div className="grid p-fluid">
                        <div class="col-4">
                            <label htmlFor="user">User</label>
                        </div>
                        <div class="col-8">
                            <InputText id='user' onChange={(evt) => setUserId(evt.target.value)} value={userId} />
                        </div>
                    </div>
                </div>
            </Dialog>
        </Panel>
    )
}

export default ExperienceList

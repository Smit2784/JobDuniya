import Modal from '../render-model/Modal'
import css from "../Styles/modal.module.css"
import { GlobalState } from '../main'
import react ,{ useContext, useState } from 'react'

const Body = ({ onClose, style, hidden, setValue ,filteredData }) => {
    const [currentState, setCurrentState] = useContext(GlobalState);
    const [hide, setHide] = useState([]);
    const [data1 ,setData1 ] = useState(filteredData[0]);
    const [data2 ,setData2 ] = useState(filteredData[1]);
    const [data3 ,setData3 ] = useState(filteredData[2]);
    const [data4 ,setData4 ] = useState(filteredData[3]);

    const handleHide = (key) => {

    setValue((prev) => {
            if (hide.includes(key)) {
                return hide.filter(e => e !== key);
            }
            else {
                return [...prev, key]
            }
        })
        setHide((prev) => {
            if (hide.includes(key)) {
                return hide.filter(e => e !== key);
            }
            else {
                return [...prev, key]
            }
        })
    }
    return (
        <>
            <div className={style}>
                <div className={css.TableContainer}>
                    <table className='table  table-hover bg-white table-borderless  table-responsive-md  align-middle mb-0 '>
                        <thead className=''>
                            <tr >
                                <th  >
                                    <div class="d-flex align-items-center">
                                        <img
                                            src={currentState.Logo}
                                            onError={(e) =>
                                                e.target.src = "https://i.pinimg.com/originals/ec/d9/c2/ecd9c2e8ed0dbbc96ac472a965e4afda.jpg"
                                            }
                                            alt=""
                                            style={{ width: "80px", height: "80px" }}
                                            class="rounded-circle"
                                        />
                                        <div class="ms-3">
                                            <p class="fw-bold fs-5 mb-1">{currentState?.Name}</p>
                                            <p class="text-muted mb-0">{currentState.Email}</p>
                                        </div>
                                    </div>
                                </th>
                                {!hidden && <th className='text-end d-flex flex-column  justify-content-start'>
                                    {!hidden && <i className='fa fa-close hand' onClick={onClose}></i>}
                                </th>}
                            </tr>
                        </thead>
                        <thead className='hand table-info ' >
                            <tr className='' onClick={() => handleHide("PersonalDetails")}>
                                <th><b>Personal Details</b></th>
                                <th className='text-end '>
                                    {!hide.includes("PersonalDetails") ? <i class="fa-solid fa-caret-right"></i> :
                                        <i class="fa-solid fa-caret-down"></i>
                                    }
                                </th>
                            </tr>
                        </thead>
                        <tbody className='table-active table-bordered border-1 border-light' style={
                            !hide.includes("PersonalDetails") ? {
                                display: "none"
                            } : {}
                        }>
                            {data1.map(([key, value]) => (
                                <>
                                    <tr key={key}>
                                        <td>{key.toLocaleUpperCase()}</td>
                                        <td className="text-end">
                                            {value.length > 0?Array.isArray(value)
                                                ? value.join(", ")
                                                : value : "-"}
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                        <thead className='table-info hand'>
                            <tr onClick={() => handleHide("LocationDetails")}>
                                <th><b>Location Details</b></th>
                                <th className='text-end '>
                                    {!hide.includes("LocationDetails") ? <i class="fa-solid fa-caret-right"></i> :
                                        <i class="fa-solid fa-caret-down"></i>
                                    }
                                </th>
                            </tr>
                        </thead>
                        <tbody className='table-active' style={
                            !hide.includes("LocationDetails") ? {
                                display: "none"
                            } : {}
                        }>
                            {data2.map(([key, value]) => (
                                <>
                                    <tr key={key}>
                                        <td>{key.toLocaleUpperCase()}</td>
                                        <td className="text-end">
                                            {value.length > 0?Array.isArray(value)
                                                ? value.join(", ")
                                                : value : "-"}
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                        <thead className='table-info hand'>
                            <tr onClick={() => handleHide("HRDetails")}>
                                <th><b>HR Details</b></th>
                                <th className='text-end '>
                                    {!hide.includes("LocationDetails") ? <i class="fa-solid fa-caret-right"></i> :
                                        <i class="fa-solid fa-caret-down"></i>
                                    }
                                </th>
                            </tr>
                        </thead>
                        <tbody className='table-active' style={
                            !hide.includes("HRDetails") ? {
                                display: "none"
                            } : {}
                        }>
                            {data3.map(([key, value]) => (
                                <>
                                    <tr key={key}>
                                        <td>{key.toLocaleUpperCase()}</td>
                                        <td className="text-end">
                                            {value.length > 0?Array.isArray(value)
                                                ? value.join(", ")
                                                : value : "-"}
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                        <thead className='table-info hand'>
                            <tr onClick={() => handleHide("OwnerDetails")}>
                                <th><b>OWENER Details</b></th>
                                <th className='text-end '>
                                    {!hide.includes("LocationDetails") ? <i class="fa-solid fa-caret-right"></i> :
                                        <i class="fa-solid fa-caret-down"></i>
                                    }
                                </th>
                            </tr>
                        </thead>
                        <tbody className='table-active' style={
                            !hide.includes("OwnerDetails") ? {
                                display: "none"
                            } : {}
                        }>
                            {data4.map(([key, value]) => (
                                <>
                                    <tr key={key}>
                                        <td>{key.toLocaleUpperCase()}</td>
                                        <td className="text-end">
                                            {value.length > 0?Array.isArray(value)
                                                ? value.join(", ")
                                                : value : "-"}
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

const ProfileView = ({ onClose }) => {
    const [tmp, setTmp] = useState([]);
    return (
        <Modal
            body={<Body
                onClose={onClose}
                style={css.modalBodyTable}
                setValue={setTmp}
            />}

        />
    )
}

export default ProfileView
export { Body }

import { useState, useCallback } from "react";
import FormSelectBox from "../../Common/FormSelectBox";
import Cookies from "js-cookie";
import useAPI from "../../../Hooks/USER/useAPI";
import css from "../../../Style/profile_modal.module.css";

function EditAddress() {
    const [personalAddress, setPersonalAddress] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [stateValue, setStateValue] = useState("");
    const [state, setState] = useState("");
    const api = useAPI();

    const handleState = (stateValue) => {
        setStateValue(stateValue);
    };

    const [city, setCity] = useState("");
    const handleCity = (city) => {
        setCity(city);
    };

    const handleSubmit = useCallback(async () => {
        const id = Cookies.get("id");
        const data = await api.patchREQUEST("updateDetails", "users", id, {
            location: [{ personalAddress, pinCode, state, city }],
        });
    }, [stateValue, city, personalAddress, pinCode]);

    return (
        <div className="w-100">
            <div className={css.formGroup}>
                <label className={css.label}>Personal Address</label>
                <input
                    type="text"
                    className={css.input}
                    placeholder="Full Address"
                    required
                    name="univercity"
                    onChange={(e) => setPersonalAddress(e.target.value)}
                />
            </div>

            <div className={css.formGroup}>
                <label className={css.label}>Pincode</label>
                <input
                    type="text"
                    className={css.input}
                    placeholder="Pincode"
                    required
                    name="school"
                    onChange={(e) => setPinCode(e.target.value)}
                />
            </div>

            <div className={css.formGroup}>
                <label className={css.label}>State</label>
                <FormSelectBox
                    type="text"
                    className={css.input}
                    arrayKey="states"
                    selectedState={stateValue}
                    stateValue={handleState}
                    selectedCity={city}
                    state={setState}
                    city={handleCity}
                />
            </div>

            <div className={css.formGroup}>
                <label className={css.label}>City</label>
                <FormSelectBox
                    className={css.input}
                    arrayKey="cities"
                    selectedState={stateValue}
                    stateValue={handleState}
                    selectedCity={city}
                    state={setState}
                    city={handleCity}
                />
            </div>

            <button
                className={`${css.saveBtn}`}
                onClick={() => handleSubmit()}
            >
                Save Address
            </button>
        </div>
    );
}

export default EditAddress;

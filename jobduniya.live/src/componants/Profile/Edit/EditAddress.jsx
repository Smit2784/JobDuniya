import { useState, useCallback } from "react";
import FormSelectBox from "../../Common/FormSelectBox";
import Cookies from "js-cookie";
import useAPI from "../../../Hooks/USER/useAPI";
// import css from "../../../Style/profile_modal.module.css";

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
        <div className="w-full">
            <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Personal Address
                </label>
                <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[0.95rem] text-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-slate-300"
                    placeholder="Full Address"
                    required
                    name="univercity"
                    onChange={(e) => setPersonalAddress(e.target.value)}
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Pincode
                </label>
                <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[0.95rem] text-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-slate-300"
                    placeholder="Pincode"
                    required
                    name="school"
                    onChange={(e) => setPinCode(e.target.value)}
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                    State
                </label>
                <FormSelectBox
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[0.95rem] text-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-slate-300"
                    arrayKey="states"
                    selectedState={stateValue}
                    stateValue={handleState}
                    selectedCity={city}
                    state={setState}
                    city={handleCity}
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                    City
                </label>
                <FormSelectBox
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[0.95rem] text-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-slate-300"
                    arrayKey="cities"
                    selectedState={stateValue}
                    stateValue={handleState}
                    selectedCity={city}
                    state={setState}
                    city={handleCity}
                />
            </div>

            <button
                className="bg-linear-to-br from-blue-600 to-blue-700 text-white font-semibold px-8 py-3 rounded-lg border-none shadow-lg shadow-blue-500/20 transition-all duration-200 w-full mt-4 text-base hover:-translate-y-px hover:shadow-xl hover:brightness-110 cursor-pointer"
                onClick={() => handleSubmit()}
            >
                Save Address
            </button>
        </div>
    );
}

export default EditAddress;

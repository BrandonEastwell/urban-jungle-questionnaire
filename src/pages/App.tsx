import '../styles/globals.css'
import React, {useState} from "react";
import svg from "../assets/urbanjungle.svg"

interface FormData {
    location: null | string,
    item: null | string,
    travel: null | boolean,
    claim: null | boolean,
    student: null | boolean
}

function App() {
    const QUESTIONS = 4;
    const [step, setStep] = useState<number>(0);
    const [formData, setFormData] = useState<FormData>({ location: null, item: null, travel: null, claim: null, student: null });
    const [formError, setFormError] = useState<string | null>(null);
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

    const formChangeHandler = (event: any) => {
        const { name, value } = event.target;
        setFormData({...formData, [name]: value});

        const form = document.querySelector("form")!;
        if (form.checkValidity()) setSubmitDisabled(false)
        else setSubmitDisabled(true);
    }

    function submitHandler(event: React.FormEvent) {
        event.preventDefault();

        const form = document.querySelector("form")!;

        if (!form.checkValidity()) {
            const inputField = form.querySelector("input")!;
            const inputName = inputField.name;
            if (inputField.type === "radio") {
                if (inputField.validity.valueMissing) return setFormError("Please select an option.");
            } else if (inputName === "item") {
                if (inputField.validity.valueMissing) return setFormError("Please tell us your most expensive belonging.");
                if (inputField.validity.tooLong) return setFormError("Input too long. Max 15 characters.")
                if (inputField.validity.tooShort) return setFormError("Please tell us your most expensive belonging.")
            }

            return;
        }

        setSubmitDisabled(true);
        setFormError(null);
        if (step !== QUESTIONS) return setStep(step + 1);

        // fetch request to Claude with formData

    }

    return (
        <>
            <div className="header">
                <div>
                    <img src={svg} alt="Urban Jungle logo"/>
                </div>
            </div>
            <div className="content-container">
                <h1>Find out what coverage you need.</h1>
                <form onSubmit={(event) => submitHandler(event)} noValidate={true}>
                    { step === 0 &&
                        <fieldset className="question">
                            <h2>Where do you live?</h2>
                            <div className="radio-container">
                                <input type="radio" id="option-flat" name="location" value="flat" onChange={formChangeHandler} required />
                                <label htmlFor="option-flat">Flat</label>

                                <input type="radio" id="option-shared-house" name="location" value="shared house" onChange={formChangeHandler} required />
                                <label htmlFor="option-shared-house">Shared House</label>

                                <input type="radio" id="option-house" name="location" value="house" onChange={formChangeHandler} required />
                                <label htmlFor="option-house">House</label>

                                <input type="radio" id="option-with-family" name="location" value="with family" onChange={formChangeHandler} required />
                                <label htmlFor="option-with-family">With Family</label>
                            </div>
                        </fieldset> }

                    { step === 1 &&
                        <fieldset className="question">
                            <h2>What is your most expensive belonging?</h2>
                            <div className="text-container">
                                <input type="text" id="belonging" name="item" value={formData.item ? formData.item : ""} onChange={formChangeHandler} required max={15} min={2} />
                                <label htmlFor="belonging">What is your most expensive belonging?</label>
                            </div>
                        </fieldset> }

                    { step === 2 &&
                        <fieldset className="question">
                            <h2>Do you travel a lot?</h2>
                            <div className="radio-container">
                                <input type="radio" id="travel-yes" name="travel" onChange={formChangeHandler} required />
                                <label htmlFor="travel-yes">Yes</label>
                                <input type="radio" id="travel-no" name="travel" onChange={formChangeHandler} required />
                                <label htmlFor="travel-no">No</label>
                            </div>
                        </fieldset> }

                    { step === 3 &&
                        <fieldset className="question">
                            <h2>Ever had to file a claim before?</h2>
                            <div className="radio-container">
                                <input type="radio" id="claim-yes" name="claim" onChange={formChangeHandler} required />
                                <label htmlFor="claim-yes">Yes</label>
                                <input type="radio" id="claim-no" name="claim" onChange={formChangeHandler} required />
                                <label htmlFor="claim-no">No</label>
                            </div>
                        </fieldset> }

                    { step === 4 &&
                        <fieldset className="question">
                            <h2>Are you a student?</h2>
                            <div className="radio-container">
                                <input type="radio" id="student-yes" name="student" onChange={formChangeHandler} required />
                                <label htmlFor="student-yes">Yes</label>
                                <input type="radio" id="student-no" name="student" onChange={formChangeHandler} required />
                                <label htmlFor="student-no">No</label>
                            </div>
                        </fieldset> }

                    { formError && <span className="error">{formError}</span> }
                    <button type="submit" disabled={submitDisabled}>{step === QUESTIONS ? "Submit" : "Continue"}</button>
                    { step > 0 && <a className="back-btn" onClick={() => setStep(step - 1)}>Back</a> }
                </form>
            </div>
        </>
    )
}

export default App

// TODO connect claude LLM
// Maybe use framer-motion to animate presence
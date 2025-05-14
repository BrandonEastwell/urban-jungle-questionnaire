import '../styles/globals.css'
import React, {useState} from "react";
import svg from "../assets/urbanjungle.svg"
import {initFormAnswers, type Question} from "../lib/types/questions.ts";
import {FormInput} from "../components/forms/FormInput.tsx";

function App() {
    const QUESTIONS = initFormAnswers.length;
    const [step, setStep] = useState<number>(1);
    const [formAnswers, setFormAnswers] = useState<Question[]>(initFormAnswers);
    const [formError, setFormError] = useState<string | null>(null);
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

    console.log(formAnswers)

    const formChangeHandler = (event: any) => {
        const { value } = event.target;
        let copyOfAnswers = formAnswers;
        copyOfAnswers[step - 1].answer = value;
        setFormAnswers(copyOfAnswers);

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

        const prompt = `
                You are a helpful assistant that explains insurance in a friendly, easy way.

                Urban Jungle offers 6 types of cover:
                1. Contents Insurance – Covers belongings inside the home. Includes Tenants Liability Cover.
                2. Tenants’ Liability – Covers damage to landlord’s property.
                3. Buildings & Contents – Cover for homeowners that protects both your building and the stuff inside your home.
                4. Buildings Insurance Only – Buildings only insurance for homeowners that covers the cost of repairing damage.
                5. Travel Insurance – Cover for trips you take throughout the year, or a one-off trip with one or more destinations.
                6. Landlord Insurance – Protects landlords against loss or damage to buildings and can also cover the landlord's contents within the property.
                
                User Profile:
                
                
                Which cover types should they consider and why? Keep it clear and jargon-free.
                `

        const res = fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.CLAUDE_API_KEY,
                "anthropic-version": "2023-06-01"
            },
            body: JSON.stringify({
                model: "claude-3-sonnet-20240229",
                max_tokens: 50,
                temperature: 0.6,
                messages: [{role: "user", content: prompt}]
            })
        })

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
                    { step === 1 && <FormInput questionParams={formAnswers[step-1]} step={step} formChangeHandler={formChangeHandler} /> }

                    { step === 2 && <FormInput questionParams={formAnswers[step-1]} step={step} formChangeHandler={formChangeHandler} /> }

                    { step === 3 && formAnswers[0].answer === "Rent" && <FormInput questionParams={formAnswers[step-1]} step={step} formChangeHandler={formChangeHandler} /> }

                    { step === 4 && <FormInput questionParams={formAnswers[step-1]} step={step} formChangeHandler={formChangeHandler} /> }

                    { step === 5 &&
                        <FormInput questionParams={formAnswers[step-1]} step={step} formChangeHandler={formChangeHandler} />
                    }

                    { step === 6 &&
                        <FormInput questionParams={formAnswers[step-1]} step={step} formChangeHandler={formChangeHandler} />
                    }

                    { formError && <span className="error">{formError}</span> }
                    <button type="submit" disabled={submitDisabled}>{step === QUESTIONS ? "Submit" : "Continue"}</button>
                    { step > 0 && <a className="back-btn" onClick={() => setStep(step - 1)}>Back</a> }
                </form>
            </div>
        </>
    )
}

export default App
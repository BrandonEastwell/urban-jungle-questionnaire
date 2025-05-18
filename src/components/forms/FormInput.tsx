import type {Question} from "../../lib/types/questions.ts";

export function FormInput({ questionParams, step, formChangeHandler } : { questionParams: Question, step: number, formChangeHandler: (event: any) => void }) {

    return (
        <fieldset className="question">
            <h2>{questionParams.question}</h2>
            <div className={questionParams.type + "-container"}>
                { questionParams.type === "radio" && questionParams.options.map((option, index) => (
                    <>
                        { questionParams.type === "radio" &&
                            <>
                                <input type="radio" id={index.toString()} name={step.toString()} value={option} onChange={formChangeHandler} required />
                                <label htmlFor={index.toString()}>{option}</label>
                            </>
                        }
                    </>
                ))}

                { questionParams.type === "text" &&
                    <>
                        <input type="text" id="text-input" name={step.toString()} onChange={formChangeHandler} required max={15} min={1} />
                        <label id="text-input">{questionParams.question}</label>
                    </>
                }
            </div>
        </fieldset>
    )
}
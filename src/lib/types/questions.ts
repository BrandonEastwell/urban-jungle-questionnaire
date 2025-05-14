import type {HTMLInputTypeAttribute} from "react";

export interface Question {
    question: string,
    answer: null | string,
    type: HTMLInputTypeAttribute
    options: string[]
}

export const initFormAnswers: Question[] = [
        {
            question: "Do you rent or own your home?",
            answer: null,
            type: "radio",
            options: ["Rent", "Own", "Neither"]
        },
        {
            question: "Do you live there, or is it a property you rent out to tenants?",
            answer: null,
            type: "radio",
            options: ["I live there", "Rent out", "Neither"]
        },
        {
            question: "Have you ever broken or damaged something in a place you're renting?",
            answer: null,
            type: "radio",
            options: ["Yes", "No", "Not sure"]
        },
        {
            question: "What is the estimated value of your belongings?",
            answer: null,
            type: "text",
            options: []
        },
        {
            question: "Would you want cover for expensive things you take outside (like a laptop or camera)?",
            answer: null,
            type: "radio",
            options: ["Yes", "No"]
        },
        {
            question: "How often do you travel in a year?",
            answer: null,
            type: "radio",
            options: ["0", "1", "2", "3+"]
        }
    ]
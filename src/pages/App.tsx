import '../styles/globals.css'

function App() {

  return (
    <>
        <form>
            <fieldset className="question active">

            </fieldset>
            <fieldset className="question">

            </fieldset>
        </form>
    </>
  )
}

export default App


// Questions
// "Where do you live?" => Flat / Shared House / With Family
// "What is your most expensive belonging?" => User Answer
// "Do you travel a lot?" => Yes or No
// "Ever had to file a claim before?" => Yes or No
// "Are you a student?" => Yes or No


// TODO create form & validation
// TODO button animates next form question
// TODO connect claude LLM

// To connect multiple forms and cycle through after submitting each question
// Store answers in react state, re-render by calling function on form submit that stores state and changes className
// Maybe use framer-motion to animate presence
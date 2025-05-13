import '../styles/globals.css'

function App() {

  return (
    <>
        <form>
            <fieldset className="question active">
                <h2>Where do you live?</h2>

                <label htmlFor="option-flat">Flat</label>
                <input type="radio" id="option-flat" name="group1" />

                <label htmlFor="option-shared-house">Shared House</label>
                <input type="radio" id="option-shared-house" name="group1" />

                <label htmlFor="option-house">House</label>
                <input type="radio" id="option-house" name="group1" />

                <label htmlFor="option-with-family">With Family</label>
                <input type="radio" id="option-with-family" name="group1" />
            </fieldset>

            <fieldset className="question">
                <h2>What is your mouse expensive belonging?</h2>
                <label htmlFor="belonging">What is your mouse expensive belonging?</label>
                <input type="text" id="belonging" name="group2" />
            </fieldset>

            <fieldset className="question">
                <h2>Do you travel a lot?</h2>
                <label htmlFor="travel-yes">Yes</label>
                <input type="radio" id="travel-yes" name="group3" />

                <label htmlFor="travel-no">No</label>
                <input type="radio" id="travel-no" name="group3" />
            </fieldset>

            <fieldset className="question">
                <h2>Ever had to file a claim before?</h2>
                <label htmlFor="claim-yes">Yes</label>
                <input type="radio" id="claim-yes" name="group4" />

                <label htmlFor="claim-no">No</label>
                <input type="radio" id="claim-no" name="group4" />
            </fieldset>

            <fieldset className="question">
                <h2>Are you a student?</h2>
                <label htmlFor="student-yes">Yes</label>
                <input type="radio" id="student-yes" name="group5" />

                <label htmlFor="student-no">No</label>
                <input type="radio" id="student-no" name="group5" />
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
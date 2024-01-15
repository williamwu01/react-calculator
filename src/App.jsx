import './App.css'
import Button from './components/Button'
import {calculatorButtons} from './globals/calculator-button-data'
import Screen from './components/Screen'
import { useState } from 'react'


function App() {

//usestate set for changing input on screen
const [screen, setScreen] = useState('0')
//usestate set for chaning memory storage operation
const [memory, setMemory] = useState('')
//usestate set for changing operation
const [operation, setOperation] = useState(null)
//usestate set for last button pressed
const [lastButtonPressed, setLastButtonPressed] = useState(null)
//set usestate to true when calculation equals is performed
const [calculationPerformed, setCalculationPerformed] = useState(false);

//function for clearing screen and memory depending on which button was pressed
function handleClear(value) {
	if (value === 'All Clear') {
		setScreen('0');
		setMemory('');
	} else {
		setScreen('0');
	}
};

//function for adding memory to memory storage or manipulating memory
function handleMemory(value) {
	console.log(value);
	if (value === 'Memory Save') {
		setMemory(screen);
	} else if (value === 'Memory Clear') {
		setMemory('');
	} else if (value === 'Memory Recall') {
		setScreen(memory);
	} else if (value === 'Memory Subtract') {
		setMemory(memory - screen);
	} else if (value === 'Memory Addition') {
		setMemory((memory*1) + screen*1);
	}
}

//function for adding numbers and operations to the screen
function handleNumber(text) {
	if(!calculationPerformed) {

		if (screen === '0') {
			setScreen(text)
		} else {
			setScreen((prevScreen) => prevScreen + String(text))
		}
	} else {
		setScreen(text);
		setCalculationPerformed(false);
	}
}

//function for adding decimals to the screen
function handleDecimal(text) {
	if (!screen.includes('.')) {
    setScreen((prevScreen) => prevScreen + String(text));
  }
}

//function for +/- button formatting
function handleSign(value) {
	setScreen((prevScreen) => prevScreen * -1);
}

//function for handling operator characters +,-,/,x
function handleOperator(button) {
  const operatorExists = screen.toString().slice(-1).match(/\*|\+|\-|\//gi);
  if (lastButtonPressed !== 'operator') {
    handleEqual(); // Automatically calculate result when a new operator is pressed without pressing equals
  }
  if (button.value === 'Percent') {
    setScreen(screen * 0.01);
  } else if (button.value === 'Square Root') {
    setScreen(Math.sqrt(screen));
  } else if (button.value === 'Multiply') {
		setScreen(!!operatorExists !== false ? screen.replace(operatorExists[0], '*') : `${screen}*`)
	}	else if (button.value === 'Divide') {
    setScreen(!!operatorExists !== false ? screen.replace(operatorExists[0], '/') : `${screen}/`)
	}else {
    setOperation(button.value);
    setScreen(!!operatorExists !== false ? screen.replace(operatorExists[0], button.text) : `${screen}${button.text}`)
  }
	setCalculationPerformed(false);
  setLastButtonPressed('operator');
}
//function for setting the operation pressed 
// function updateOperation(value) {
//   setOperation(value);
// }

//function for letting equal button be pressed to calculate result
function handleEqual(value) {  
	let calc = performCalc(`${screen}`)
	console.log(calc);
	setScreen(calc);
	setCalculationPerformed(true);
}

//function for performing the calculation
function performCalc (value) {
	return Function(`return ${screen}`)()
}

//switch case for each button pressed
function handleButtonClick(button) {
setLastButtonPressed(button.type)
	switch (button.type) {
    case 'clear':
      handleClear(button.value)
      break;
    case 'memory':
      handleMemory(button.value)
      break;
    case 'number':
      handleNumber(button.text)
      break;
    case 'decimal':
      handleDecimal(button.text)
      break;
    case 'sign':
      handleSign(button.value)
      break;
    case 'operator':
      handleOperator(button)
			// updateOperation(button.value)
      break;
    case 'enter':
      handleEqual(button.value)
      break;
  }

}

return (
    <>
        <div className='container'>
            <h1>Calculator</h1>
						<div className='calc-wrapper'>
							<Screen value={screen} />
							<div className='row'>
								{calculatorButtons.map((button,index) => {
									return <Button key={index} button={button} handlebutton={handleButtonClick}/>
								})}
							</div>
						</div>
        </div>
    </>
  )
}

export default App

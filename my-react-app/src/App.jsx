import { useState } from 'react'
import './App.css'
import {OpButton} from './Operator.jsx';
import {ClearButton} from './Clear.jsx';
import {NumButton} from './Num.jsx';


function App() {
  const [display, setDisplay] = useState('')
  const [activeOp, setActiveOp] = useState(null)
  const [firstNum, setFirstNum] = useState(null)
  const [waitingForSecond, setWaitingForSecond] = useState(false)
  const [lastOp, setLastOp] = useState(null)   
  const [lastNum, setLastNum] = useState(null)  

  const calculate = (a, op, b) => {
    a = parseFloat(a)
    b = parseFloat(b)
    if (op === '/') return a / b
    if (op === 'x') return a * b
    if (op === '-') return a - b
    if (op === '+') return a + b
  }

  const handleNum = (val) => {
    if (waitingForSecond) {
      setDisplay(val === '.' ? '0.' : val)
      setWaitingForSecond(false)
    } else {
      setDisplay(display === '' && val === '.' ? '0.' : display + val)
    }
  }

  const handleOp = (op) => {
    if (op === '=') {
      if (firstNum !== null && activeOp) {
        const second = display
        const result = calculate(firstNum, activeOp, second)
        setDisplay(String(result))
        setLastOp(activeOp)
        setLastNum(second) 
        setFirstNum(null)
        setActiveOp(null)
        setWaitingForSecond(false)
      } else if (lastOp !== null && lastNum !== null) {
        const result = calculate(display, lastOp, lastNum)
        setDisplay(String(result))
      }
    } else {
      if (firstNum !== null && !waitingForSecond) {
        const result = calculate(firstNum, activeOp, display)
        const resultStr = String(result)
        setDisplay(resultStr)
        setFirstNum(resultStr)
      } else {
        setFirstNum(display)
      }
      setActiveOp(op)
      setLastOp(null)  
      setLastNum(null)
      setWaitingForSecond(true)
    }
  }

  const handleClear = () => {
    setDisplay('')
    setFirstNum(null)
    setActiveOp(null)
    setWaitingForSecond(false)
    setLastOp(null)
    setLastNum(null)
  }

  return (
    <>
      <h2>Calculator App</h2>
      <div className="card">
        <input type="text" value={display} readOnly />
        <ClearButton onClick={handleClear} />
        <div>
          <NumButton label="7" onClick={() => handleNum('7')} />
          <NumButton label="8" onClick={() => handleNum('8')} />
          <NumButton label="9" onClick={() => handleNum('9')} />
          <OpButton label="/" onClick={handleOp} isActive={activeOp === '/'} />
        </div>
        <div>
          <NumButton label="4" onClick={() => handleNum('4')} />
          <NumButton label="5" onClick={() => handleNum('5')} />
          <NumButton label="6" onClick={() => handleNum('6')} />
          <OpButton label="x" onClick={handleOp} isActive={activeOp === 'x'} />
        </div>
        <div>
          <NumButton label="1" onClick={() => handleNum('1')} />
          <NumButton label="2" onClick={() => handleNum('2')} />
          <NumButton label="3" onClick={() => handleNum('3')} />
          <OpButton label="-" onClick={handleOp} isActive={activeOp === '-'} />
        </div>
        <div>
          <NumButton label="0" onClick={() => handleNum('0')} />
          <NumButton label="." onClick={() => handleNum('.')} />
          <OpButton label="=" onClick={handleOp} isActive={false} />
          <OpButton label="+" onClick={handleOp} isActive={activeOp === '+'} />
        </div>
      </div>
    </>
  )
}

export default App
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <h1 className="bg-blue-500 text-black text-3xl text-center p-6">
                Hello from react + tailwind
            </h1>
        </>
    )
}

export default App

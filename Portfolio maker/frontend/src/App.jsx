import './App.css'
import Bio from './components/Bio.jsx'
import Theme from './components/Theme.jsx'
import Education from './components/Education.jsx'
import Links from './components/Links.jsx'
import Projects from './components/Projects.jsx'
import Techstack from './components/Techstack.jsx'

function App() {
  return (
    <>
      <div className='grid grid-cols-3 m-10'>
        <div className='col-span-1'>
          <Theme />
          <Bio />
          <Links />
          <Education />
          <Techstack />
        </div>
        <div className='col-span-2 ml-10'>
          <div className='shadow-sm bg-zinc-125'>
            <h1 className='text-3xl p-4 font-semibold'>GitHub Projects</h1>
            <Projects />
          </div>
        </div>
      </div>
    </>
  )
}

export default App

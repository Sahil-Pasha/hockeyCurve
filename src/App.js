import React, { useEffect } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import TaskManagement from './components/TaskManagement'
import TaskState from '../src/Context/TaskProvider'
import { data } from './constants/data'

function App() {
  useEffect(() => {
    if (!localStorage.getItem('tasks')) {
      localStorage.setItem('tasks', JSON.stringify(data))
    }
  }, [])
  return (
    <>
      <ErrorBoundary>
        <TaskState>
          <TaskManagement />
        </TaskState>
      </ErrorBoundary>
    </>
  )
}

export default App

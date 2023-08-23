import React from 'react';
import EisenhowerMatrix from './features/eisenhower/EisenhowerMatrix';
import TaskSidebar from './features/eisenhower/TaskSidebar';

import './App.css';

function App() {
  return (
    <div className="App">
        <EisenhowerMatrix />
        <TaskSidebar />
    </div>
  );
}

export default App;

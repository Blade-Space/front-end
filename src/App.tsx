import React from 'react'

import styles from './styles/App.module.css'

import {Text} from 'server-os-uikit';

import uuid from 'react-uuid';

import Folder from './applications/Folder'

const App: React.FC = () => {

  const applicatoins = [
    {
      name: "Folder",
      src: Folder
    }
  ]

  return (
    <div className={styles.app} >
      <Text bold color={"dark gray"} >Hello World ({uuid()}) 🤍</Text>

      {applicatoins.map(applicatoin => applicatoin.name)}

      {/* <Folder /> */}
    </div>
  )
}

export default App

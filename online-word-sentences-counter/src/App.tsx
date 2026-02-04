import { useState } from 'react'
import './App.scss'
import BottomResultBox from './components/BottomResultBox'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ResultBox from './components/ResultBox'
import TextArea from './components/TextArea'

interface TextData {
  words: number
  characters: number
  sentences: number
  paragraphs: number
  pronouns: number
  longestWord: string
  readingTime: string
}

const App = () => {
  const [data, setData] = useState<TextData>({
    words: 0,
    characters: 0,
    sentences: 0,
    paragraphs: 0,
    pronouns: 0,
    longestWord: '-',
    readingTime: '-'
  })

  return (
    <>
      <Navbar />
      <div className="small-container">
        <div className="main-app">
          <ResultBox data={data} />
          <TextArea onTextAnalysis={setData} />
          <BottomResultBox analysis={data} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App

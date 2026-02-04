import './index.scss'

interface Analysis {
  words: number
  characters: number
  sentences: number
  paragraphs: number
  pronouns: number
  longestWord: string
  readingTime: string
}

interface BottomResultBoxProps {
  analysis: Analysis
}

const BottomResultBox = ({ analysis }: BottomResultBoxProps) => {
  const bottomResultBar = [
    {
      title: 'Average Reading Time:',
      value: analysis.readingTime,
    },
    {
      title: 'Longest word:',
      value: analysis.longestWord,
    },
  ]

  return (
    <div className="bottom-result-bar">
      {bottomResultBar.map(({ title, value }) => (
        <div className="result-box" key={title}>
          <span className="box-title">{title}</span>
          <span className="box-value">{value}</span>
        </div>
      ))}
    </div>
  )
}

export default BottomResultBox

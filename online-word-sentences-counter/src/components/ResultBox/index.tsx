import './index.scss'

interface TextData {
  words: number
  characters: number
  sentences: number
  paragraphs: number
  pronouns: number
  longestWord: string
  readingTime: string
}

interface ResultBoxProps {
  data: TextData
}

const ResultBox = ({ data }: ResultBoxProps) => {
  const resultBar = [
    {
      title: 'Words',
      value: data.words,
    },
    {
      title: 'Characters',
      value: data.characters,
    },
    {
      title: 'Sentences',
      value: data.sentences,
    },
    {
      title: 'Paragraphs ',
      value: data.paragraphs,
    },
    {
      title: 'Pronouns',
      value: data.pronouns,
    },
  ]

  return (
    <div className="result-bar">
      {resultBar.map(({ title, value }) => (
        <div className="result-box" key={title}>
          <span className="box-title">{title}</span>
          <span className="box-value">{value}</span>
        </div>
      ))}
    </div>
  )
}

export default ResultBox

import { useEffect, useRef, useState, useCallback } from 'react'
import { pronouns } from '../../data/pronouns'
import './index.scss'

interface TextAreaProps {
  onTextAnalysis?: (analysis: {
    words: number
    characters: number
    sentences: number
    paragraphs: number
    pronouns: number
    longestWord: string
    readingTime: string
  }) => void
}

const TextArea = ({ onTextAnalysis }: TextAreaProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [text, setText] = useState('')

  const analyzeText = useCallback((inputText: string) => {
    if (!onTextAnalysis) return

   
    const countWords = (text: string): number => {
      if (text.trim() === '') return 0
      
      const wordsArray = text.split(/\s+/)
        .map(word => word.replace(/[^\w]/g, '')) 
        .filter(word => word.length > 0) 
      
      return wordsArray.length
    }
    
    const words = countWords(inputText)
    
    const characters = inputText.length
    
    const countSentences = (text: string): number => {
      if (text.trim() === '') return 0
      
    
      const sentenceSegments = text.split(/[.!?]+/).filter(segment => segment.trim().length > 0)
      
     
      let sentenceCount = 0
      let currentIndex = 0
      
      for (const segment of sentenceSegments) {
        const segmentIndex = text.indexOf(segment, currentIndex)
        const afterSegment = segmentIndex + segment.length
        
        
        if (afterSegment < text.length && /[.!?]/.test(text[afterSegment])) {
          sentenceCount++
        }
        currentIndex = afterSegment
      }
      
      if (sentenceCount === 0 && text.trim().length > 0) {
        sentenceCount = 1
      }
      
      return sentenceCount
    }
    
    const countParagraphs = (text: string): number => {
      if (text.trim() === '') return 0
      
      const paragraphSegments = text.split(/\n/).filter(line => {
        const hasWord = /\w+/.test(line.trim())
        return hasWord
      })
      
      return paragraphSegments.length
    }
    
    const sentences = countSentences(inputText)
    const paragraphs = countParagraphs(inputText)
    
   
    const findLongestWord = (text: string): string => {
      if (text.trim() === '') return '-'
      
     
      const wordsArray = text.split(/\s+/)
        .map(word => word.replace(/[^\w]/g, ''))
        .filter(word => word.length > 0) 
      
      if (wordsArray.length === 0) return '-'
      
      
      const longestWord = wordsArray.reduce((longest, current) => {
       
        return current.length > longest.length ? current : longest
      }, '')
      
      return longestWord || '-'
    }
    
    const longestWord = findLongestWord(inputText)
    
   
    const calculateReadingTime = (wordCount: number): string => {
      if (wordCount === 0) return '-'
      
      const totalMinutes = wordCount / 225
      
      
      if (totalMinutes < 0.25) {
        const seconds = Math.ceil(totalMinutes * 60)
        return `${seconds} sec`
      }
      
      if (totalMinutes < 60) {
        const minutes = Math.ceil(totalMinutes)
        return `~${minutes} minute${minutes !== 1 ? 's' : ''}`
      }
      
      const hours = Math.floor(totalMinutes / 60)
      const remainingMinutes = Math.ceil(totalMinutes % 60)
      
      if (remainingMinutes === 0) {
        return `${hours} hr`
      } else {
        return `${hours} hr ${remainingMinutes} min`
      }
    }
    
    const readingTime = calculateReadingTime(words)
    
  
    const countPronouns = (text: string): number => {
      if (text.trim() === '') return 0
      
      
      const textWords = text.toLowerCase()
        .split(/\s+/)
        .map(word => word.replace(/[^\w]/g, '')) 
        .filter(word => word.length > 0) 
      
      
      const pronounCount = textWords.filter(word => pronouns.includes(word)).length
      
      return pronounCount
    }
    
    const pronounCount = countPronouns(inputText)
    
    onTextAnalysis({
      words,
      characters,
      sentences,
      paragraphs,
      pronouns: pronounCount,
      longestWord,
      readingTime
    })
  }, [onTextAnalysis])

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    setText(newText)
    analyzeText(newText)
  }

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus()
    }
  }, [])

  return (
    <textarea 
      ref={textAreaRef}
      className="text-area" 
      value={text}
      onChange={handleTextChange}
    />
  )
}

export default TextArea

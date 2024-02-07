import OpenAI from 'openai'
import { SUPPORTD_LANGUAGES } from '../utils/consts'
import { type FromLanguage, type Language } from '../types.d'

// NO PUBLIQUES ESTO O SE COLARA TU API KEY EN EL CLIENTE
// ESTO LO HACEMOS POR QUE NOS ESTAMOS ENFOCANDO EN ESTE CURSO
// EN REACT Y TYPESCRIPT
// DEBES CREAR UN API PARA ESTO

const apikey = import.meta.env.VITE_OPENAI_API_KEY

const configuration = {
  apiKey: apikey,
  dangerouslyAllowBrowser: true
}

const openai = new OpenAI(configuration)

export async function translate ({
  fromLanguage,
  toLanguage,
  text
}: {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}) {
  const messages = [
    {
      role: 'system',
      content: 'You are a AI that translates text. You receive text from the  user. Do not answer, just translate the text. The original language is surrounded by `{{` and `}}`. You can also recive {{auto}} which means that you have to detect the languaje. you can translate to any language to any language. the language you translate to is surrounded by `[[` and `]]`.'
    },
    {
      role: 'user',
      content: 'Hola mundo {{Español}} [[English]]'
    },
    {
      role: 'assistant',
      content: 'Hello world'
    },
    {
      role: 'user',
      content: 'How are you? {{auto}} [[Deutsch]]'
    },
    {
      role: 'assistant',
      content: 'wie geht es dir?'
    },
    {
      role: 'user',
      content: 'Bon dia. com estas? {{auto}} [[Español]]'
    },
    {
      role: 'assistant',
      content: 'Buenos dias, ¿cómo estás?'
    }
  ]

  const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTD_LANGUAGES[fromLanguage]
  const toCode = SUPPORTD_LANGUAGES[toLanguage]

  // const completion = await openai.createChatCompletion({
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      ...messages,
      {
        role: 'user',
        content: `${text} {{${fromCode}}} [[${toCode}]]`
      }
    ]
  })

  console.log(completion)

  return completion.choices[0]?.message?.content
}

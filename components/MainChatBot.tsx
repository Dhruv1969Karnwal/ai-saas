'use client'

import { FC } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger
} from './ui/accordion'
import MainChatBotHeader from '@/components/MainChatBotHeader'
import { AccordionContent } from '@radix-ui/react-accordion'
import MainChatBotInput from '@/components/MainChatBotInput'
import MainChatBotMessages from '@/components/MainChatBotMessages'


const MainChatBot: FC = () => {
  return (
    <Accordion
      type='single'
      collapsible
      className='relative bg-white z-40 shadow '>
      <AccordionItem value='item-1' className=''>
        <div className='fixed right-8 w-80 bottom-8 bg-white border border-gray-200 rounded-md overflow-hidden'>
          <div className='w-full h-full flex flex-col'>
            <AccordionTrigger className='px-6 border-b border-zinc-300 py-4'>
              <MainChatBotHeader />
            </AccordionTrigger>
            <AccordionContent>
              <div className='flex flex-col h-80'>
                <MainChatBotMessages className='px-2 py-3 flex-1' />
                <MainChatBotInput className='px-4' />
              </div>
            </AccordionContent>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  )
}

export default MainChatBot
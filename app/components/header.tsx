/*
 * @Date: 2024-09-29 15:29:22
 * @LastEditors: LinKangjing linkangjing@foxmail.com
 * @LastEditTime: 2024-09-30 17:29:15
 * @FilePath: \webapp-conversation\app\components\header.tsx
 * @Description:
 */
import type { FC } from 'react'
import React, { useState } from 'react'
import {
  Bars3Icon,
  ChevronRightIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid'
import classnames from 'classnames'
import AppIcon from '@/app/components/base/app-icon'

export type KnowledgeBase = {
  id: string
  name: string
  desc?: string
}
const KnowledgeBasePopup: FC = () => {
  const [current, setCurrent] = useState('1')
  const bases: KnowledgeBase[] = [
    {
      name: '知识库1',
      desc: '面向公众的通用知识问答',
      id: '1',
    },
    {
      name: '知识库2',
      desc: '面向公众的通用知识问答',
      id: '2',
    },
    {
      name: '知识库3',
      desc: '面向公众的通用知识问答',
      id: '3',
    },
  ]
  const selectBase = (base: KnowledgeBase) => {
    setCurrent(base.id)
  }

  return (
    <div className='absolute bottom-0 w-full bg-white rounded-t-2xl p-4'>
      <div className="text-base font-bold text-gray-500">切换知识领域</div>
      <div className="mt-4 w-full flex flex-wrap gap-4 ">
        {bases.map((base) => {
          const isCurrent = base.id === current
          return (
            <div key={base.id} className={classnames('flex flex-col justify-around align-middle p-2 bg-gray-100 rounded-xl text-center cursor-pointer font-bold', isCurrent ? 'bg-green-50' : '')
            } style={{ flex: '1 0 40%' }} onClick={() => selectBase(base)}>
              <div className={classnames('text-base', isCurrent ? 'text-green-700' : '')}>{base.name}</div>
              <div className="text-sm text-gray-500 mt-1">{base.desc}</div>
            </div>
          )
        })}
      </div>
    </div >
  )
}
// 选择知识库
const SelectKnowledgeBase: FC<{ classname?: string }> = ({ classname }) => {
  const [visible, setVisible] = useState(false)
  const openKnowledgeBasePopup = () => {
    setVisible(true)
  }
  const closeKnowledgeBasePopup = () => {
    setVisible(false)
  }
  return (
    <div>
      <div className={classnames(['flex items-center cursor-pointer font-bold  text-gray-800', classname])}
        onClick={() => openKnowledgeBasePopup()}
      >
        通用知识
        <ChevronRightIcon className="h-4 w-4" />

      </div>
      {/* 知识库弹窗 */}
      {visible && (
        <div className='fixed inset-0 z-50'
          style={{ backgroundColor: 'rgba(0,0,0,.2)' }}
          onClick={closeKnowledgeBasePopup}
        >
          <div className='inline-block' onClick={e => e.stopPropagation()}>
            <KnowledgeBasePopup />
          </div>
        </div>
      )}
    </div>
  )
}

export type IHeaderProps = {
  title: string
  isMobile?: boolean
  onShowSideBar?: () => void
  onCreateNewChat?: () => void
}

const Header: FC<IHeaderProps> = ({
  title,
  isMobile,
  onShowSideBar,
  onCreateNewChat,
}) => {
  return (
    <div className="shrink-0 flex items-center justify-between h-12 px-3 bg-gray-100">
      {isMobile
        ? (
          <div className='flex items-center'>
            <div
              className='flex items-center justify-center h-8 w-8 cursor-pointer'
              onClick={() => onShowSideBar?.()}
            >
              <Bars3Icon className="h-4 w-4 text-gray-500" />
            </div>
            <SelectKnowledgeBase classname="m-2" />
          </div>
        )
        : <SelectKnowledgeBase />}
      <div className='flex items-center space-x-2'>
        <AppIcon size="small" />
        <div className=" text-sm text-gray-800 font-bold">{title}</div>
      </div>
      {isMobile
        ? (
          <div className='flex items-center justify-center h-8 w-8 cursor-pointer'
            onClick={() => onCreateNewChat?.()}
          >
            <PencilSquareIcon className="h-4 w-4 text-gray-500" />
          </div>)
        : <div></div>}
    </div>
  )
}

export default React.memo(Header)

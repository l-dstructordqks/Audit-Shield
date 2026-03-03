import React from 'react'
import { AuditShieldHeader } from '../AuditShieldHeader'
import { RequirementsInput } from '../RequirementsInput'

type Props = {}

export const HomePage = () => {
  return (
    <div>
        <AuditShieldHeader/>
        <RequirementsInput/>
    </div>
  )
}
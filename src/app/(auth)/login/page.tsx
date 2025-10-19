import { LoginForm } from '@/app/features/auth/components/login-form'
import { requireUnauth } from '@/lib/auth-utils'
import React from 'react'

type Props = {}

const Page = async(props: Props) => {
  await requireUnauth()
  return (
    <div>
        <LoginForm />
    </div>
  )
}

export default Page
import React, { useCallback, useEffect, useState } from 'react'
import { plaidClient } from '@/lib/plaid'
import { Button } from './ui/button'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { StyledString } from 'next/dist/build/swc'
import { useRouter } from 'next/navigation'
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions'

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
    const router = useRouter()
    const onSuccess = useCallback<PlaidLinkOnSuccess>(
        async (public_token: string) => {
            await exchangePublicToken(
                {publicToken:public_token,
                user,
            })
            router.push('/')
        },
        [user]
    )
    const [token, setToken] = useState('')
    useEffect(() => {
        const getLinkToken = async () => {
            const data= await createLinkToken(user) 
            setToken(data?.linkToken)
        }
        getLinkToken()
    }, [user])
    const config: PlaidLinkOptions = {
        onSuccess,
        token,
    }
    const {open,ready}=usePlaidLink(config)
    return (
        <div>
            {
                variant === 'primary'
                    ? (<Button
                        onClick={()=>open(config)}
                        disabled={!ready}
                        className='plaidlink-primary'
                    >
                        Connect Bank
                    </Button>)
                    : variant === 'ghost' ?
                        (<Button>Connect Bank</Button>)
                        : (<Button>Connect Bank</Button>)

            }
        </div>
    )
}

export default PlaidLink

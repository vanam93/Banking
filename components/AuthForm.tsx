'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import { AuthFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { log } from 'console'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'
import PlaidLink from './PlaidLink'



const AuthForm = ({ type }: { type: string }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const router=useRouter()
    const formSchema = AuthFormSchema(type)
    // 1. Define your form.

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit= async (data: z.infer<typeof formSchema>)=>
         {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setLoading(true)
         try {
             // sign up with appwrite and create plaid token
            
            if(type==='sign-up'){
                const userData={
                    email:data.email!,        
                    password:data.password!,         
                    ssn:data.ssn!,
                    dateOfBirth:data.dateOfBirth!,
                    postalCode:data.postalCode!,
                    state:data.state!,
                    lastName:data.lastName!,
                    firstName:data.firstName!,
                    address1:data.address1!,
                    city:data.city!
                }
              const newUser =await signUp(userData);
              setUser(newUser);
            }
            
            if(type=='sign-in'){
               const response = await signIn({
                email:data.email,
                password:data.password
               })
               if(response!){
                 router.push('/')
               }
            }

            setLoading(false)
         } catch (error:unknown) {
            console.log(error);
            
         } finally {
             setLoading(false)
         }
    }
    return (
        <section className="auth-form">
            <header className="flex gap-5 flex-col md:gap-8">
                <Link href="/" className=" cursor-pointer items-center flex gap-1">
                    <Image
                        src='/icons/logo.svg'
                        width={34}
                        height={34}
                        alt="Horizon Logo"
                    />
                    <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
                </Link>
                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className='text-24 font-semibold lg:text-36 text-gray-900'>
                        {user ? 'Link Account' :
                            type == 'sign-in' ? 'Log In' : 'Sign Up'}
                        <p className='text-16 font-normal text-gray-600 pt-2'>
                            {user ? 'Link your account to get started.' :
                                type == 'sign-in' ? 'Welcome back! Please enter your details.'
                                    : 'Please enter your details.'
                            }
                        </p>
                    </h1>
                </div>
            </header>
            {user ? (
                <div className='flex gap-4 flex-col'>
                    <PlaidLink user={user!} variant="primary"/>
                    
                </div>
             ) : 
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            {type === 'sign-up' && (<>

                                <div className="flex gap-4">
                                    <CustomInput name="firstName" control={form.control} label="First Name"
                                        placeholder="John" />
                                    <CustomInput name="lastName" control={form.control} label="Last Name"
                                        placeholder="ex: Doe" />
                                </div>
                                <CustomInput name="address1" control={form.control} label="Address"
                                    placeholder="Enter your specific address" />
                                <CustomInput name="city" control={form.control} label="City"
                                    placeholder="Enter your  city" />
                                <div className="flex gap-4">
                                    <CustomInput name="state" control={form.control} label="State"
                                        placeholder="ex: NY" />
                                    <CustomInput name="postalCode" control={form.control} label="Postal Code"
                                        placeholder="ex: 516173" />
                                </div>
                                <div className="flex gap-4">
                                    <CustomInput name="dateOfBirth" control={form.control} label="Date of Birth"
                                        placeholder="yyyy-mm-dd" />
                                    <CustomInput name="ssn" control={form.control} label="SSN"
                                        placeholder="ex: 1345" />
                                </div>
                            </>)}

                            <CustomInput name="email" control={form.control} label="Email" placeholder="Enter your email" />
                            <CustomInput name="password" control={form.control} label="Password" placeholder="Enter your password" />
                            <Button className="form-btn w-full" type="submit">
                                {isLoading === true
                                    ? (<>
                                        <Loader2
                                            className='animate-spin'
                                        />&nbsp;&nbsp; Loading...
                                    </>)
                                    : type === 'sign-in' ? 'Sign In' : 'Sign Up'
                                }
                            </Button>
                        </form>
                    </Form>

                    <footer className="flex justify-center gap-1">
                        <p className="font-normal text-14 text-gray-600">
                            {type === 'sign-in'
                                ? "Don't have an account?"
                                : "Already  have an account?"
                            }
                        </p>
                        <Link
                            href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
                            className='form-link'
                        >
                            {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
                        </Link>
                    </footer>

                </>
           }
        </section>
    )
}

export default AuthForm

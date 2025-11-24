"use client";
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import formSchema from '../lib/validators'

import TextInput from './fields/TextInput'
import Textarea from './fields/Textarea'
import Select from './fields/Select'
import RadioGroup from './fields/RadioGroup'
import CheckboxGroup from './fields/CheckboxGroup'
import FileInput from './fields/FileInput'

export default function Form() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      age: '',
      bio: '',
      role: '',
      skills: [],
      newsletter: false,
      contactMethod: 'email',
      phone: '',
      startDate: '',
      resume: null
    }
  })

  const contactMethod = watch('contactMethod')

  async function onSubmit(data) {
    try {
      // Prepare a safe payload for demonstration. Files should be sent using FormData.
      const payload = { ...data }
      if (payload.resume && payload.resume.name) payload.resume = payload.resume.name

      // Simulate API call
      await new Promise((res) => setTimeout(res, 700))

      console.log('Form submitted:', payload)
      alert('Form submitted successfully — check console for payload')
      reset()
    } catch (err) {
      console.error(err)
      alert('Something went wrong')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-4">Sign up</h2>

      <TextInput label="Full Name" id="fullName" {...register('fullName')} error={errors.fullName} />

      <TextInput label="Email" id="email" type="email" {...register('email')} error={errors.email} />

      <TextInput label="Age" id="age" type="number" {...register('age')} error={errors.age} />

      <Textarea label="Short Bio" id="bio" {...register('bio')} error={errors.bio} />

      <Select
        label="Role"
        id="role"
        {...register('role')}
        error={errors.role}
        options={[
          { value: '', label: 'Select role' },
          { value: 'student', label: 'Student' },
          { value: 'developer', label: 'Developer' },
          { value: 'designer', label: 'Designer' },
          { value: 'other', label: 'Other' }
        ]}
      />

      <Controller
        name="skills"
        control={control}
        render={({ field }) => (
          <CheckboxGroup
            label="Skills"
            options={["HTML","CSS","JavaScript","React"]}
            value={field.value}
            onChange={field.onChange}
            error={errors.skills}
          />
        )}
      />

      <div className="my-4 flex items-center gap-3">
        <input id="newsletter" type="checkbox" {...register('newsletter')} className="h-4 w-4" />
        <label htmlFor="newsletter" className="text-sm">Subscribe to newsletter</label>
      </div>

      <Controller
        name="contactMethod"
        control={control}
        render={({ field }) => (
          <RadioGroup
            label="Preferred contact"
            name="contactMethod"
            options={[{value:'email',label:'Email'},{value:'phone',label:'Phone'}]}
            value={field.value}
            onChange={field.onChange}
            error={errors.contactMethod}
          />
        )}
      />

      {contactMethod === 'phone' && (
        <TextInput label="Phone" id="phone" {...register('phone')} error={errors.phone} />
      )}

      <div className="my-4">
        <label className="block text-sm font-medium mb-2">Start Date</label>
        <input type="date" {...register('startDate')} className="border rounded px-3 py-2 w-full" />
        {errors.startDate && (<p className="text-red-600 mt-1 text-sm">{errors.startDate.message}</p>)}
      </div>

      <Controller
        name="resume"
        control={control}
        render={({ field }) => (
          <FileInput label="Resume (pdf/doc)" name="resume" value={field.value} onChange={field.onChange} error={errors.resume} />
        )}
      />

      <div className="mt-6 flex items-center gap-3">
        <button disabled={isSubmitting} type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">{isSubmitting ? 'Submitting...' : 'Submit'}</button>
        <button type="button" onClick={() => reset()} className="px-4 py-2 border rounded">Reset</button>
      </div>
    </form>
  )
}
import React, { useState } from 'react'

export const useForm = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm)
  // const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [response, setRresponse] = useState(null)

  const handleChange = (e) => { }
  // const handleBlur = (e) => {
  //   console.log("correct")
  //   const {name, value} = e.target

  //   setErrors(validateForm(errors))
  //   console.log(form)

  //  }
  const handleSubmit = (e) => { }

  return {
    form,
    // errors,
    loading,
    response,
    handleChange,
    // handleBlur,
    handleSubmit
  }
}

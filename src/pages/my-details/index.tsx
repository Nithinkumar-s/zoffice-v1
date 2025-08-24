import React from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Static mock of user details – in future this can be loaded from API / store
interface MyDetailsForm {
  fullName: string
  shortName: string
  loginName: string
  designation: string
  employeeCode: string
  pfAccountNo: string
  email: string
  addressLine1: string
  addressLine2: string
  contactNumber: string
  alternateNumber: string
  reportTo: string
}

const initialData: MyDetailsForm = {
  fullName: 'Nithinkumar S',
  shortName: 'NS',
  loginName: 'Nithinkumar',
  designation: 'Software Engineer',
  employeeCode: 'ZL 085',
  pfAccountNo: '',
  email: 'nithinkumar.s@in.zlinkcorp.com',
  addressLine1: 'Santhosh Bhavan, Veliyam',
  addressLine2: 'Kerala-691540',
  contactNumber: '8593856954',
  alternateNumber: '9745949683',
  reportTo: 'Sridhar A'
}

const fieldClass = 'mt-1 w-full rounded-md border border-input bg-muted/60 px-3 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-70'
const labelClass = 'text-[13px] font-semibold text-foreground flex items-center justify-between'

const MyDetailsPage: React.FC = () => {
  const [form, setForm] = React.useState<MyDetailsForm>(initialData)
  const [editing, setEditing] = React.useState(false)

  const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const onSubmit: React.FormEventHandler = e => {
    e.preventDefault()
    // For now just end edit mode; integrate API call later
    setEditing(false)
  }

  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full max-w-5xl mx-auto px-6 md:px-10 pb-8 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between gap-4 py-4 border-b border-border/60 mb-6">
          <h2 className="text-xl font-semibold tracking-tight">My Details</h2>
          <div className="flex gap-2">
            {!editing && (
              <Button onClick={() => setEditing(true)}>
                Edit
              </Button>
            )}
            {editing && (
              <>
                <Button type="submit" form="my-details-form">Update</Button>
                <Button variant="outline" onClick={() => { setForm(initialData); setEditing(false) }}>Cancel</Button>
              </>
            )}
          </div>
        </div>
        <form id="my-details-form" onSubmit={onSubmit} className="flex-1 overflow-y-auto pr-2 space-y-8">
          <section>
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
              <div>
                <label className={labelClass} htmlFor="fullName">Full Name:</label>
                <Input disabled={!editing} id="fullName" name="fullName" value={form.fullName} onChange={onChange} className={fieldClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="shortName">Short Name:</label>
                <Input disabled={!editing} id="shortName" name="shortName" value={form.shortName} onChange={onChange} className={fieldClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="loginName">Login Name:</label>
                <Input disabled={!editing} id="loginName" name="loginName" value={form.loginName} onChange={onChange} className={fieldClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="designation">Designation:</label>
                <Input disabled={!editing} id="designation" name="designation" value={form.designation} onChange={onChange} className={fieldClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="employeeCode">Employee Code:</label>
                <Input disabled={!editing} id="employeeCode" name="employeeCode" value={form.employeeCode} onChange={onChange} className={fieldClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="pfAccountNo">PF Account No:</label>
                <Input disabled={!editing} id="pfAccountNo" name="pfAccountNo" value={form.pfAccountNo} onChange={onChange} className={fieldClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="email">Email Id:</label>
                <Input disabled={!editing} id="email" name="email" value={form.email} onChange={onChange} type="email" className={fieldClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="addressLine1">Address:</label>
                <Input disabled={!editing} id="addressLine1" name="addressLine1" value={form.addressLine1} onChange={onChange} className={fieldClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="addressLine2">&nbsp;</label>
                <Input disabled={!editing} id="addressLine2" name="addressLine2" value={form.addressLine2} onChange={onChange} className={fieldClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="contactNumber">Contact Number:</label>
                <Input disabled={!editing} id="contactNumber" name="contactNumber" value={form.contactNumber} onChange={onChange} className={fieldClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="alternateNumber">Alternate Number:</label>
                <Input disabled={!editing} id="alternateNumber" name="alternateNumber" value={form.alternateNumber} onChange={onChange} className={fieldClass} />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass} htmlFor="reportTo">Report To:</label>
                <Input disabled={!editing} id="reportTo" name="reportTo" value={form.reportTo} onChange={onChange} className={fieldClass} />
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}

export default MyDetailsPage

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

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

const fieldClass = 'mt-1 w-full rounded-md border border-input bg-muted/60 px-3 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:bg-muted/40 disabled:text-foreground/60 disabled:border-border/50 disabled:shadow-none disabled:cursor-not-allowed'
const labelClass = 'text-[13px] font-semibold text-foreground'

interface Props { open: boolean; onOpenChange: (v: boolean) => void }

const MyDetailsDialog: React.FC<Props> = ({ open, onOpenChange }) => {
  const [form, setForm] = React.useState<MyDetailsForm>(initialData)
  const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }
  const onSubmit: React.FormEventHandler = e => { e.preventDefault(); onOpenChange(false) }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 bg-white max-w-3xl w-full rounded-xl shadow-xl border border-black/10">
        <div className="px-6 pt-5 pb-4 flex flex-col h-[80vh]">
          <DialogHeader className="p-0 mb-4">
            <DialogTitle className="text-lg font-semibold tracking-tight">My Details</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit} className="flex-1 overflow-y-auto pr-2">
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="fullName" className={labelClass}>Full Name:</label>
                  <input disabled id="fullName" name="fullName" value={form.fullName} onChange={onChange} className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="loginName" className={labelClass}>Login Name:</label>
                  <input disabled id="loginName" name="loginName" value={form.loginName} onChange={onChange} className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="employeeCode" className={labelClass}>Employee Code:</label>
                  <input disabled id="employeeCode" name="employeeCode" value={form.employeeCode} onChange={onChange} className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>Email Id:</label>
                  <input disabled id="email" name="email" type="email" value={form.email} onChange={onChange} className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="addressLine1" className={labelClass}>Address:</label>
                  <div className="space-y-3">
                    <input id="addressLine1" name="addressLine1" value={form.addressLine1} onChange={onChange} className={fieldClass} />
                    <input id="addressLine2" name="addressLine2" value={form.addressLine2} onChange={onChange} className={fieldClass} />
                  </div>
                </div>
              </div>
              <div className="space-y-5">
                <div>
                  <label htmlFor="shortName" className={labelClass}>Short Name:</label>
                  <input disabled id="shortName" name="shortName" value={form.shortName} onChange={onChange} className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="designation" className={labelClass}>Designation:</label>
                  <input disabled id="designation" name="designation" value={form.designation} onChange={onChange} className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="pfAccountNo" className={labelClass}>PF Account No:</label>
                  <input disabled id="pfAccountNo" name="pfAccountNo" value={form.pfAccountNo} onChange={onChange} className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="contactNumber" className={labelClass}>Contact Number:</label>
                  <input id="contactNumber" name="contactNumber" value={form.contactNumber} onChange={onChange} className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="alternateNumber" className={labelClass}>Alternate Number:</label>
                  <input id="alternateNumber" name="alternateNumber" value={form.alternateNumber} onChange={onChange} className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="reportTo" className={labelClass}>Report To:</label>
                  <input disabled id="reportTo" name="reportTo" value={form.reportTo} onChange={onChange} className={fieldClass} />
                </div>
              </div>
            </div>
          </form>
          <div className="pt-4 flex justify-end border-t mt-6">
            <button form="" onClick={e=>{ e.preventDefault(); onOpenChange(false) }} className="inline-flex items-center rounded-md bg-primary text-primary-foreground text-sm font-medium px-5 py-2.5 shadow-sm hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">Update</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MyDetailsDialog

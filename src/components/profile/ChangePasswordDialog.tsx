import React from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface Props { open: boolean; onOpenChange: (v: boolean) => void }

const fieldBase = 'mt-1 w-full rounded-md border border-input bg-muted/60 px-3 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:bg-muted/40 disabled:text-foreground/60 disabled:border-border/50 disabled:shadow-none disabled:cursor-not-allowed'
const labelClass = 'text-[13px] font-semibold text-foreground'

const ChangePasswordDialog: React.FC<Props> = ({ open, onOpenChange }) => {
  const [loginName] = React.useState('Nithinkumar') // mock until auth user data integrated
  const [oldPassword, setOldPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [touched, setTouched] = React.useState<{[k:string]:boolean}>({})
  const mark = (k:string)=> setTouched(t=>({...t,[k]:true}))

  const newPwdValid = newPassword.length >= 6
  const confirmValid = newPassword === confirmPassword && confirmPassword.length>0
  const canSubmit = oldPassword.length>0 && newPwdValid && confirmValid

  const submit: React.FormEventHandler = e => {
    e.preventDefault()
    if(!canSubmit) return
    // Placeholder: call API or dispatch action
    onOpenChange(false)
    setOldPassword(''); setNewPassword(''); setConfirmPassword(''); setTouched({})
  }

  const errorText = (field: string) => {
    if(field==='new' && touched.new && !newPwdValid) return 'Min 6 characters'
    if(field==='confirm' && touched.confirm && !confirmValid) return 'Passwords do not match'
    return ''
  }

  return (
    <Dialog open={open} onOpenChange={(v)=>{ if(!v){ setTimeout(()=>{setOldPassword('');setNewPassword('');setConfirmPassword('');setTouched({});},200)} onOpenChange(v) }}>
      <DialogContent className="p-0 bg-white max-w-2xl w-full rounded-xl shadow-xl border border-black/10">
        <div className="px-6 pt-5 pb-4 flex flex-col h-[55vh] max-h-[520px]">
          <DialogHeader className="p-0 mb-4">
            <DialogTitle className="text-lg font-semibold tracking-tight">Change Password</DialogTitle>
          </DialogHeader>
          <form onSubmit={submit} className="flex-1 overflow-y-auto pr-2">
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
              <div>
                <label htmlFor="loginName" className={labelClass}>Login Name:</label>
                <Input id="loginName" disabled value={loginName} className={fieldBase} />
              </div>
              <div>
                <label htmlFor="oldPassword" className={labelClass}>Old Password:</label>
                <Input id="oldPassword" type="password" value={oldPassword} onBlur={()=>mark('old')} onChange={e=>setOldPassword(e.target.value)} className={fieldBase} />
              </div>
              <div>
                <label htmlFor="newPassword" className={labelClass}>New Password:</label>
                <Input id="newPassword" type="password" value={newPassword} onBlur={()=>mark('new')} onChange={e=>setNewPassword(e.target.value)} className={fieldBase + (touched.new && !newPwdValid ? ' border-destructive focus-visible:ring-destructive/40' : '')} />
                {errorText('new') && <p className="text-xs text-destructive mt-1">{errorText('new')}</p>}
              </div>
              <div>
                <label htmlFor="confirmPassword" className={labelClass}>Confirm Password:</label>
                <Input id="confirmPassword" type="password" value={confirmPassword} onBlur={()=>mark('confirm')} onChange={e=>setConfirmPassword(e.target.value)} className={fieldBase + (touched.confirm && !confirmValid ? ' border-destructive focus-visible:ring-destructive/40' : '')} />
                {errorText('confirm') && <p className="text-xs text-destructive mt-1">{errorText('confirm')}</p>}
              </div>
            </div>
          </form>
          <div className="pt-4 flex justify-end border-t mt-6">
            <Button disabled={!canSubmit} onClick={(e)=>{e.preventDefault(); if(canSubmit) submit(e as any)}} type="submit">Update</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ChangePasswordDialog

import Link from 'next/link';
import { LockKeyhole } from 'lucide-react';
import { AuthLayout } from '@/components/AuthLayout';
import { Brand } from '@/components/Brand';
export const metadata={title:'Reset Password'};
export default function ResetPage(){return <AuthLayout><div className="auth-card compact"><Brand/><div className="auth-title"><span>Create password</span><h1>Choose a new password</h1><p>Use at least eight characters with a number and symbol.</p></div><form><label><span>New password</span><div className="input-icon"><LockKeyhole/><input type="password" required/></div></label><label><span>Confirm password</span><div className="input-icon"><LockKeyhole/><input type="password" required/></div></label><Link href="/login" className="button button-primary button-wide">Update password</Link></form></div></AuthLayout>}

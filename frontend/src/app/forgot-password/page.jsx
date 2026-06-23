import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';
import { AuthLayout } from '@/components/AuthLayout';
import { Brand } from '@/components/Brand';
export const metadata={title:'Forgot Password'};
export default function ForgotPage(){return <AuthLayout><div className="auth-card compact"><Brand/><div className="auth-title"><span>Account recovery</span><h1>Reset your password</h1><p>Enter your registered email and we&apos;ll send you a secure reset link.</p></div><form><label><span>Email address</span><div className="input-icon"><Mail/><input type="email" placeholder="student@example.com" required/></div></label><button className="button button-primary button-wide">Send reset link</button></form><p className="auth-switch"><Link href="/login"><ArrowLeft/> Back to login</Link></p></div></AuthLayout>}

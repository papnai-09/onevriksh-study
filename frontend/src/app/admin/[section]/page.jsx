import { AdminSection } from '@/components/AdminViews';
export async function generateMetadata({params}){const {section}=await params;return {title:'Admin '+section[0].toUpperCase()+section.slice(1)}}
export default async function AdminSectionPage({params}){const {section}=await params;return <AdminSection section={section}/>}

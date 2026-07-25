import { StudentSection } from '@/components/StudentViews';
export async function generateMetadata({params}){const {section}=await params;return {title:section.split('-').map(x=>x[0].toUpperCase()+x.slice(1)).join(' ')}}
export default async function StudentSectionPage({params}){const {section}=await params;return <StudentSection section={section}/>}

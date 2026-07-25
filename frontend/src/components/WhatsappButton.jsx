import { MessageCircle } from 'lucide-react';
import { institute } from '@/data/site';

export function WhatsappButton() {
  return (
    <a className="whatsapp-button" href={institute.whatsapp} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" title="Chat on WhatsApp">
      <MessageCircle size={24} fill="currentColor" />
    </a>
  );
}

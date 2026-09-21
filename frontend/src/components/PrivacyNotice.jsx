import { ShieldCheck, Server } from 'lucide-react';

export default function PrivacyNotice({ type = 'local' }) {
  if (type === 'local') {
    return (
      <div className="flex items-center justify-center mt-6 text-sm text-[var(--color-text-secondary)]">
        <ShieldCheck className="w-4 h-4 text-[var(--color-success)] mr-2" />
        <span><strong>Processed locally in your browser.</strong> Your files never leave your device.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-6 text-sm text-[var(--color-text-secondary)]">
      <div className="flex items-center">
        <Server className="w-4 h-4 text-[var(--color-info)] mr-2" />
        <span><strong>Secure temporary processing.</strong></span>
      </div>
      <span className="text-[var(--color-text-muted)] mt-1">Your file is encrypted and automatically deleted after processing.</span>
    </div>
  );
}
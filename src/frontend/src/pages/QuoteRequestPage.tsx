import { useState } from 'react';
import { useSubmitQuoteRequest } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Loader2, Phone, MapPin, Mail, FileText, Copy } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner';

const WHATSAPP_NUMBER = '919390535070';

export default function QuoteRequestPage() {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [servicesNeeded, setServicesNeeded] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [message, setMessage] = useState('');
  const [submittedId, setSubmittedId] = useState<bigint | null>(null);
  const { t } = useLanguage();

  const submitMutation = useSubmitQuoteRequest();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim() || !servicesNeeded.trim() || !deadlineDate) return;

    try {
      const deadlineTimestamp = BigInt(new Date(deadlineDate).getTime() * 1000000);
      const quoteId = await submitMutation.mutateAsync({
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        customerPhone: customerPhone.trim(),
        servicesNeeded: servicesNeeded.trim(),
        deadlineDate: deadlineTimestamp,
        message: message.trim(),
      });
      setSubmittedId(quoteId);
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
      setServicesNeeded('');
      setDeadlineDate('');
      setMessage('');
    } catch (err) {
      // error handled via mutation state
    }
  };

  const copyQuoteId = () => {
    if (submittedId) {
      navigator.clipboard.writeText(String(submittedId));
      toast.success(t('quote.request.form.copied'));
    }
  };

  return (
    <div className="py-12 px-4 bg-background min-h-[60vh]">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-teal/10 border border-brand-teal/20 rounded-full px-4 py-1.5 mb-4">
            <FileText className="w-4 h-4 text-brand-teal" />
            <span className="text-brand-teal text-sm font-medium">{t('quote.request.badge')}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">{t('quote.request.heading')}</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            {t('quote.request.subheading')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Card className="border-border">
              <CardContent className="p-6 space-y-5">
                <h2 className="font-semibold text-foreground text-lg">{t('quote.request.info.heading')}</h2>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-brand-amber/10 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-brand-amber" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t('quote.request.info.address.label')}</p>
                    <a
                      href="https://share.google/wdpTGKfodUsg1sRcu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-brand-teal hover:underline"
                    >
                      {t('quote.request.info.address.value')}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-brand-amber/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-brand-amber" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t('quote.request.info.phone.label')}</p>
                    <a href="tel:+919390535070" className="text-sm text-brand-teal hover:underline">+91 93905 35070</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-brand-amber/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-brand-amber" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t('quote.request.info.email.label')}</p>
                    <a href="mailto:magic.nelloreprinthub@gmail.com" className="text-sm text-brand-teal hover:underline">magic.nelloreprinthub@gmail.com</a>
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello! I would like to request a quote for printing services.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 w-full justify-center py-2.5 px-4 rounded-lg font-medium text-sm text-white transition-all hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: '#25D366' }}
                  >
                    <SiWhatsapp className="w-4 h-4" />
                    {t('quote.request.whatsapp')}
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-3">
            <Card className="border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">{t('quote.request.form.heading')}</CardTitle>
                <CardDescription>{t('quote.request.form.subheading')}</CardDescription>
              </CardHeader>
              <CardContent>
                {submittedId && (
                  <Alert className="mb-5 border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <AlertDescription className="text-green-700 dark:text-green-400">
                      <p className="font-medium mb-2">{t('quote.request.form.success')}</p>
                      <div className="flex items-center gap-2 bg-white dark:bg-green-950/50 rounded p-2 mt-2">
                        <code className="text-xs font-mono flex-1">{String(submittedId)}</code>
                        <Button size="sm" variant="ghost" className="h-6 px-2" onClick={copyQuoteId}>
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                {submitMutation.isError && (
                  <Alert variant="destructive" className="mb-5">
                    <AlertDescription>
                      {t('quote.request.form.error')}
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">{t('quote.request.form.name.label')} <span className="text-destructive">*</span></Label>
                    <Input
                      id="name"
                      placeholder={t('quote.request.form.name.placeholder')}
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      disabled={submitMutation.isPending}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email">{t('quote.request.form.email.label')} <span className="text-destructive">*</span></Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('quote.request.form.email.placeholder')}
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      required
                      disabled={submitMutation.isPending}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone">{t('quote.request.form.phone.label')} <span className="text-destructive">*</span></Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={t('quote.request.form.phone.placeholder')}
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                      disabled={submitMutation.isPending}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="services">{t('quote.request.form.services.label')} <span className="text-destructive">*</span></Label>
                    <Textarea
                      id="services"
                      placeholder={t('quote.request.form.services.placeholder')}
                      value={servicesNeeded}
                      onChange={(e) => setServicesNeeded(e.target.value)}
                      required
                      rows={3}
                      disabled={submitMutation.isPending}
                      className="resize-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="deadline">{t('quote.request.form.deadline.label')} <span className="text-destructive">*</span></Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={deadlineDate}
                      onChange={(e) => setDeadlineDate(e.target.value)}
                      required
                      disabled={submitMutation.isPending}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message">{t('quote.request.form.message.label')}</Label>
                    <Textarea
                      id="message"
                      placeholder={t('quote.request.form.message.placeholder')}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      disabled={submitMutation.isPending}
                      className="resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white font-semibold rounded-lg"
                    disabled={submitMutation.isPending || !customerName.trim() || !customerEmail.trim() || !customerPhone.trim() || !servicesNeeded.trim() || !deadlineDate}
                  >
                    {submitMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t('quote.request.form.sending')}
                      </>
                    ) : (
                      t('quote.request.form.submit')
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

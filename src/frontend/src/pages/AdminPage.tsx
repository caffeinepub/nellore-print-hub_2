import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetAllQuoteRequests, useGetCallerUserProfile, useSaveCallerUserProfile, useIsCallerAdmin } from '../hooks/useQueries';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Shield,
  LogIn,
  LogOut,
  Loader2,
  MessageSquare,
  User,
  Phone,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

function ProfileSetupModal({ onSave }: { onSave: (name: string) => void }) {
  const [name, setName] = useState('');
  const saveMutation = useSaveCallerUserProfile();
  const { t } = useLanguage();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await saveMutation.mutateAsync({ name: name.trim() });
    onSave(name.trim());
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{t('admin.profile.title')}</CardTitle>
          <CardDescription>{t('admin.profile.desc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="admin-name">{t('admin.profile.name.label')}</Label>
              <Input
                id="admin-name"
                placeholder={t('admin.profile.name.placeholder')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={saveMutation.isPending}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white"
              disabled={saveMutation.isPending || !name.trim()}
            >
              {saveMutation.isPending ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{t('admin.profile.saving')}</>
              ) : t('admin.profile.save')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminPage() {
  const { login, clear, loginStatus, identity, isInitializing } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;
  const { t } = useLanguage();

  const { data: userProfile, isLoading: profileLoading, isFetched: profileFetched } = useGetCallerUserProfile();
  const { data: isAdmin, isLoading: adminLoading, error: adminError } = useIsCallerAdmin();
  const {
    data: quoteRequests,
    isLoading: quoteRequestsLoading,
    error: quoteRequestsError,
    refetch: refetchQuoteRequests,
    isFetching: quoteRequestsFetching,
  } = useGetAllQuoteRequests();

  const showProfileSetup = isAuthenticated && !profileLoading && profileFetched && userProfile === null;

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: unknown) {
      const err = error as Error;
      if (err?.message === 'User is already authenticated') {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  // Not logged in
  if (!isAuthenticated && !isInitializing) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 bg-background">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-10">
            <div className="w-16 h-16 bg-brand-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Shield className="w-8 h-8 text-brand-teal" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">{t('admin.panel.title')}</h1>
            <p className="text-muted-foreground mb-6 text-sm">
              {t('admin.panel.signin.desc')}
            </p>
            <Button
              onClick={handleLogin}
              disabled={loginStatus === 'logging-in'}
              className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white font-semibold"
            >
              {loginStatus === 'logging-in' ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{t('admin.panel.signing.in')}</>
              ) : (
                <><LogIn className="w-4 h-4 mr-2" />{t('admin.panel.signin.button')}</>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Initializing
  if (isInitializing) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-teal" />
      </div>
    );
  }

  // Not admin
  if (!adminLoading && isAdmin === false) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 bg-background">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-10">
            <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">{t('admin.panel.access.denied.title')}</h1>
            <p className="text-muted-foreground mb-6 text-sm">
              {t('admin.panel.access.denied.desc')}
            </p>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t('admin.panel.signout')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 bg-background min-h-[70vh]">
      {showProfileSetup && (
        <ProfileSetupModal onSave={() => {}} />
      )}

      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-teal/10 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-brand-teal" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t('admin.dashboard.title')}</h1>
              {userProfile && (
                <p className="text-muted-foreground text-sm">{t('admin.dashboard.welcome')} {userProfile.name}</p>
              )}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="text-muted-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {t('admin.panel.signout')}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="border-border">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-10 h-10 bg-brand-amber/10 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-brand-amber" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">{t('admin.stats.inquiries')}</p>
                <p className="text-2xl font-bold text-foreground">
                  {quoteRequestsLoading ? '—' : (quoteRequests?.length ?? 0)}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-10 h-10 bg-brand-teal/10 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-brand-teal" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">{t('admin.stats.admin')}</p>
                <p className="text-sm font-semibold text-foreground truncate max-w-[140px]">
                  {userProfile?.name ?? 'Admin User'}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">{t('admin.stats.status')}</p>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-0 text-xs">
                  {t('admin.stats.active')}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Messages Table */}
        <Card className="border-border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">{t('admin.table.title')}</CardTitle>
                <CardDescription>{t('admin.table.desc')}</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetchQuoteRequests()}
                disabled={quoteRequestsFetching}
                className="text-muted-foreground"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${quoteRequestsFetching ? 'animate-spin' : ''}`} />
                {t('admin.table.refresh')}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {quoteRequestsError && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{t('admin.table.error')}</AlertDescription>
              </Alert>
            )}

            {quoteRequestsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <div className="rounded-md border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-12">{t('admin.table.col.id')}</TableHead>
                      <TableHead>{t('admin.table.col.name')}</TableHead>
                      <TableHead>{t('admin.table.col.phone')}</TableHead>
                      <TableHead>{t('admin.table.col.message')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {!quoteRequests || quoteRequests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground py-10">
                          {t('admin.table.empty')}
                        </TableCell>
                      </TableRow>
                    ) : (
                      quoteRequests.map((req) => (
                        <TableRow key={String(req.id)} className="hover:bg-muted/30">
                          <TableCell className="text-muted-foreground text-sm font-mono">
                            {String(req.id)}
                          </TableCell>
                          <TableCell className="font-medium text-foreground">{req.customerName}</TableCell>
                          <TableCell className="text-muted-foreground">
                            <a href={`tel:${req.customerPhone}`} className="hover:text-brand-teal transition-colors">
                              {req.customerPhone}
                            </a>
                          </TableCell>
                          <TableCell className="text-muted-foreground max-w-xs">
                            <p className="truncate">{req.servicesNeeded}</p>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

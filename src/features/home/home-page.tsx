import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight, CheckCircle2, Sparkles, Target } from "lucide-react";
import { useAuth } from "@/features/auth/context/auth-context";

export function HomePage() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center space-y-8 py-24 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl bg-linear-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            {t('app.tagline')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('home.hero.description')}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          {isAuthenticated ? (
            <Button asChild size="lg" className="h-12 px-8 text-lg">
              <Link to="/assessment">
                {t('home.hero.beginAssessment')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          ) : (
            <>
              <Button asChild size="lg" className="h-12 px-8 text-lg">
                <Link to="/register">
                  {t('home.hero.getStarted')} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-lg">
                <Link to="/login">
                  {t('home.hero.hasAccount')}
                </Link>
              </Button>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 py-16 px-4 max-w-6xl mx-auto w-full">
        <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <Target className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold">{t('home.features.assessment.title')}</h3>
          <p className="text-muted-foreground">
            {t('home.features.assessment.description')}
          </p>
        </div>
        <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold">{t('home.features.ai.title')}</h3>
          <p className="text-muted-foreground">
            {t('home.features.ai.description')}
          </p>
        </div>
        <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold">{t('home.features.steps.title')}</h3>
          <p className="text-muted-foreground">
            {t('home.features.steps.description')}
          </p>
        </div>
      </section>
    </div>
  );
}

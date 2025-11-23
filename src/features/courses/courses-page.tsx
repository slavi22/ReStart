import { useAssessment } from "@/features/assessment/context/assessment-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, ArrowLeft, BookOpen } from "lucide-react";
import { Link, Navigate } from "react-router";
import { useTranslation } from "react-i18next";

export default function CoursesPage() {
  const { insights } = useAssessment();
  const { t } = useTranslation();

  if (!insights) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('courses.title', 'Personalized Articles')}</h1>
          <p className="text-muted-foreground">
            {t('courses.subtitle', 'Curated resources to help you bridge your competency gaps.')}
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {insights.learningPath?.map((item, i) => (
          <Card key={i} className="overflow-hidden hover:shadow-md transition-shadow group">
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                <Link to={`/personalized-articles/${i}`}>
                  {item.topic}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="prose dark:prose-invert max-w-none line-clamp-3 text-muted-foreground">
                <p>{item.articleContent}</p>
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <BookOpen className="h-3 w-3" />
                  <span>5 min read</span>
                </div>
                <Button asChild variant="secondary" size="sm">
                  <Link to={`/personalized-articles/${i}`} className="gap-2">
                    {t('courses.readArticle', 'Read Article')}
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

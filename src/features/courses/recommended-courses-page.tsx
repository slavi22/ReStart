import { useAssessment } from "@/features/assessment/context/assessment-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ExternalLink, ArrowLeft, Clock, GraduationCap } from "lucide-react";
import { Link, Navigate } from "react-router";
import { useTranslation } from "react-i18next";

export default function RecommendedCoursesPage() {
  const { insights } = useAssessment();
  const { t } = useTranslation();

  if (!insights) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container max-w-5xl mx-auto py-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('recommendedCourses.title', 'Recommended Courses')}</h1>
          <p className="text-muted-foreground">
            {t('recommendedCourses.subtitle', 'Top-rated courses selected to accelerate your career transition.')}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {insights.learningPath?.map((item, i) => (
          <Card key={i} className="flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 border-muted-foreground/20">
            <div className="h-2 bg-primary/80 w-full" />
            <CardHeader>
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                <GraduationCap className="h-3 w-3" />
                {item.topic}
              </div>
              <CardTitle className="text-lg leading-tight line-clamp-2 h-14">
                {item.recommendedCourse.title}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <span className="bg-secondary px-2 py-0.5 rounded text-xs font-medium text-secondary-foreground">
                  {item.recommendedCourse.provider}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{item.recommendedCourse.duration}</span>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 p-4 pt-4 border-t">
              <Button asChild className="w-full gap-2 group">
                <a href={item.recommendedCourse.url} target="_blank" rel="noopener noreferrer">
                  {t('courses.viewCourse', 'View Course')}
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

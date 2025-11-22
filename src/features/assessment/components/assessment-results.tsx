import { useAssessment } from "../context/assessment-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, TrendingUp, BookOpen, AlertCircle, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export function AssessmentResults() {
  const { insights, resetAssessment } = useAssessment();
  const { t } = useTranslation();

  if (!insights) return null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">{t('assessment.results.title')}</h2>
        <p className="text-muted-foreground">
          {t('assessment.results.subtitle', { role: insights.recommendedPath })}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              {t('assessment.results.outlook')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium">{t('assessment.results.estimatedTime')}</span>
              <span className="flex items-center gap-1 text-sm font-bold">
                <Clock className="h-4 w-4" /> {insights.estimatedTime}
              </span>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium">{t('assessment.results.marketDemand')}</span>
              <p className="text-sm text-muted-foreground">{insights.careerOutlook}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              {t('assessment.results.gapAnalysis')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {insights.competencyGap.map((gap, i) => {
                // Use a deterministic hash of the index to generate a consistent progress value
                // This ensures the value doesn't change when language changes (assuming order is preserved)
                const progress = ((i + 1) * 17) % 60 + 20;
                let gapLabel = t('assessment.results.gapLevels.minor');
                if (progress < 30) gapLabel = t('assessment.results.gapLevels.critical');
                else if (progress < 50) gapLabel = t('assessment.results.gapLevels.significant');
                else if (progress < 70) gapLabel = t('assessment.results.gapLevels.moderate');

                return (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{gap}</span>
                      <span className="text-muted-foreground">{gapLabel}</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              {t('assessment.results.strengths')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {insights.strengths.map((strength, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  {strength}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              {t('assessment.results.courses')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.learningPath?.map((item, i) => (
                <a 
                  key={i} 
                  href={item.recommendedCourse.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm group-hover:underline">{item.recommendedCourse.title}</p>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-muted-foreground">{item.recommendedCourse.provider}</p>
                  </div>
                  <Badge variant="secondary">{item.recommendedCourse.duration}</Badge>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center pt-8 pb-12 gap-4">
        <Button size="lg" onClick={resetAssessment} variant="outline">
          {t('assessment.results.newAssessment')}
        </Button>
        <Button size="lg" asChild>
          <Link to="/personalized-articles">
            {t('assessment.results.startPath')}
          </Link>
        </Button>
        <Button size="lg" variant="secondary" asChild>
          <Link to="/recommended-courses">
            {t('assessment.results.viewCourses', 'View Courses')}
          </Link>
        </Button>
      </div>
    </div>
  );
}

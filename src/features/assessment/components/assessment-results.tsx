import { useAssessment } from "../context/assessment-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, TrendingUp, BookOpen, AlertCircle } from "lucide-react";

export function AssessmentResults() {
  const { insights, resetAssessment } = useAssessment();

  if (!insights) return null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Your Personalized Career Path</h2>
        <p className="text-muted-foreground">Based on your profile, here is your roadmap to becoming a {insights.recommendedPath}.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Career Outlook
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium">Estimated Time</span>
              <span className="flex items-center gap-1 text-sm font-bold">
                <Clock className="h-4 w-4" /> {insights.estimatedTime}
              </span>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium">Market Demand</span>
              <p className="text-sm text-muted-foreground">{insights.careerOutlook}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Competency Gap Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {insights.competencyGap.map((gap, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{gap}</span>
                    <span className="text-muted-foreground">Missing</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Your Strengths
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
              Recommended Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.recommendedCourses.map((course, i) => (
                <div key={i} className="flex items-start justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{course.title}</p>
                    <p className="text-xs text-muted-foreground">{course.provider}</p>
                  </div>
                  <Badge variant="secondary">{course.duration}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center pt-8 pb-12">
        <Button size="lg" onClick={resetAssessment} variant="outline">
          Start New Assessment
        </Button>
        <Button size="lg" className="ml-4">
          Start Learning Path
        </Button>
      </div>
    </div>
  );
}

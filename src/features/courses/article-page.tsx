import { useParams, Link, Navigate } from "react-router";
import { useAssessment } from "@/features/assessment/context/assessment-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, BookOpen, ExternalLink, Clock, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css'; // Import a highlight.js style

export default function ArticlePage() {
  const { id } = useParams();
  const { insights } = useAssessment();
  const { t } = useTranslation();

  if (!insights || !id) {
    return <Navigate to="/" replace />;
  }

  const index = parseInt(id, 10);
  const article = insights.learningPath[index];

  if (!article) {
    return <Navigate to="/personalized-articles" replace />;
  }

  // Calculate read time based on word count (avg 200 wpm)
  const wordCount = article.articleContent.split(/\s+/).length;
  const readTime = Math.max(3, Math.ceil(wordCount / 200));

  return (
    <div className="container max-w-3xl mx-auto py-8 space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild className="-ml-2 text-muted-foreground">
          <Link to="/personalized-articles">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('articles.back', 'Back to Articles')}
          </Link>
        </Button>
        
        <div className="space-y-2">
          <Badge variant="secondary" className="w-fit">
            {article.topic}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('articles.mastering', 'Mastering')} {article.topic}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{readTime} min read</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      <article className="prose dark:prose-invert max-w-none lg:prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-xl prose-pre:bg-muted/50 prose-pre:border prose-pre:p-0 prose-code:bg-muted/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sm prose-code:before:content-none prose-code:after:content-none">
        <ReactMarkdown 
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: ({...props}) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
            h2: ({...props}) => <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2" {...props} />,
            h3: ({...props}) => <h3 className="text-xl font-semibold mt-6 mb-3" {...props} />,
            p: ({...props}) => <p className="leading-7 mb-4" {...props} />,
            ul: ({...props}) => <ul className="list-disc list-inside mb-4 space-y-1" {...props} />,
            ol: ({...props}) => <ol className="list-decimal list-inside mb-4 space-y-1" {...props} />,
            li: ({...props}) => <li className="ml-4" {...props} />,
            blockquote: ({...props}) => <blockquote className="border-l-4 border-primary pl-4 italic my-4" {...props} />,
            pre: ({...props}) => <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto my-4 border" {...props} />,
            code: ({className, children, ...props}) => {
              const match = /language-(\w+)/.exec(className || '')
              return !match ? (
                <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm" {...props}>
                  {children}
                </code>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
          }}
        >
          {article.articleContent}
        </ReactMarkdown>
      </article>

      <div className="border-t pt-8 mt-8">
        <h3 className="text-xl font-semibold mb-4">{t('articles.recommendedResource', 'Recommended Resources')}</h3>
        <div className="grid gap-4">
          {article.recommendedCourses.map((course, i) => (
            <Card key={i} className="bg-muted/30 border-primary/20">
              <CardContent className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-lg">{course.title}</h4>
                    {course.isPaid ? (
                       <Badge variant="outline" className="border-yellow-500/50 text-yellow-600">Paid</Badge>
                    ) : (
                       <Badge variant="outline" className="border-green-500/50 text-green-600">Free</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {course.provider}
                    </span>
                    <span>•</span>
                    <span>{course.duration}</span>
                  </div>
                </div>
                <Button asChild size="lg" className="shrink-0">
                  <a href={course.url} target="_blank" rel="noopener noreferrer" className="gap-2">
                    {t('articles.startCourse', 'Start Course')}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useAssessment } from "../../context/assessment-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export function GoalsStep() {
  const { data, updateData, setCurrentStep, submitAssessment, isLoading } = useAssessment();
  const { t } = useTranslation();

  return (
    <Card className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardHeader>
        <CardTitle>{t('assessment.goals.title')}</CardTitle>
        <CardDescription>{t('assessment.goals.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="targetRole">{t('assessment.goals.targetRole')}</Label>
          <Input
            id="targetRole"
            placeholder={t('assessment.goals.targetRolePlaceholder')}
            value={data.targetRole}
            onChange={(e) => updateData({ targetRole: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">
            {t('assessment.goals.targetRoleHelp')}
          </p>
        </div>

        <div className="space-y-2">
          <Label>{t('assessment.goals.availability')}</Label>
          <RadioGroup
            value={data.availability}
            onValueChange={(value) => updateData({ availability: value })}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="5-10" id="r1" />
              <Label htmlFor="r1" className="cursor-pointer flex-1">{t('assessment.goals.hours.5-10')}</Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="10-20" id="r2" />
              <Label htmlFor="r2" className="cursor-pointer flex-1">{t('assessment.goals.hours.10-20')}</Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="20+" id="r3" />
              <Label htmlFor="r3" className="cursor-pointer flex-1">{t('assessment.goals.hours.20+')}</Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="full-time" id="r4" />
              <Label htmlFor="r4" className="cursor-pointer flex-1">{t('assessment.goals.hours.fullTime')}</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => setCurrentStep('experience')} disabled={isLoading}>
            {t('assessment.goals.back')}
          </Button>
          <Button onClick={submitAssessment} disabled={!data.targetRole || !data.availability || isLoading}>
            {isLoading ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>{t('assessment.goals.analyzing')}</span>
                <span className="ml-2 text-xs opacity-70 hidden sm:inline-block">
                  ({t('assessment.goals.waitMessage')})
                </span>
              </div>
            ) : (
              t('assessment.goals.complete')
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

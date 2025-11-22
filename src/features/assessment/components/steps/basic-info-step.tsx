import { useAssessment } from "../../context/assessment-context";
import type { LearningStyle } from "../../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";

export function BasicInfoStep() {
  const { data, updateData, setCurrentStep } = useAssessment();
  const { t } = useTranslation();

  const handleNext = () => {
    if (data.fullName && data.currentRole) {
      setCurrentStep('skills');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardHeader>
        <CardTitle>{t('assessment.basicInfo.title')}</CardTitle>
        <CardDescription>{t('assessment.basicInfo.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">{t('assessment.basicInfo.fullName')}</Label>
          <Input
            id="fullName"
            placeholder={t('assessment.basicInfo.fullNamePlaceHolder')}
            value={data.fullName}
            onChange={(e) => updateData({ fullName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentRole">{t('assessment.basicInfo.currentRole')}</Label>
          <Input
            id="currentRole"
            placeholder={t('assessment.basicInfo.currentRolePlaceholder')}
            value={data.currentRole}
            onChange={(e) => updateData({ currentRole: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">
            {t('assessment.basicInfo.currentRoleHelp')}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="learningStyle">{t('assessment.basicInfo.learningStyle')}</Label>
          <Select
            value={data.learningStyle}
            onValueChange={(value) => updateData({ learningStyle: value as LearningStyle })}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('assessment.basicInfo.selectStyle')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="visual">{t('assessment.basicInfo.styles.visual')}</SelectItem>
              <SelectItem value="reading">{t('assessment.basicInfo.styles.reading')}</SelectItem>
              <SelectItem value="auditory">{t('assessment.basicInfo.styles.auditory')}</SelectItem>
              <SelectItem value="kinesthetic">{t('assessment.basicInfo.styles.kinesthetic')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={handleNext} disabled={!data.fullName || !data.currentRole}>
            {t('assessment.basicInfo.next')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

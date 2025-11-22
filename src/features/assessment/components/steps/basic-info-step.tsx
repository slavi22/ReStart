import { useAssessment } from "../../context/assessment-context";
import type { LearningStyle } from "../../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function BasicInfoStep() {
  const { data, updateData, setStep } = useAssessment();

  const handleNext = () => {
    if (data.fullName && data.currentRole) {
      setStep('skills');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>Let's start with who you are and what you do.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            value={data.fullName}
            onChange={(e) => updateData({ fullName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentRole">Current Role</Label>
          <Input
            id="currentRole"
            placeholder="e.g. Junior Developer"
            value={data.currentRole}
            onChange={(e) => updateData({ currentRole: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="learningStyle">Preferred Learning Style</Label>
          <Select
            value={data.learningStyle}
            onValueChange={(value) => updateData({ learningStyle: value as LearningStyle })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="visual">Visual (Videos, Diagrams)</SelectItem>
              <SelectItem value="reading">Reading (Documentation, Articles)</SelectItem>
              <SelectItem value="auditory">Auditory (Podcasts, Lectures)</SelectItem>
              <SelectItem value="kinesthetic">Kinesthetic (Hands-on, Projects)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={handleNext} disabled={!data.fullName || !data.currentRole}>
            Next Step
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
